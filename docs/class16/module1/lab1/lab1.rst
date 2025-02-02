Lab 1 - Expose the application
##############################

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

      **Origin Server Verification**    Skip Verification 
      ==============================    ========================================================================================

b) In the same screen → Origin Servers → Add Item → Fill the bellow data → Apply → Save and exit

   .. table:: 
      :widths: auto

      ====================    ========================================================================================
      Object                  Value
      ====================    ========================================================================================
      **DNS name**            $$hostArcadia$$
      ====================    ========================================================================================

   .. raw:: html   

      <script>c6m1l1a();</script>  

2. Create the HTTP LB

a) Web App & API Protection → Load Balancers → HTTP Load Balancer → Add HTTP Load Balancer → Fill the bellow data → Save and exit

   .. table:: 
      :widths: auto

      ====================================    =================================================================================================
      Object                                  Value
      ====================================    =================================================================================================
      **Name**                                arcadia-re-lb
                     
      **Domains**                             arcadia-re-$$makeId$$.workshop.emea.f5se.com

      **Load Balancer Type**                  HTTP
                                                                                 
      **Automatically Manage DNS Records**    Enable 

      **Origin Pools**                        Click **Add Item**, for the **Origin Pool** select $$namespace$$/arcadia-public-endpoint → Apply
      ====================================    =================================================================================================

   .. raw:: html   

      <script>c6m1l1b();</script>  

3. So far, Arcadia is not protected but exposed all over the world on all F5XC RE. 
Check your Arcadia application is exposed and reachable from the F5XC Global Network by browsing to :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com`

.. warning:: Some Service Providers have a very long recursive cache. It can take several minutes to get a DNS response. You can change your DNS server to 1.1.1.1 or 8.8.8.8 to fix that.