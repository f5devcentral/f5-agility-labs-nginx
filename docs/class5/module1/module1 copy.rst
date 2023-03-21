Module 1 - Deploy modern application with modern tools
######################################################

In this class, we will deploy a modern application (Arcadia Finance app) with modern tools in a modern environment.

Each module can be used independently. They do not build on each other.

Module 5: API Security has been recently updated and contains examples of API protections using both NGINX on a centos VM as well as using Kubernetes Ingress Controller. If you only do one section, do that one. You could even do that module first and then come back to the other modules.

Module 1 does not have any commands that need to be run. It is meant to give you background of the application and environment.

Modern tools:
   - Ansible
   - Terraform
   - Gitlab and Gitlab CI

Modern environment:
   - Kubernetes
   - Docker containers with docker registry

.. note:: The goal of the lab is not to learn how to deploy the tools, but to understand how they are used.

**This is Arcadia Finance application:**

.. image:: ./pictures/arcadia-app.png
   :align: center

|

**Class 1 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

