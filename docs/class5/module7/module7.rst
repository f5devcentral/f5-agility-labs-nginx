Module 7 - Install and Enable NGINX AppProtect DoS
##################################################


In this module you will install and enable NGINX App Protect DoS on NAP DOS1 and NAP DOS 2

NGINX App Protect DoS directives:

1. **load_module**  - This command will load the dynamic module into NGINX Plus.  Located in the main context 

2. **app_protect_dos_enable** - Enable/Disable App Protect DoS module. It can be located in the location, server or http contexts.

3. **app_protect_dos_monitor** - This directive is how App Protect monitors stress level of the protected resources. There are 3 arguments for this directive:

   - URI - a mandatory argument, this is the destination to the protected resources
   - Protocol - an optional argument, this is the protocol of the protected resource ( http1, http2, grpc) http1 is the default
   - Timeout - determines how many seconds App Protect waits for a response. The default is 10 seconds for http1 and http2 and 5 seconds for grpc
   
4. **app_protect_dos_security_log_enable** - Enable/Disable App Protect DOS security logger

5. **app_protect_dos_security_log** - This directive takes two arguments, first is the configuration file path and the second is the destination where events will be sent 


Install NGINX App Protect DOS 
-----------------------------
   
1. Open the WebShell of "NAP DOS 1" VM (UDF > Components > Systems > NAP DOS 1 > Access > Web Shell) 

2. Install NGINX App Protect 

``apt install -y app-protect-dos``

3. Enable NGINX App Protect configuration by removing "#" from any lines of code in /etc/nginx/nginx.conf file
   
.. Note:: 

    - All NGINX App Protect configurations should be commented out. Use your editing tool of choice (vi, vim, or nano) to complete this task.
    - Please note the NAP DoS Live Activity Monitoring section of the /etc/nginx/nginx.conf file will be edited at a later time (Module 11)

.. code-block:: nginx
    :linenos:
    :caption: /etc/nginx/nginx.conf

    user nginx;
    worker_processes auto;
    error_log /var/log/nginx/error.log debug;
    pid /var/run/nginx.pid;
    worker_rlimit_nofile 65535;
    worker_rlimit_core 2000M;
    #load_module modules/ngx_http_app_protect_dos_module.so;

    events {
        worker_connections 5535;
    }

    http {
        include /etc/nginx/mime.types;
        default_type application/octet-stream;
        #log_format log_dos ', vs_name_al=$app_protect_dos_vs_name, ip=$remote_addr, tls_fp=$app_protect_dos_tls_fp, outcome=$app_protect_dos_outcome, reason=$app_protect_dos_outcome_reason, ip_tls=$remote_addr:$app_protect_dos_tls_fp, ';
        sendfile on;
        client_max_body_size 100M;
        keepalive_timeout 600;
        client_body_timeout 600s;
        client_header_timeout 600s;
        proxy_connect_timeout 600s;
        proxy_send_timeout 600s;
        proxy_read_timeout 600s;
        send_timeout 600s;


      upstream myapp1 {
            server 10.1.1.19:3000;
        }

        server {
            listen 50051 http2;
            server_name grpc.example.com;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.20:5261;
            http2_max_concurrent_streams 100000;

            ssl_certificate /etc/ssl/certs/cert.crt;
            ssl_certificate_key /etc/ssl/certs/cert.key;
            ssl_session_cache shared:SSL:10m;
            ssl_session_timeout 5m;
            ssl_ciphers AES128-GCM-SHA256;
            ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;

            location /routeguide. {
                #app_protect_dos_monitor uri=http://grpc.example.com:50051/routeguide.RouteGuide/GetFeature protocol=grpc timeout=5;
                #app_protect_dos_enable on;
                #app_protect_dos_policy_file "/etc/app_protect_dos/BADOSDefaultPolicy.json";
                #app_protect_dos_name "routeguide";
                #set $loggable '0';
                #access_log syslog:server=10.1.1.20:5561 log_dos if=$loggable;
                grpc_pass grpc://routeguide_service;
            }
        }

        upstream routeguide_service {
            zone routeguide_service 64k;
            server 10.1.1.18:10001;
            server 10.1.1.18:10002;
            server 10.1.1.18:10003;
        }


        server {
            listen 8095 ssl http2;
            keepalive_requests 100000;
            client_max_body_size 2000M;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.20:5261;
            #set $loggable '0';
            #access_log syslog:server=10.1.1.20:5561 log_dos if=$loggable;
            http2_max_concurrent_streams 100000;
            ssl_certificate /etc/ssl/certs/cert.crt;
            ssl_certificate_key /etc/ssl/certs/cert.key;
            ssl_session_cache shared:SSL:10m;
            ssl_session_timeout 5m;
            ssl_ciphers AES128-GCM-SHA256;
            ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;

            location /monitor {
                rewrite ^/monitor(.*)$ /routeguide.RouteGuide/GetFeature break;
                grpc_pass grpc://10.1.1.18:10002;
            }

            location /testing {
                rewrite ^/testing(.*)$ /routeguide.RouteGuide/RecordRoute break;
                grpc_set_header te trailers;
                #app_protect_dos_enable on;
                #app_protect_dos_name "slowpost";
                #app_protect_dos_monitor uri=https://10.1.1.14:8095/monitor protocol=grpc;
                grpc_pass grpc://10.1.1.18:10002;
            }
        }

        server {
            listen 8080;
            keepalive_requests 100000;
            server_name juiceshop;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.20:5261;
            #set $loggable '0';
            #access_log syslog:server=10.1.1.20:5561 log_dos if=$loggable;

            location / {
                #app_protect_dos_enable on;
                #app_protect_dos_name "juiceshop";
                #app_protect_dos_monitor uri=http://juiceshop:8080/ timeout=2;
                proxy_pass http://myapp1;
            }
        }

    ########  NAP DOS Live Activity Monitoring ########
        #server {
            #listen 80;
            #location /api {
                #app_protect_dos_api;
            #}

            #location = /dashboard-dos.html {
            #    root /usr/share/nginx/html;
            #}
        #}
    ###################################################
        


4. Restart NGINX

``service nginx restart``

``service nginx status``

If NGINX restarted successfully, the restart command will complete successfully and status will return that NGINX is online.

5. Repeat steps 1 - 4 on the "NAP DOS 2" VM