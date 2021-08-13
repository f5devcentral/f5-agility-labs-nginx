Step 9 - Set up a web application firewall (WAF)
################################################

So far in the previous labs, the API Gateway has not been protected. (The API Gateway published through a BIG-IP VM hosting the public IP address and TLS certificates per instance.)
The next step thusly is to protect the API Gateway with a WAF. To do so, we will be deploying ``NGINX App Protect (NAP)`` in front of the NGINX Plus API Gateways (managed by NGINX Controller).

.. note:: We have already deployed NGINX App Protect (NAP) behind the scenes, but it's not yet enabled.

**The current architecture**

.. image:: ../pictures/lab3/apim_archi.png
   :align: center

|

**The future architecture with NGINX App Protect**

.. image:: ../pictures/lab3/archi-nap.png
   :align: center

.. note:: At the end of this lab we will update the BIG-IP pool member in order to forward the API traffic to NAP instead of the NGINX API Gateways.

Steps to configure NGINX App Protect as an API firewall
*******************************************************

#. SSH (or WebSSH) to the ``Nginx App Protect`` VM.
#. Navigate to the ``nginx`` folder using ``cd /etc/nginx``.
#. Check the content of the folder:

   .. code-block:: bash

      [root@377b61a8-6052-40b6-87fa-e47bab51cb07 nginx]# ls
      conf.d          koi-utf  log-default.json  modules                      nginx.conf      NginxDefaultPolicy.json  scgi_params   win-utf
      fastcgi_params  koi-win  mime.types        NginxApiSecurityPolicy.json  nginx.conf.old  NginxStrictPolicy.json   uwsgi_params

   .. note:: You will notice three important files:

      - log-default.json <the log config file>
      - NginxApiSecurityPolicy.json <the WAF declarative policy file>
      - nginx.conf <the nginx config file>

#. The ``log-default.json`` file is already configured to log all requests (good and bad)
#. Edit the ``NginxApiSecurityPolicy.json`` in order to configure the NAP policy

   .. note:: It is straight forward to configure NAP policy file when the API developers provide you with an OpenAPI spec file (you can directly refer to the OAS file).

   .. code-block:: bash

      sudo cp NginxApiSecurityPolicy.json api-sentence.json

   .. code-block:: bash

      sudo vi api-sentence.json

   Modify the NAP policy file by adding the OAS file URL:

   .. code-block:: json
      :emphasize-lines: 10, 11, 12

      {
      "policy" : {
      "name" : "app_protect_api_security_policy",
      "description" : "NGINX App Protect API Security Policy. The policy is intended to be used with an OpenAPI file",
      "template": {
        "name": "POLICY_TEMPLATE_NGINX_BASE"
      },

      "open-api-files" : [
        {
         "link": "https://api.swaggerhub.com/apis/F5EMEASSA/API-Sentence/3.0.1"
        }
      ],

      "enforcer-settings" : {
         "enforcerStateCookies" : {
            "secureAttribute" : "always"
         }
      },
      ...

#. Now, we have to configure NGINX's ``nginx.conf`` to use this NAP policy

   .. note:: We have 2 options here. Either we change the default NAP policy directive from ``NginxDefaultPolicy.json`` to ``api-sentence.json``, or you can comment out the ``NginxDefaultPolicy.json`` directive and add ``api-sentence.json`` directive. In the lab, we will replace ``NginxDefaultPolicy.json`` by ``api-sentence.json``.

   .. code-block:: bash

      sudo vi nginx.conf

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
         listen	  80;
            server_name  localhost;
            proxy_http_version 1.1;

            app_protect_enable on;
            app_protect_policy_file "/etc/nginx/api-sentence.json";
            app_protect_security_log_enable on;
            app_protect_security_log "/etc/nginx/log-default.json" syslog:server=10.1.20.8:5144;

            location / {
                  resolver_timeout 5s;
                  client_max_body_size 0;
                  default_type text/html;
                  proxy_pass http://10.1.20.6$request_uri;
            }
         }
      }

   .. note:: The NGINX configuration forwards logs to 10.1.20.8 (our ELK), and forwards API requests to http://10.1.20.6 (the NGINX API Gateway managed by NGINX Controller)

#. Reload the NGINX configuration:

   .. code-block:: bash

      sudo nginx -s reload

   .. note:: Wait till the prompt comes back. It can take up to 10 seconds.

Update the BIG-IP config to route incoming requests to NAP
**********************************************************

#. Login to the BIG-IP TMUI using ``admin`` as both the user and the password.
#. Select ``Local Traffic`` -> ``Virtual Servers`` -> ``Virtual Server List`` -> Edit the ``vs_api`` virtual server.
#. Click on ``Resources`` tab -> Select ``pool-nap`` as the default pool, instead of ``pool-api-gw``
#. Click ``Update``.

Test your API Firewall
**********************

#. RDP to the ``Win10`` VM (user/user).
#. Open ``Postman`` and the ``API Sentence Generator v3`` collection.
#. Send any call and check that NAP is forwarding traffic to the API gateway
#. Now, send an attack using the ``GET Locations v3 Attack`` request. The request is blocked and you can see the Violation Support ID (your Violation Support ID will diffear from the one below).

   .. code-block:: json

      {
          "supportID": "15693173431452455024"
      }

#. Open the ``Edge Browser`` and select the ``Kibana`` bookmark.
#. By default you should see the NAP dashboard with the relevant violation metrics. At the bottom of the dashboard, you can see the log details. If you want more details, you can extend the ``blocked`` request.

   .. warning:: In UDF, there is an issue with the Timezone sync. Win10 synchronizes with your local timezone (instead of PST). But ELK uses the PST timezone. Don't be surprised if the time of the logs does not reflect your local time -- you might need to extend the time range in ELK to several hours.

   .. image:: ../pictures/lab3/ELK1.png
      :align: center

   .. image:: ../pictures/lab3/ELK2.png
      :align: center

.. warning:: Congrats! You deployed in few minutes an API firewall using NGINX App Protect in front of your API Gateway infrastructure!
