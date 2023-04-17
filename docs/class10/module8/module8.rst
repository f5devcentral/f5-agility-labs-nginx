Module 8 - Observability and Monitoring
################################

In this module, we will explore the additional information you can gather on your API environment from the NGINX Management Suite (NMS) suite specifically within the NGINX Instance Manager (NIM) module.

In an earlier portion of the lab, NGINX Agent was deployed via a CURL command to integrate the NGINX+ data plane nodes with the API Connectivity Manager control plane.  

NGINX Agent runs as a companion process on a system running NGINX. It provides gRPC and REST interfaces for configuration management and metrics collection from the NGINX process and operating system. NGINX Agent enables remote interaction with NGINX using common Linux tools and unlocks the ability to build sophisticated monitoring and control systems that can manage large collections of NGINX instances.

.. image:: pictures/intro/nginx-agent-flow.png
   :align: center

In this portion of the lab, we will review the configurations that were updated on the NGINX plus data plane instances and also review the metrics collected from the data plane from a centralized view in NMS. 

.. warning :: All actions in the NMS UI must be done from the Win10 Jumphost RDP session

**Module 8 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*
