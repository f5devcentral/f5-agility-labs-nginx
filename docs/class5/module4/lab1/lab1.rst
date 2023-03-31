Protect Arcadia API with NGINX App Protect
==========================================

The Arcadia micro-services offer several REST APIs in order to:
 - Buy stocks
 - Sell stocks
 - Transfer money to friends

NGINX App Protect can secure APIs by importing an OpenAPI spec file. This type of file describes how an API works, lists the endpoints, accepted oeprations, etc. Think of it as a blueprint for an API. Because we have an **OpenAPI specification file**, we can create a very specific, secure App Protect policy. 

App Protect allows you to reference the file on an external http server or locally on the file system of the NGINX instance. Since the **Arcadia Application OAS3** is available publicly at https://app.swaggerhub.com/apis/nginx5/api-arcadia_finance/2.0.2-oas3, we'll simply configure NGINX App Protect to pull the definition from the public source.

.. image:: images/swaggerhub.png
   :align: center

.. note :: Notice that the URI, method, and response type are all defined for each API. This also serves as a tool for developers to understand what the response should look like for a successful call.

Lab Tasks
---------

1. Log into the jump host via RDP and open Firefox. Click the **NMS** bookmark and log in using **lab** as the username and **Agility2023!** as the password.

.. image:: images/nms_dashboard.png

2. Navigate to **Instance Manager** > **App Protect**.

.. image:: images/nms_app_protect_list.png

3. Click the **Create** button.

.. image:: images/create_button.png

1. Name the policy **NginxApiSecurityPolicy** or something similar. Paste the text below into the policy editor:

  .. code-block:: js

    {
        "policy": {
            "name": "app_protect_api_security_policy",
            "template": {
                "name": "POLICY_TEMPLATE_NGINX_BASE"
            },
            "applicationLanguage": "utf-8",
            "enforcementMode": "blocking",
            "open-api-files": [{
                "link": "https://raw.githubusercontent.com/nginx-architects/kic-example-apps/main/app-protect-openapi-arcadia/open-api-spec.json"
            }],
            "blocking-settings": {
                "violations": [{
                    "name": "VIOL_THREAT_CAMPAIGN",
                    "alarm": true,
                    "block": true
                }]
            },
            "signature-sets": [{
                "name": "High Accuracy Signatures",
                "block": false,
                "alarm": false
            }],
            "bot-defense": {
                "settings": {
                    "isEnabled": true
                },
                "mitigations": {
                    "classes": [{
                            "name": "trusted-bot",
                            "action": "alarm"
                        },
                        {
                            "name": "untrusted-bot",
                            "action": "block"
                        },
                        {
                            "name": "malicious-bot",
                            "action": "block"
                        }
                    ]
                }
            }
        }
    }

.. image:: images/json_policy_creation.png

5. Click **Save**.

**Result**

.. image:: images/saved_policy.png

1. Navigate to **Instances**. Click on the nginx-plus-2 instance.

2. Click on **Edit Config**. 

.. image:: images/edit_config_button.png

7. Modify the NGINX configuration file **arcadia-finance.conf** to add the WAF policy to the API endpoints. Add this to the server block below the default location:

.. code-block:: text

    location /trading/rest {
        proxy_pass http://arcadia-finance$request_uri;
        status_zone arcadia-api;
        app_protect_enable on;
        app_protect_policy_file "/etc/nginx/NginxApiSecurityPolicy.tgz";
    }

    location /api/rest {
        proxy_pass http://arcadia-finance$request_uri;
        status_zone arcadia-api;
        app_protect_enable on;
        app_protect_policy_file "/etc/nginx/NginxApiSecurityPolicy.tgz";
    }

8. Click **Publish** to deploy the changes. Click **Publish** again when prompted.

Test the App Protect Policy
---------------------------

1. Connect to the Jump Host. Navigate to **Applications** > **Favorites** > **Terminal**. Maximize the window.

.. image:: images/terminal.png

2. Pull a list of trading transactions by issuing a curl command from the terminal window:

.. code-block:: bash

  curl http://k8s.arcadia-finance.io/trading/transactions.php

**Result**

.. image:: images/trading_transactions.png

3. Now, attempt an illegal GET operation against the buy_stocks API endpoint. Notice that the request is blocked.

.. code-block:: bash

  curl https://k8s.arcadia-finance.io/trading/rest/buy_stocks.php

Notice that the request is blocked. This shows that the NGINX App Protect WAF policy is protecting the API.
