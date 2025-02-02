Secure the Application
######################

Securing the ChatBot is very important but before doing that even more important is securing the full application.

In order to achive this we will do a WAAP config protection on our application which at the same time will actually help us some of the OWASP Top 10 GeniAi attacks.

We will enable and configure the following:

1. App Firewall - F5XC Web Application Firewall based on negative security
2. API discovery and protection based on Arcadia Crypto OpenApi Spec which will allow us to protect the APIs and enforce positive security
3. Bot protection
4. DDOS protection

We have already published the application, now we will finish the security configuration.

1. We will start by configuring our **App Firewall** policy

   Web App & API Protection → App Firewall → Add App Firewall → Fill the bellow data → Save and Exit

   .. table::
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-waf
      
      **Enforcement Mode**              blocking
      ==============================    ========================================================================================


   .. raw:: html   

      <script>c6m3l1a();</script>  

2. Create an **API definition** based on the pre uploaded Arcadia Crypto OpenApi Spec 

   Web App & API Protection → Api Management → Api Definition → Add API Definition → Fill the bellow data → Save and Exit

   .. table::
      :widths: auto

      ===============================    ========================================================================================
      Object                             Value
      ===============================    ========================================================================================
      **Name**                           arcadia-api-definition
      
      **OpenAPI Specification Files**    **Add Item** → shared/arcadia-crypto-oas/v5-24-09-04
      ===============================    ========================================================================================


   .. raw:: html   

      <script>c6m3l1b();</script>        

3. Now we will go to the **Load Balancer** config and do the rest:

   Web App & API Protection → Load Balancers → HTTP Load Balancer → Click the 3 dots under the **arcadia-re-lb** row → Manage Configuration → Edit Configuration

   a) Attach the **Web Application Firewall** policy to the **HTTP Load Balancer**

      .. table::
        :widths: auto

        ==================================    ========================================================================================
        Object                                Value
        ==================================    ========================================================================================
        **Web Application Firewall (WAF)**    Enable
    
        **Enable**                            $$namespace$$/arcadia-waf
        ==================================    ========================================================================================

   b) Enable **BOT protection**

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **Bot Defense**                               Enable
    
        **Bot Defense Region**                        EU
        ==========================================    ========================================================================================

      On the same place click **Configure** under **Bot Defense Policy** → Configure → Add Item → Fill the bellow data → Apply → Apply → Apply

      .. table::
          :widths: auto

          ==========================================    ========================================================================================
          Object                                        Value
          ==========================================    ========================================================================================
          **Name**                                      chatbot
    
          **HTTP Methods**                              POST

          **Prefix**                                    /v1/ai/chat

          **Select Bot Mitigation action**              Block      
          ==========================================    ========================================================================================

   c) Enable **API Discovery** and **API Protection**

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **API Discovery**                             Enable
   
        **API Definition**                            Enable → Choose **$$namespace$$/arcadia-api-definition**

        **Validation**                                API Inventory
        ==========================================    ========================================================================================    

      Click **View Configuration** under **API Inventory** → Fill in the bellow config

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **Request Validation Enforcement Type**       Block
    
        **Request Validation Properties**             Enable all options

        **Fall Through Mode**                         Custom
        ==========================================    ========================================================================================            

      Click **Configure** under **Custom Fall Through Rule List** → **Add Item** → Fill in the bellow config → Apply → Apply → Apply → Save and Exit

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **Name**                                      only-apis
    
        **Action**                                    Block

        **Type**                                      Base Path

        **Base Path**                                 /v1
        ==========================================    ========================================================================================            

   .. raw:: html   

      <script>c6m3l1c();</script>                 