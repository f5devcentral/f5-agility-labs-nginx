Step 4 - Publish API v1.0
#########################

Before publishing our first API, it's important to understand what the DevOps (or API Dev) team provided us.

They provided us an OpenAPI spec file (OASv3) via ``SwaggerHub``. You can consult ``version 1.0`` here: https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/1.0

.. image:: ../pictures/lab1/OASv1.0.png
   :align: center

.. note:: This is version 1.0 of the API, and in this version, as you can notice, the ``Colors`` micro-service is not yet available. This means that with this spec file we will publish the API Sentence application without the ``Colors`` micro-service (e.g. a sample sentence might look like ``calm mouse of the mountain``).

|

Steps to publish version 1.0 of the API
********************************************

Create the API Definition
=========================

#. In NGINX Controller, select ``Home`` (the NGINX logo on the top left corner) -> ``Services`` -> ``APIs`` -> ``Create API Version``:

   #. First, you will need to create an ``API Definition``. To do so, click on ``CREATE NEW`` under the API Definition box (which is empty):

      * Name: ``api-sentence``
      * Click ``Submit``

   #. Select ``OpenAPI Specification`` -> ``Copy and paste specification text``.
   #. Copy and paste the YAML content from https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/1.0
   #. Verify that the version set by NGINX Controller is ``1.0``. This information is extracted from the spec file.
   #. Click ``Next``. You will notice NGINX Controller imported all the ``PATH`` and ``METHODS`` resources from the spec file.
   #. Click ``Submit``

   .. note:: At this moment in the configuration process, NGINX Controller knows the API paths and methods, but does not know where to proxy the traffic to.

#. Click on the created API Definition. On the right side menu you can see the ``version`` and the number of ``resources``:

   .. image:: ../pictures/lab1/api-definition.png
      :align: center
      :class: with-border

|

Create a Published API for v1.0
===============================

#. Let's now publish version 1.0 of the API. Click on ``Add Published API``. Use the following values:
    
   * Name: ``api-sentence-v1``
   * Click ``Next``
   * Environment: ``env_prod``
   * App: ``api-sentence-app`` (we automatically created this for you behind the scenes for this lab)
   * Gateways: ``apigw``
   * Click ``Next``

      .. image:: ../pictures/lab1/deployment.png
         :align: center
         :class: with-shadow

#. In ``Routing``, we will create one ``component`` per ``micro-service``:
    #. Click ``Add New`` to create a new component for the ``Generator`` micro-service:
        #. Name: ``cp-generator``
        #. Click ``Next``
        #. In ``Workload Groups``:
            * Name: ``wl-generator``
            * In ``Backend Workload URIs``:
            
               * URI: ``http://10.1.20.8:31200``
               
                  .. note:: This URL is the FQDN and the NodePort used by the micro-service running in the K3S.
               
               * Click ``Done``
            * Click ``Done``
        #. Click ``Next``

           .. image:: ../pictures/lab1/component-generator.png
              :align: center

        #. Click ``Submit``

    #. We now have to replicate the same steps for each other of the micro-services

       .. list-table:: List of all micro-services and their component configuration
          :header-rows: 1

          * - Name
            - Workload Group Name
            - Backend Workload URI

          * - cp-generator
            - wl-generator
            - http://10.1.20.8:31200

          * - cp-locations
            - wl-locations
            - http://10.1.20.8:31103

          * - cp-animals
            - wl-animals
            - http://10.1.20.8:31101

          * - cp-adjectives
            - wl-adjectives
            - http://10.1.20.8:31100


    #. You should now have a list of 4 empty ``components``.
    #. On the left side, under ``Unrouted`` you can see every API ``Path`` imported from the OAS spec file.
    #. Drag and drop each unrouted API ``Path`` (shown as a ``resource`` here) to the ``corresponding component``.

       .. image:: ../pictures/lab1/routing.png
          :align: center

#. Click ``Submit``

.. image:: ../pictures/lab1/published-api-v1.0.png
   :align: center

|

.. note:: API v1.0 is now published, and we can now check if it is working as expected.

|

Test the v1.0 API deployment
============================

Steps:

#. RDP to the ``Win10`` VM (user/user).
#. Open the ``Edge Browser`` and select the ``Random Name Generator`` bookmark.
#. The ``Frontend`` will display a sentence with ``Words`` coming from the ``Generator``.

   .. image:: ../pictures/lab1/frontend-nocolors.png
      :align: center

   .. note:: As you can notice, there are no ``Colors`` in the sentence as we didn't deploy and publish the ``Color`` micro-service. This lab's traffic flow is shown below, and as you can see, the web traffic is not passing through the API Gateway yet. Instead, all the web traffic is routed through the k8s ingress.

   .. image:: ../pictures/lab1/api-workflow.png
      :align: center

#. Open ``Postman`` and select the ``API Sentence Generator v1 and v2`` collection.
#. Send a request with the ``GET Locations`` call. The FQDN is different from the ``Frontend`` web app, and reaches the API Gateway directly. The API Gateway will in turn route the request to the ``Locations`` micro-service, and will return all the entries (all the words).

   .. code-block:: JSON

        [
            {
                "id": 1,
                "name": "valley"
            },
            {
                "id": 2,
                "name": "park"
            },
            {
                "id": 3,
                "name": "mountain"
            }
        ]

#. Send a request with the ``GET a Sentence from Generator`` call. This request will request the ``Generator`` micro-service to get one word per ``Word`` micro-service.

   .. code-block:: JSON

        {
           "adjectives": "calm",
           "animals": "whale",
           "locations": "park"
        }

   .. note:: The above results will generate the sentence ``calm whale of the park`` in the ``Frontend`` application.

.. warning:: Congrats! You just published your first API using NGINX Controller and NGINX Plus as an API Gateway!
