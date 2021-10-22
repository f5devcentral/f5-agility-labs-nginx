Step 12 - Protect Arcadia API
#############################


As a reminder, in ``Module2``, we deployed NAP in CentOS.

The Arcadia web application has several APIs in order to:

    #. Buy stocks
    #. Sell stocks
    #. Transfer money to friends

Because we have an ``OpenAPI specification file`` we can use this for a very accurate policy for protecting these APIs.

You can find the ``Arcadia Application OAS3`` file here : https://app.swaggerhub.com/apis/F5EMEASSA/Arcadia-OAS3/2.0.1-schema

App Protect allows you to reference the file from an http server or deployed locally to the file system of the NGINX instance.

.. image:: ../pictures/lab1/swaggerhub.png
   :align: center

.. note :: As you can notice, there are 4 URLs in this API. And a JSON schema has been created so that every JSON parameter is known.

Steps for the lab
*****************

.. warning :: Make sure App Protect is installed to centos-vm. There is a script on the centos-vsm in /home/centos/lab-files/lab-script-cheat.sh that you can use to easily install App Protect.

    #. Use vscode or SSH to the centos-vm

    #. ``curl localhost`` to verify NGINX is installed

    #. Copy our policy template to /etc/nginx

       .. code-block:: bash

           cp /etc/app_protect/conf/NginxApiSecurityPolicy.json /etc/nginx

    #. Modify it with the ``link`` to the OAS file for Arcadia API. This file resides in SwaggerHub. Don't forget the {}

       .. code-block:: js
          :emphasize-lines: 11

            {
            "policy" : {
                "name" : "app_protect_api_security_policy",
                "description" : "NGINX App Protect API Security Policy. The policy is intended to be used with an OpenAPI file",
                "template": {
                    "name": "POLICY_TEMPLATE_NGINX_BASE"
                },

                "open-api-files" : [
                    {
                        "link": "https://api.swaggerhub.com/apis/F5EMEASSA/Arcadia-OAS3/2.0.1-schema/swagger.json"
                    }
                ],

                "blocking-settings" : {
                    "violations" : [
                        {
            ...

    #. Now, edit ``vi nginx.conf`` and modify it as below. We refer to the new WAF policy created previously

       .. code-block:: nginx
          :emphasize-lines: 31

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

                log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                                '$status $body_bytes_sent "$http_referer" '
                                '"$http_user_agent" "$http_x_forwarded_for"';

                access_log  /var/log/nginx/access.log  main;

                server {
                    listen 80;
                    server_name localhost;
                    proxy_http_version 1.1;

                    app_protect_enable on;
                    app_protect_policy_file "/etc/nginx/NginxApiSecurityPolicy.json";
                    app_protect_security_log_enable on;
                    app_protect_security_log "/etc/nginx/log-default.json" syslog:server=10.1.20.11:5144;

                    location / {
                        resolver 10.1.1.8:5353;
                        resolver_timeout 5s;
                        client_max_body_size 0;
                        default_type text/html;
                        proxy_pass http://k8s.arcadia-finance.io:30274$request_uri;
                    }
                }
            }

    #. Now, restart the NGINX service ``sudo nginx -s reload``

Test your API
*************

    #. RDP to Windows Jumphost with credentials ``user:user``
    #. Open ``Postman```
    #. Open Collection ``Arcadia API``

       .. image:: ../pictures/lab1/collec.png
           :align: center
           :scale: 50%

    #. Send your first API Call with ``Last Transactions``. You should see the last transactions. This is just a GET.

       .. image:: ../pictures/lab1/last_trans.png
           :align: center
           :scale: 50%

       Make sure the URL is ``http://app-protect-centos.arcadia-finance.io/trading/transactions.php``

    #. Now, send a POST, with ``POST Buy Stocks``. Check the request content (headers, body), and compare with the OAS3 file in SwaggerHub.

       .. image:: ../pictures/lab1/buy.png
           :align: center
           :scale: 50%

    #. Last test, send an attack. Send ``POST Buy Stocks XSS attack``. Your request will be blocked.

       .. image:: ../pictures/lab1/buy_attack.png
           :align: center
           :scale: 50%

    #. Check in ELK the violation.
    #. You can make more tests with the other ``API calls``

