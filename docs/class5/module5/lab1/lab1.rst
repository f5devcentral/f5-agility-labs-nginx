Protect Arcadia API with NGINX App Protect on a centos VM
#########################################################


The Arcadia web application has several REST APIs in order to:

    #. Buy stocks
    #. Sell stocks
    #. Transfer money to friends

Because we have an ``OpenAPI specification file`` we can use this for a very accurate policy for protecting these APIs.

You can find the ``Arcadia Application OAS3`` file here : https://app.swaggerhub.com/apis/nginx5/api-arcadia_finance/2.0.2-oas3

App Protect allows you to reference the file on an external http server or locally on the file system of the NGINX instance.

.. image:: ../pictures/lab1/swaggerhub.png
   :align: center

.. note :: Notice that the URI, method, and response type are all defined for each API. This also serves as a tool for developers to understand what the response should look like for a successful call.

Steps for the lab
*****************

.. note :: Make sure NGINX is installed on centos-vm. There is a script on the centos-vm in /home/centos/lab-files/lab-script-cheat.sh that you can use to easily install App Protect and continue on from here.

#. Use vscode or SSH to the centos-vm

#. Verify NGINX is installed (see info note above if it is not)

    .. code-block:: bash

        curl 0

#. View our API policy template that is installed with app protect

    .. code-block:: bash

        cat /etc/app_protect/conf/NginxApiSecurityPolicy.json

#. The requied edits have already been made in our file located in ``/lab-files/openAPI\NginxApiSecurityPolicy.json`` see the highlighed line below.

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
                    "link": "https://raw.githubusercontent.com/nginx-architects/kic-example-apps/main/app-protect-openapi-arcadia/open-api-spec.json"
                }
            ],

            "blocking-settings" : {
                "violations" : [
                    {
        ...

#. See the new sections of the NGINX configuration below for the REST API locations that we will protect

    .. code-block:: nginx
        :emphasize-lines: 11,17

        # app3 service
        location /app3 {
            proxy_pass http://arcadia_ingress_nodeports$request_uri;
            status_zone app3_service;
        }

        # apply specifc policies to our API endpoints:
        location /trading/rest {
            proxy_pass http://arcadia_ingress_nodeports$request_uri;
            status_zone trading_service;
            app_protect_policy_file "/etc/nginx/NginxApiSecurityPolicy.json";
        }

        location /api/rest {
            proxy_pass http://arcadia_ingress_nodeports$request_uri;
            status_zone trading_service;
            app_protect_policy_file "/etc/nginx/NginxApiSecurityPolicy.json";
        }

#. Copy the configuration files into /etc/nginx:

    .. code-block:: BASH
    
        cp ~/lab-files/openAPI/NginxApiSecurityPolicy.json ~/lab-files/openAPI/nginx.conf /etc/nginx


#. Restart the NGINX service and then we will run some tests

    .. code-block:: BASH

         sudo nginx -s reload

Test The Protections
********************

    #. RDP to the jumphost with credentials ``user:user``
    #. Open ``Postman``
    #. Open Collection ``Arcadia API`` (see image below for navigating Postman)
    #. Send your first API Call with ``Last Transactions``. You should see the last transactions. This is just a GET.

       .. image:: ../pictures/lab1/last_trans.png
           :align: center
           :scale: 100%

    #. If you look closely at the OAS3 (Open API Spec v3) file, you'll see that buy stocks expects a POST. Try running ``POST Buy Stocks`` and see that it returns success. If you change the method to ``GET`` and run it again you will notice it is blocked. You can check the request content (headers, body), and compare with the OAS3 file in SwaggerHub.

       .. image:: ../pictures/lab1/buy_attack2.png
           :align: center
           :scale: 100%

We will view the logs in the Kibana dashboard in the next lab, or feel free to go to ``Firefox>Kibana>Dashboard>Overview`` now.

