Step 15 - NGINX Configuration
###########################


Review NGINX API Gateway Configuration from Data Plane 
========================

#. In UDF, SSH or WEBSSH to ``NGINX Plus APIGW-1``

#. In the ``NGINX Plus APIGW-1`` SSH session, issue the ``nginx -T`` command to get a dump of the full NGINX configuration.  You will see more configurations than earlier in the lab.  
   
   .. code-block:: bash
      
      nginx -T

#. Note in the server block of the NGINX configuration that configurations for api.sentence.com have been created and pushed to the data plane from the ACM control plane.  

Review Dev-Portal Configuration from Data Plane
============================

#. In UDF, SSH or WEBSSH to ``Dev Portal``


#. In the ``NGINX Plus APIGW-1`` SSH session, issue the ``nginx -T`` command to get a dump of the full NGINX configuration.   
   
   .. code-block:: bash
      
      nginx -T

#. Note in the server block of the NGINX configuration that configurations for the developer portal.  


Review Configuration from NMS
============================

NMS also has the capability to view the current configuration directly from the control plane utilizing the NGINX Instance Manager (NIM) capabilities.  

#. Log into the NMS environment and select the Instance Manager Module.

   .. image:: ../pictures/lab1/nms-NIM.png
      :align: center

#. Click on Instance Groups in the left hand panel and then select the api-cluster instance group.
   
   .. image:: ../pictures/lab1/nms-instance-group.png
      :align: center

#. NMS will load its built in IDE to displace the nginx configuration.  Scroll through and you will see that the configurations between NMS and the SSH session will be the same.  You can also switch instance groups to review the devportal-cluster configurations.

   .. image:: ../pictures/lab1/nms-ide.png
      :align: center


