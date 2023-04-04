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

1. Click the **Applications** drop-down in the top menu bar and select **Postman**.

.. image:: images/postman_nav.png

.. caution:: It may take a moment for Postman to launch the first time.

2. Click the **GET Transactions** item in the **Arcadia API** collection. Click **Send** and notice that the API returns data.

.. image:: images/get_transaction_pretest.png 

3. Click the **POST Buy Stocks** item, then click **Send**. Again, notice the API is functioning properly. 

.. image:: images/post_buy_stocks.png

4. Click the drop-down where **POST** is selected, and change to **OPTIONS**. Click **Send**. Notice that our API responded to this request.

.. image:: images/options.png

5. Return to **Firefox**. Click the **NMS** bookmark and log in using **lab** as the username and **Agility2023!** as the password. 

.. image:: images/nms_navigation_login.png

6. Click on the **Instance Manager** tile.

.. image:: images/nms_launchpad.png

7. Click **App Protect** in the left menu.

.. image:: images/nms_app_protect_list.png

8. Select the **NginxApiSecurityPolicy** from the policy list.

.. image:: images/nginx_policy_select.png

9. Click on the **Policy Versions** tab.

.. image:: images/policy_versions.png

10. Click on the version in the list. 

.. image:: images/policy_version_select.png

11. Review the configuration. Notice that this policy:

- Blocks the DELETE, OPTIONS and PUT HTTP operations, since our API does not utilize them
- includes a custom response via JSON to provide the support ID for easier troubleshooting
- Specifies actions to take on API-related violations
- Places a cap on XML payload lengths

.. note:: The full schema for the WAF policy can be found at [docs.nginx.com](https://docs.nginx.com/nginx-app-protect-waf/declarative-policy/policy/).

.. code-block:: text

  {
      "policy": {
          "name": "app_protect_api_security_policy",
          "description": "NGINX App Protect API Security Policy. The policy is intended to be used with an OpenAPI file",
          "template": {
              "name": "POLICY_TEMPLATE_NGINX_BASE"
          },
          "methods": [
              {
                  "name": "DELETE",
                  "$action": "delete"
              },
              {
                  "name": "OPTIONS",
                  "$action": "delete"
              },
              {
                  "name": "PUT",
                  "$action": "delete"
              }
          ],
          "response-pages": [
              {
                  "responseContent": "{\"status\":\"error\",\"reason\":\"policy_violation\",\"support_id\":\"<%TS.request.ID()%>\"}",
                  "responseHeader": "content-type: application/json",
                  "responseActionType": "custom",
                  "responsePageType": "default"
              }
          ],
          "blocking-settings": {
              "violations": [
                  {
                      "block": true,
                      "description": "Mandatory request body is missing",
                      "name": "VIOL_MANDATORY_REQUEST_BODY"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter location",
                      "name": "VIOL_PARAMETER_LOCATION"
                  },
                  {
                      "block": true,
                      "description": "Mandatory parameter is missing",
                      "name": "VIOL_MANDATORY_PARAMETER"
                  },
                  {
                      "block": true,
                      "description": "JSON data does not comply with JSON schema",
                      "name": "VIOL_JSON_SCHEMA"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter array value",
                      "name": "VIOL_PARAMETER_ARRAY_VALUE"
                  },
                  {
                      "block": true,
                      "description": "Illegal Base64 value",
                      "name": "VIOL_PARAMETER_VALUE_BASE64"
                  },
                  {
                      "block": true,
                      "description": "Illegal request content type",
                      "name": "VIOL_URL_CONTENT_TYPE"
                  },
                  {
                      "block": true,
                      "description": "Illegal static parameter value",
                      "name": "VIOL_PARAMETER_STATIC_VALUE"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter value length",
                      "name": "VIOL_PARAMETER_VALUE_LENGTH"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter data type",
                      "name": "VIOL_PARAMETER_DATA_TYPE"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter numeric value",
                      "name": "VIOL_PARAMETER_NUMERIC_VALUE"
                  },
                  {
                      "block": true,
                      "description": "Parameter value does not comply with regular expression",
                      "name": "VIOL_PARAMETER_VALUE_REGEXP"
                  },
                  {
                      "block": true,
                      "description": "Illegal URL",
                      "name": "VIOL_URL"
                  },
                  {
                      "block": true,
                      "description": "Illegal parameter",
                      "name": "VIOL_PARAMETER"
                  },
                  {
                      "block": true,
                      "description": "Illegal empty parameter value",
                      "name": "VIOL_PARAMETER_EMPTY_VALUE"
                  },
                  {
                      "block": true,
                      "description": "Illegal repeated parameter name",
                      "name": "VIOL_PARAMETER_REPEATED"
                  },
                  {
                      "block": true,
                      "description": "Illegal method",
                      "name": "VIOL_METHOD"
                  },
                  {
                      "block": true,
                      "description": "Illegal gRPC method",
                      "name": "VIOL_GRPC_METHOD"
                  }
              ]
          },
          "xml-profiles": [
              {
                  "name": "Default",
                  "defenseAttributes": {
                      "maximumNameLength": 1024
                  }
              }
          ]
      }
  }

12. Let's apply this policy to the Arcadia Finance app, which includes an API. Click on **Instances** in the menu bar.

.. image:: images/instances_navigation.png

13. Select **nginx-plus-1** from the instance list.

.. image:: images/nginx_instance_selection.png

14. Click on **Edit Config** to enter the configuration mode.

.. image:: images/edit_config_nav.png

15. Click the **arcadia-finance.conf** file in the left navigation pane.

.. image:: images/select_app.png

16. Modify the NGINX configuration file **arcadia-finance.conf** to add the WAF policy to the API endpoints. Add this to the server block below the default location:

.. code-block:: text

      location /trading/rest {
          proxy_pass http://arcadia-finance$request_uri;
          proxy_set_header Host  k8s.arcadia-finance.io;
          status_zone arcadia-api;
          app_protect_enable on;
          app_protect_policy_file "/etc/nms/NginxApiSecurityPolicy.tgz";
      }

      location /api/rest {
          proxy_pass http://arcadia-finance$request_uri;
          proxy_set_header Host  k8s.arcadia-finance.io;
          status_zone arcadia-api;
          app_protect_enable on;
          app_protect_policy_file "/etc/nms/NginxApiSecurityPolicy.tgz";
      }

Your screen should look like the screenshot below:

.. image:: images/post_edit_config.png

17. Click **Publish** to deploy the changes. Click **Publish** again when prompted. You'll see a 

.. image:: images/published.png

Test the App Protect Policy
---------------------------

18. Return to the  **Postman** app. Click the **GET Transactions** item in the **Arcadia API** collection.

.. image:: images/get_transaction_nav.png

19. Click **Send**.

.. image:: images/get_transaction_send.png

20. We can see from the response that the API is functioning properly. 

.. image:: images/get_transaction_response.png

21. Now select the **POST Buy Stocks XSS Attack**, then select **Send**. The NAP WAF policy will block this attack, as the response shows. 

.. image:: images/post_buy_stocks_xss_attack.png

22. Run the **POST Buy Stocks** item again with the **OPTIONS** action selected. Notice that this request is now blocked as we do not permit OPTIONS operations.

.. image:: images/post_buy_stocks_options_blocked.png

23. Now, select the **Struts2 Jakarta** item in the **Arcadia Attacks** collection, then press **Send**. This attack is blocked, but not by our WAF policy. Why? Because the URI is not a part of the locations we've added to the policy, so this portion of the app is protected by the original NAP WAF policy.

.. image:: images/struts2_jakarta.png

You've now completed the API WAF portion of the lab.