Step 15 - Protect gRPC Services
###############################

App Protect provides advanced protection for gRPC based services. Along with all kinds of existing features to protect traditional HTTP services, App protect can parse gRPC payload to enforce schema and look for inner threats.

Similar to JSON and XML, App Protect has a profile for gRPC. The profile references an IDL file for the target gRPC service and establishes a positive security model for it. Hence, only URLs and parameters defined in an IDL (Interface Definition Language) file will be allowed. In addition to positive security, App Protect looks up for signatures, bots, and other common HTTP threats.

The following lab provides hands-on experience on configuring NGINX to forward gRPC traffic and App Protect to secure it.

High level lab steps:

#. Configure NGINX to forward traffic to a gRPC service.
#. Configure App Protect to secure a gRPC service.
#. Make sure that valid requests are passed and invalid ones blocked.

.. note:: This lab makes use of this micro-services demo application <https://github.com/GoogleCloudPlatform/microservices-demo>

**Steps for the lab**

.. warning:: Make sure App Protect is installed to centos-vm. There is a script on the centos-vsm in /home/centos/lab-files/lab-script-cheat.sh that you can use to easily install App Protect. If there are any issues with this install script, you can clean the environment with the remove-app-protect-cleanup.sh in the same directory.

#. Use vscode or SSH to the centos-vm ``App Protect in CentOS``
#. Configure NGINX to forward gRPC traffic: 

   .. code-block :: bash

        cp ~/lab-files/grpc/nginx.conf /etc/nginx/

   .. code-block :: nginx

        user  nginx;
        worker_processes  auto;

        error_log  /var/log/nginx/error.log notice;
        pid        /var/run/nginx.pid;

        load_module modules/ngx_http_app_protect_module.so;

        events {
            worker_connections 1024;
        }

        http {
            include          /etc/nginx/mime.types;
            default_type  application/octet-stream;
            sendfile        on;
            keepalive_timeout  65;

            server {
                listen 443 http2 ssl;
                server_name app-protect.online-boutique.arcadia-finance.io;
                ssl_certificate /home/centos/lab-files/grpc/fullchain1.pem;
                ssl_certificate_key /home/centos/lab-files/grpc/privkey1.pem;
                ssl_protocols TLSv1.2 TLSv1.3;

                include conf.d/errors.grpc_conf;
                default_type application/grpc;

                app_protect_enable on;
                app_protect_policy_file "/etc/nginx/online-boutique-policy.json";
                app_protect_security_log_enable on;
                app_protect_security_log "/etc/app_protect/conf/log_default.json" syslog:server=10.1.1.11:5144;

                location /hipstershop {
                    grpc_pass grpcs://online-boutique.arcadia-finance.io;
                }
            }
        }

#. Create a new NAP policy with gRPC profile

   .. code-block:: bash
        
        cp ~/lab-files/grpc/online-boutique-policy.json /etc/nginx

   .. code-block:: js

        {
            "policy": {
                "name": "online-boutique-policy",
                "template": { "name": "POLICY_TEMPLATE_NGINX_BASE" },
                "enforcementMode": "blocking",
                "blocking-settings": {
                    "violations": [
                        {
                            "name": "VIOL_GRPC_METHOD",
                            "alarm": true,
                            "block": true
                        },
                        {
                            "name": "VIOL_GRPC_MALFORMED",
                            "alarm": true,
                            "block": true
                        },
                        {
                            "name": "VIOL_GRPC_FORMAT",
                            "alarm": true,
                            "block": true
                        },
                        {
                            "name": "VIOL_URL",
                            "alarm": true,
                            "block": true
                        }
                    ]
                },
                "signature-sets": [
                    {
                        "name": "All Signatures",
                        "block": true,
                        "alarm": true
                    }
                ],
                "grpc-profiles": [
                    {
                        "name": "online-boutique-profile",
                        "idlFiles": [
                            {
                                "idlFile": {
                                    "$ref": "https://raw.githubusercontent.com/GoogleCloudPlatform/microservices-demo/master/pb/demo.proto"
                                },
                                "isPrimary": true
                            }
                        ],
                        "associateUrls": true,
                        "defenseAttributes": {
                            "maximumDataLength": 100,
                            "allowUnknownFields": false
                        },
                        "attackSignaturesCheck": true,
                        "metacharCheck": true
                    }
                ],
                "urls": [
                    {
                        "name": "*",
                        "type": "wildcard",
                        "method": "*",
                        "$action": "delete"
                    }
                ]
            }
        }

#. Copy the gRPC status code mappings to nginx/conf.data

   .. code-block :: bash

      cp ~/lab-files/grpc/errors.grpc_conf /etc/nginx/conf.d

#. Reload Nginx

   .. code-block :: bash

       sudo systemctl reload nginx

#. Change directory to the location of our Interface Definition Language (IDL) file

   .. code-block :: bash

        cd /home/centos/lab-files/grpc

#. Verify that legitimate request passes
    
   .. code-block :: bash

        grpcurl -insecure -proto demo.proto app-protect.online-boutique.arcadia-finance.io:443 hipstershop.AdService/GetAds

#. Verify that invalid requests blocked
    
   #. Request to non-existent service
    
      .. code-block :: bash

            curl -v -X POST -k --http2 -H "Content-Type: application/grpc" -H "TE: trailers" https://app-protect.online-boutique.arcadia-finance.io:443/hipstershop.DoesNotExist/GetAds
   #. Request to non-existent method
    
      .. code-block :: bash

            curl -v -X POST -k --http2 -H "Content-Type: application/grpc" -H "TE: trailers" https://app-protect.online-boutique.arcadia-finance.io:443/hipstershop.AdService/DoesNotExist
   #. Bad payload
    
      .. code-block :: bash

            curl -v -X POST -k --http2 -H "Content-Type: application/grpc" -H "TE: trailers" https://app-protect.online-boutique.arcadia-finance.io:443/hipstershop.AdService/GetAds
   #. Request with attack signature
    
      .. code-block :: bash

            grpcurl -insecure -proto demo.proto -d '{"context_keys": "alert()"}' app-protect.online-boutique.arcadia-finance.io:443 hipstershop.AdService/GetAds
   #. Request with too much data
    
      .. code-block :: bash

            grpcurl -insecure -proto demo.proto -d '{"context_keys": "datadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadatadat"}' app-protect.online-boutique.arcadia-finance.io:443 hipstershop.AdService/GetAds