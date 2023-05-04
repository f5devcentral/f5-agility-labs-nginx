Step 3 - Link the API GW and Dev Portal
#######################################

It is time to ``link`` the API-GW and Dev-Portal instances with NMS.
To do so, we will execute the Nginx Agent installer on both instances.

Link the API-GW instance
========================
#. In NMS UI, click on the ``API Cluster Gateway`` row (not the name link) to pop out the right frame with the commands to execute

   .. image:: ../pictures/lab2/api-cluster-curl.png
      :align: center

#. Copy the cURL command; it should look like this

   .. code-block:: bash
    
      curl -k https://10.1.1.6/install/nginx-agent > install.sh && sudo sh install.sh -g api-cluster && sudo systemctl start nginx-agent
      
   .. warning:: check the FQDN is 10.1.1.6 and not the UDF public proxy FQDN
#. In UDF, SSH or WEBSSH to ``NGINX Plus APIGW-1``

   .. image:: ../pictures/lab2/apigw-udf-webshell.png
      :align: center

#. In the ``NGINX Plus APIGW-1`` SSH session, issue the ``nginx -T`` command to get a dump of the full NGINX configuration.  Note the relative lack of configuration on the data plane.  (If you are seeing permission issues, you may need to utilize SUDO priviliges to execute the nginx -T command.)
   
   .. code-block:: bash
      
      nginx -T

#. In the ``NGINX Plus APIGW-1`` SSH session, paste and execute the cURL command copied from NMS. You will see the below outcome at the end of the installation.

   .. code-block:: bash

      ----------------------------------------------------------------------
      NGINX Agent package has been successfully installed.

      Please follow the next steps to start the software:
      sudo systemctl start nginx-agent

      Configuration settings can be adjusted here:
      /etc/nginx-agent/nginx-agent.conf

      ----------------------------------------------------------------------

      Installing nginx-agent package ... done.
      Updating /etc/nginx-agent/agent-dynamic.conf ...
      Setting existing instance_group: api-cluster
      Successfully updated /etc/nginx-agent/agent-dynamic.conf




Link the Dev-Portal instance
============================


#. In the NSM UI, Like the API-GW instance, click the ``Developer Portal Clusters`` row and copy the cURL command.

   .. warning:: DO NOT CLICK ON ``Developer Portal Internal Clusters``

   .. image:: ../pictures/lab2/devportal-curl.png
      :align: center


#. The cURL command should look like this

   .. code-block:: bash

      curl -k https://10.1.1.6/install/nginx-agent > install.sh && sudo sh install.sh -g devportal-cluster && sudo systemctl start nginx-agent

   .. warning:: Check that the FQDN is 10.1.1.6 and not the UDF public proxy FQDN

#. In UDF, SSH or WEBSSH to ``Dev Portal``


   .. image:: ../pictures/lab2/devportal-udf-webshell.png
      :align: center


#. In the ``NGINX Dev-Portal`` SSH session, again issue the ``nginx -T`` command to get a dump of the full NGINX configuration. 
   
   .. code-block:: bash
      
      nginx -T

#. On the ``NGINX Dev-Portal`` SSH session, paste and execute the cURL command. You will see the below outcome at the end of the installation.

   .. code-block:: bash

      ----------------------------------------------------------------------
      NGINX Agent package has been successfully installed.

      Please follow the next steps to start the software:
      sudo systemctl start nginx-agent

      Configuration settings can be adjusted here:
      /etc/nginx-agent/nginx-agent.conf

      ----------------------------------------------------------------------

      Installing nginx-agent package ... done.
      Could not find /etc/nginx-agent/agent-dynamic.conf ... Creating file
      Successfully created /etc/nginx-agent/agent-dynamic.conf
      Updating /etc/nginx-agent/agent-dynamic.conf ...
      Setting instance_group: devportal-cluster
      Successfully updated /etc/nginx-agent/agent-dynamic.conf


Check instances connectivity with NMS
=====================================

#. In ``API Gateway Clusters`` section, click on name ``api-cluster``

   .. image:: ../pictures/lab2/env-overview.png
      :align: center

#. Scroll down and check your API-GW instance is linked and green

   .. image:: ../pictures/lab2/api-gateway.png
      :align: center

#. Switch to the ``Dev-Portal`` by clicking on the cluster top menu

   .. image:: ../pictures/lab2/switch-devportal.png
      :align: center

#. You can see your Nginx DevPortal instance GREEN, but also a way to customize the DevPortal

   .. image:: ../pictures/lab2/dev-portal-cluster.png
      :align: center

Wait for the environment to be GREEN
====================================

#. Switch back to your Infrastructure team-sentence Workspace screen. And check the ``Job Status``

   .. note :: If you don't see the column ``Job Status``, scroll to the right; the column is hidden because of the Win10 RDP low resolution.

#. Wait till it passes to ``Success``. This can take several minutes.

   .. image:: ../pictures/lab2/status-pending.png
      :align: center


   .. image:: ../pictures/lab2/status-success.png
      :align: center