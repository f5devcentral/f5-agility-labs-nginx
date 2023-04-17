Step 17 - NGINX Plus Metrics Module
#######################
In addition to the data provided through the NGINX agent, there's an additional module that can be utilized.  The NGINX Plus Metrics Module is a dynamic module that you can install on your NGINX Plus data plane instances. The metrics module reports advanced, app-centric metrics and dimensions like “application name” or “gateway” to the NGINX Agent, which then aggregates and publishes the data to the NGINX Management Suite. Advanced, app-centric metrics are used by particular NGINX Management Suite modules, such as API Connectivity Manager, for features associated with HTTP requests.

In this portion of the lab, you will install the NGINX Plus dynamic metrics module and configure NGINX Agent to push app-centric metrics to NGINX Management Suite.

NGINX Plus Metrics Module
========================================

#. In UDF, SSH or WEBSSH to ``NGINX Plus APIGW-1``

#. In the ``NGINX Plus APIGW-1`` SSH session, stop NGINX Agent Process before installing the NGINX Plus metircs module.
   
   .. code-block:: bash
      
      sudo systemctl stop nginx-agent

#. Install the NGINX Plus Metrics Module from the NMS suite.  

   .. code-block:: bash

      curl -k https://10.1.1.6/install/nginx-plus-module-metrics | sudo sh -s -- --skip-verify false

#. Configure NGINX Agent to use Advanced Metrics. To enable advanced metrics, edit the ``/etc/nginx-agent/nginx-agent.conf`` file and add the following directives:

   .. code-block:: bash

      advanced_metrics:
        socket_path: /var/run/nginx-agent/advanced-metrics.sock
        aggregation_period: 1s
        publishing_period: 3s
        table_sizes_limits:
          staging_table_max_size: 1000
          staging_table_threshold: 1000
          priority_table_max_size: 1000
          priority_table_threshold: 1000

#. Start NGINX Agent

   .. code-block:: bash

      sudo systemctl start nginx-agent

NGINX Plus Metrics
===========
Learn how to edit and publish NGINX configuration files using NGINX Management Suite Instance Manager.

Overview
With Instance Manager, you can easily edit and publish NGINX configurations to your NGINX and NGINX Plus instances. As you edit your configurations, the NGINX config analyzer will automatically detect and highlight errors, ensuring accuracy and reliability.


#. In NMS, update the configuration of the api-gw instance group

   .. image:: ../pictures/lab2/nim-instancegroup-apigw.png
      :align: center

#. Enable NGINX Plus API to collect NGINX Plus metrics by uncommenting the /api/ location section in /etc/nginx/conf.d/default.conf

   .. code-block:: bash
      # enable /api/ location with appropriate access control in order
      # to make use of NGINX Plus API
      #
      location /api/ {
         api write=on;
         allow 127.0.0.1;
         deny all;
      }
      .. image:: ../pictures/lab2/conf.d.default.conf.png
      :align: center


Generate Traffic and Observe Traffic Metrics
===========

#. Interact with the API-GW either by sending requests via your POSTMAN client.
#. In NMS, switch to the NIM - NGINX Instance Module. Under Modules, select the Instance Manager
#. Select the api-gw instance on the Instances detail page.
#. Select the Metrics Summary tab.
#. To view detailed metrics as graphs, select the ``Metrics`` tab.
