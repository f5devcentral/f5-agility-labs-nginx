Expose the application
######################

For this lab, we will use the following configuration

1. Create the Origin Pool targeting Arcadia public app
 
a) Web App & API Protection → Load Balancers → Origin Pool → Add Origin Pool → Fill the bellow data

   .. table:: 
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Name**                          arcadia-public-endpoint
      
      **Port**                          443 

      **TLS**                           Enable
      ==============================    ========================================================================================

b) In the same screen → Origin Servers → Add Item → Fill the bellow data → Apply 

   .. table:: 
      :widths: auto

      ====================    ========================================================================================
      Object                  Value
      ====================    ========================================================================================
      **DNS name**            The saved dynamic hostname of the application
      ====================    ========================================================================================

c) In the same screen → Under TLS click View configuration → Fill the bellow data → Apply → Save and exit

   .. table:: 
      :widths: auto

      ==============================    ========================================================================================
      Object                            Value
      ==============================    ========================================================================================
      **Origin Server Verification**    Skip Verification
      ==============================    ========================================================================================      






   .. image:: ../pictures/01.gif
      :align: center
      :class: bordered-gif

2. Create the HTTP LB

a) Web App & API Protection → Load Balancers → HTTP Load Balancer → Add HTTP Load Balancer → Fill the bellow data → Save and exit

   .. table:: 
      :widths: auto

      ====================================    =================================================================================================
      Object                                  Value
      ====================================    =================================================================================================
      **Name**                                arcadia-re-lb
                     
      **Domains**                             arcadia-re-$$makeId$$.lab-sec.f5demos.com

      **Load Balancer Type**                  HTTP
                                                                                 
      **Automatically Manage DNS Records**    Enable 

      **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select <dynamic namspace>/arcadia-public-endpoint → Apply
      ====================================    =================================================================================================

   .. image:: ../pictures/02.gif
      :align: center      
      :class: bordered-gif

3. So far, Arcadia is not protected but exposed all over the world on all F5XC RE. 
Check your Arcadia application is exposed and reachable from the F5XC Global Network by browsing to the `Arcadia application <http://arcadia-re-$$makeId$$.lab-sec.f5demos.com>`_.
