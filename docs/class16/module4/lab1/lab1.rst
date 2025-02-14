Secure the Application
######################

Securing the ChatBot is very important but before doing that even more important is securing the full application.

In order to achive this we will do a WAAP config protection on our application which at the same time will actually help us some of the OWASP Top 10 GeniAi attacks.

We will enable and configure the following:

1. App Firewall - F5XC Web Application Firewall based on negative security
2. API discovery and protection based on Arcadia Crypto OpenApi Spec which will allow us to protect the APIs and enforce positive security
3. Bot protection

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

   .. image:: ../pictures/01.gif
      :align: center
      :class: bordered-gif

2. Create an **API definition** based on the pre uploaded Arcadia Crypto OpenApi Spec 

   Web App & API Protection → Api Management → Api Definition → Add API Definition → Fill the bellow data → Save and Exit

   .. table::
      :widths: auto

      ===============================    ========================================================================================
      Object                             Value
      ===============================    ========================================================================================
      **Name**                           arcadia-api-definition
      
      **OpenAPI Specification Files**    **Add Item** → shared/api-arcadia-oas/v1-25-02-02
      ===============================    ========================================================================================

   .. image:: ../pictures/02.gif
      :align: center
      :class: bordered-gif      

3. Now we will go to the **Load Balancer** config and do the rest:

   Web App & API Protection → Load Balancers → HTTP Load Balancer → Click the 3 dots under the **arcadia-re-lb** row → Manage Configuration → Edit Configuration

   a) Attach the **Web Application Firewall** policy to the **HTTP Load Balancer**

      .. table::
        :widths: auto

        ==================================    ========================================================================================
        Object                                Value
        ==================================    ========================================================================================
        **Web Application Firewall (WAF)**    Enable
    
        **Enable**                            <dynamic namespace>/arcadia-waf
        ==================================    ========================================================================================

      .. image:: ../pictures/03.gif
         :align: center
         :class: bordered-gif  

   b) Enable **BOT protection**

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **Bot Defense**                               Enable
    
        **Bot Defense Region**                        US
        ==========================================    ========================================================================================

      On the same place click **Configure** under **Bot Defense Policy** → Configure → Add Item → Fill the bellow data → Apply → Apply → Apply

      .. table::
          :widths: auto

          ==========================================    ========================================================================================
          Object                                        Value
          ==========================================    ========================================================================================
          **Name**                                      chatbot
    
          **HTTP Methods**                              POST

          **Endpoint Label**                            Undefined

          **Prefix**                                    /v1/ai/chat

          **Select Bot Mitigation action**              Block      
          ==========================================    ========================================================================================

      .. image:: ../pictures/04.gif
         :align: center
         :class: bordered-gif            

   c) Enable **API Discovery** and **API Protection**

      .. table::
        :widths: auto

        ==========================================    ========================================================================================
        Object                                        Value
        ==========================================    ========================================================================================
        **API Discovery**                             Enable
   
        **API Definition**                            Enable → Choose **<dynamic namespace>/arcadia-api-definition**

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

      .. image:: ../pictures/05.gif
         :align: center
         :class: bordered-gif  

        