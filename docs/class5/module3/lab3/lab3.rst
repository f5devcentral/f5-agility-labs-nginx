Step 8 - Customize the WAF policy
=================================

To this point, we have been using the default NGINX App Protect policy. When we do not reference a policy, App Protect uses the default WAF policy which covers all the OWASP top 10 attack patterns.

In this lab, we will customize the policy and test the new config with our docker container.

Use a custom WAF policy and assign it per location
--------------------------------------------------

Steps:

    #.  From the docker vm, perform the below steps. We suggest using vscode for the below exercise, but feel free to use the tool of your choice.
    #.  The files needed are in the ``/home/ubuntu/lab-files/customized-policy`` directory, you do not need to create them manually. The goal is to understand the options available for protecting our application.

    #.  We have a new policy file named ``ajax_popup.json``
        
        .. code-block:: js
           :caption: ajax_popup.json

            {
                "name": "policy_name",
                "template": { "name": "POLICY_TEMPLATE_NGINX_BASE" },
                "applicationLanguage": "utf-8",
                "enforcementMode": "blocking",
                "response-pages": [
                        {
                            "responsePageType": "ajax",
                            "ajaxEnabled": true,
                            "ajaxPopupMessage": "My customized popup message! Your support ID is: <%TS.request.ID()%><br>You can use this ID to find the reason your request was blocked in Kibana."
                        }
                        ]
            }

    #.  We have another policy file named ``policy_mongo_linux_JSON.json`` 

        .. code-block:: js
           :caption: policy_mongo_linux_JSON.json

            {
                "policy":{
                "name":"evasions_enabled",
                "template":{
                    "name":"POLICY_TEMPLATE_NGINX_BASE"
                },
                "applicationLanguage":"utf-8",
                "enforcementMode":"blocking",
                "blocking-settings":{
                    "violations":[
                        { 
                            "name":"VIOL_JSON_FORMAT",
                            "alarm":true,
                            "block":true
                        },
                        {
                            "name":"VIOL_EVASION",
                            "alarm":true,
                            "block":true
                        },
                        {
                            "name": "VIOL_ATTACK_SIGNATURE",
                            "alarm": true,
                            "block": true
                        }
                    ],
                    "evasions":[
                        {
                            "description":"Bad unescape",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"Directory traversals",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"Bare byte decoding",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"Apache whitespace",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"Multiple decoding",
                            "enabled":true,
                            "learn":false,
                            "maxDecodingPasses":2
                        },
                        {
                            "description":"IIS Unicode codepoints",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"IIS backslashes",
                            "enabled":true,
                            "learn":false
                        },
                        {
                            "description":"%u decoding",
                            "enabled":true,
                            "learn":false
                        }
                    ]
                },
                "json-profiles":[
                        {
                            "defenseAttributes":{
                                "maximumTotalLengthOfJSONData":"any",
                                "maximumArrayLength":"any",
                                "maximumStructureDepth":"any",
                                "maximumValueLength":"any",
                                "tolerateJSONParsingWarnings":true
                            },
                            "name":"Default",
                            "handleJsonValuesAsParameters":false,
                            "validationFiles":[
                        
                            ],
                            "description":"Default JSON Profile"
                        }
                    ],
                "signature-settings": {
                        "attackSignatureFalsePositiveMode": "disabled",
                        "minimumAccuracyForAutoAddedSignatures": "low"
                },
                "server-technologies": [
                        {
                            "serverTechnologyName": "MongoDB"
                        },
                        {
                            "serverTechnologyName": "Unix/Linux"
                        },
                                    {
                            "serverTechnologyName": "PHP"
                        }
                ]
                }
            }


    #.  We will modify the NGINX Arcadia configuration with the new policies. Now edit the file ``/home/ubuntu/lab-files/customized-policy/arcadia.conf`` to make the changes shown below:

        .. code-block:: nginx
            :emphasize-lines: 31,38,45,52

                server {
                    listen 80 default_server;
                    proxy_http_version 1.1;
                    proxy_cache_bypass  $http_upgrade;

                    proxy_set_header X-Forwarded-Server $host;
                    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                    proxy_set_header Upgrade $http_upgrade;
                    proxy_set_header Connection "upgrade";
                    proxy_ignore_client_abort on;
                
                    client_max_body_size 0;
                    default_type text/html;
                    
                    app_protect_enable on;
                    app_protect_security_log_enable on;
                    # send the logs to the logstash instance on our ELK stack.
                    app_protect_security_log "/etc/app_protect/conf/log_default.json" syslog:server=10.1.1.11:5144;

                    ## NGINX Plus API monitoring:
                    status_zone arcadia_server;
                    ## in this lab, there are 2 ingress routes for arcadia.
                    ## no-waf is the ingress (virtualServer) without NAP enabled
                    ## we will implement WAF before the kubernetes ingress, at a higher layer of the network
                    proxy_set_header Host no-waf.arcadia-finance.io;

                    # main service
                    location / {
                        proxy_pass http://arcadia_nodeports$request_uri;
                        status_zone main_service;
                        app_protect_policy_file "/etc/nginx/conf.d/ajax_popup.json";
                    }

                    # backend service
                    location /files {
                        proxy_pass http://arcadia_nodeports$request_uri;
                        status_zone backend_service;
                        app_protect_policy_file "/etc/nginx/conf.d/policy_mongo_linux.json";
                    }       

                    # app2 service
                    location /api {
                        proxy_pass http://arcadia_nodeports$request_uri;
                        status_zone app2_service;
                        app_protect_policy_file "/etc/nginx/conf.d/policy_mongo_linux.json";
                    }       

                    # app3 service
                    location /app3 {
                        proxy_pass http://arcadia_nodeports$request_uri;
                        status_zone app3_service;
                        app_protect_policy_file "/etc/nginx/conf.d/policy_mongo_linux.json";
                    }    
                }

            upstream arcadia_nodeports {
                zone arcadia_nodeports 128k;
                server 10.1.1.10:80;
            } 


    #.  Last step is to run a new container (and delete the previous one) referring to these 3 policies.

        .. code-block:: bash

            docker rm -f app-protect
            docker run --interactive --tty --rm --name app-protect -p 80:80 \
                --volume /home/ubuntu/lab-files/nginx.conf:/etc/nginx/nginx.conf \
                --volume /home/ubuntu/lab-files/customized-policy:/etc/nginx/conf.d \
                app-protect:04-aug-2021-tc

    #.  Wait for the container to start, you should see: ``APP_PROTECT { "event": "waf_connected"`` in the output.

    #.  From the jumphost click on the ``Arcadia Links>Arcadia NAP Docker`` bookmark. Click Login and use matt:ilovef5

        .. image:: ../pictures/lab5/arcadia-adv.png
           :align: center
           :alt: advanced policy

    #.  Once logged in, test the new AJAX policy by entering <script> in the email form and clicking submit.

        .. image:: ../pictures/lab3/ajax.png
           :align: center
           :alt: ajax policy

.. note:: NAP is using different WAF policies based on the requested URI:

    #. policy_base for ``/`` (the main app)
    #. policy_mongo_linux for ``/files`` (the back end)
    #. policy_mongo_linux for ``/api`` (the Money Transfer service)
    #. policy_mongo_linux for ``/app3`` (the Refer Friend service)

|

