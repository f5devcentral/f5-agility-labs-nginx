Step 5 - Publish API v1.0
#########################

Before publishing our first API, it's important to understand what the DevOps (or API Dev) team provided us.

They provided us an OpenAPI spec file (OASv3) via ``SwaggerHub``. You can consult ``version 1.0`` here: https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence-2022/v1

.. image:: ../pictures/swaggerhub.png
   :align: center
   :scale: 40%

.. note:: This is version 1.0 of the API, and in this version, as you can notice, the ``Colors`` micro-service is not yet available. This means that with this spec file we will publish the API Sentence application without the ``Colors`` micro-service (e.g. a sample sentence might look like ``calm mouse of the mountain``).

|

Create the API Services
***********************

#. In NMS ACM UI, click on ``Services`` menu on the left
#. Create a new workspace. As you can notice, ``Infra team`` and ``API team`` have their own and separated workspaces

   * Name : sentence-app

#. Click on ``Back to Workspaces`` and click on ``sentence-app`` workspace just created

.. note :: We will exposed the API and document it on Dev-Portal at the same time.

Upload the OpenAPI Spec file
============================

#. Click on ``API Docs`` tab

   .. image:: ../pictures/lab1/api-docs.png
      :align: center

#. Click on ``Add API Doc`` and drag drop the swagger file, then click ``Save``

   .. note :: If you are connected on Win10 RDP Jumphost, the Swagger file located on the desktop (oas-sentence-v1.yaml)

   .. note :: If you are not connected on Win RDP Jumphost, but on your laptop's browser, download the OpenAPI Spec file from SwaggerHub https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence-2022/v1

Expose the API proxy
====================

#. Click on ``API Proxies`` tab, and ``Publish to Proxy``

   * Backend Service

      * Name : sentence-svc
      * Service Target Hostname : 10.1.20.7 (this is the K3S Ingress IP Address)
   
   * API Proxy

      * Name : sentence-api
      * Use an OpenAPI Spec ? -> YES
      * API Spec : api-sentence-generator-v1
      * Gateway Proxy Hostname : api.sentence.com

   * Developper Portal

      * Check the box "Also publish API to developper portal"
      * Portal Proxy Hostname : dev.sentence.com
      * No Category

   * Click ``Publish``

   * Click ``Edit Advanced Configurations``

.. image:: ../pictures/lab1/publish-api.png
   :align: center

.. image:: ../pictures/lab1/edit-adv-config.png
   :align: center

Customize and finalize the configuration
========================================

The configuration is not yet finished

   * We have to specify the ``Port`` used by the K8S NodePort exposing the API
   * Define how the API Gateway will ``route`` the API req per ``Version``

#. Edit the API Proxy just created (sentence-api) by clicking on the 3 dots on the top right of the row.

   .. image:: ../pictures/lab1/edit-proxy.png
      :align: center

#. As you can notice, the first page (configuration) is what we just created previously. Click on ``Next``
#. Configure the ``Ingress`` as below

   * Append Rule : version/basepath
   * Strip Base Path and Version before proxying the request : YES
   * Select Status : Latest

      .. image:: ../pictures/lab1/edit-proxy.png
         :align: center

   * Click ``Next``

#. In ``Backend``, modify the ``sentence-svc`` backend by clicking on the 3 dots on the top right of the row

   * Change the Listener Port to ``30511``. This is the port used on K3S to expose the Ingress Node Port.
   * Click ``Save``

#. Click ``Next`` > ``Next`` then ``Save and Publish``

.. note :: Congrats, your first API is exposed on Nginx API Gateway and Documented in Developer Portal.