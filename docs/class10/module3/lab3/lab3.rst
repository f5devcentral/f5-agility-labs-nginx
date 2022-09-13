Step 6 - Publish API v3.0
#########################

The API Dev has now modified an existing endpoint. They modified the ``Locations`` micro-service in order to add a new JSON object for the coordinates of the location.

To do so, they:

* Created a new micro-service container image, with a new tag (v3.0): registry.gitlab.com/sentence-application/locations/volterra:v3.0
* Created a new version (v3.0) of the OAS spec file: https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/3.0

As you can see in the OAS file v3.0, the ``/locations`` endpoint has a new JSON object:

.. image:: ../pictures/lab3/oasv3.png
   :align: center

.. warning:: Modifying an existing API endpoint means the API v2.0 will break. Any mobile application or API client using the ``/locations`` endpoint will receive an error if we don't create a dedicated version for this new API version.

Steps to publish API v3.0
*************************

Deploy the new ``Locations`` v3.0 micro-service in k8s
======================================================

Let's deploy the ``Locations`` v3.0 micro-service!

#. SSH (or Web) to the ``Docker (k3s + Rancher + ELK)`` VM.
#. Run the following ``kubectl`` command in order to deploy the ``Locations`` micro-service and its k8s service:

   .. code-block:: bash

      sudo su
      kubectl apply -f /home/ubuntu/k3s/attributs_locations_v3.yaml -n api

   .. note:: As you can notice, this micro-service is deployed in the same ``NameSpace`` as the other ``Words`` micro-services (api), and the previous version of the ``Locations`` micro-service is still there, because it's currently used by clients.

#. RDP to the ``Win10`` VM (user/user).
#. Check in ``Rancher`` (admin/admin) that the new ``Deployment`` has been successful (both the ``Deployment`` and ``Service``)

   .. image:: ../pictures/lab3/rancher-deploy-locationv3.png
      :align: center

   .. image:: ../pictures/lab3/rancher-service-locationv3.png
      :align: center

.. note:: Great! So now, the ``Location`` micro-service is running with 2 versions (v1.0) and (v3.0). Both versions are published through ``NodePort`` on 2 different ports:

   - Port 31103 for Locations v1/v2
   - Port 31303 for Locations v3

|

Create version 3.0 for the existing API Definition
====================================================

#. Connect to NGINX Controller, and enter in the APIs configuration section (Top left Nginx Logo menu -> Services -> APIs)
#. Select your API Definition ``api-sentence``, and on the top right corner select ``Add Version``.

   .. image:: ../pictures/lab3/addversion.png
      :align: center

#. Select ``OpenAPI Specification`` -> ``Copy and paste specification text``.
#. Copy and paste the v3.0 OAS YAML content from https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/3.0

   .. note:: You can notice the version is automatically set to ``3.0``

   .. image:: ../pictures/lab3/pasteoas.png
      :align: center

#. Click ``Submit``

.. note:: You should now see on the right sidebar the new ``3.0`` version

   It is time to publish this new version of the API for a sample of clients (early access, beta ...)

   .. image:: ../pictures/lab3/version3.png
      :align: center

|

Publish version 3.0 of the API
==============================

.. note:: This new API version will listen on a specific path (``/v3/``) in order to differentiate the ``Production API (v2.0)`` from this ``Early Access API (v3.0)``.

#. Select the 3.0 API Definition, click on ``Add Published API``. Use the following values:

   .. image:: ../pictures/lab3/add-publish-v3.png
      :align: center

#. Start by setting the ``Base Path``. This is the path to differentiate the various Published APIs. Set it to ``/v3`` and check the box ``Strip Base Path`` so that the API Gateway does not use the path to connect to the backend micro-services.

   .. image:: ../pictures/lab3/basepath.png
      :align: center

   * Name: ``api-sentence-v3``
   * Click ``Next``.
   * Set the Environment, the App and the Gateway as with version 1.0.

        .. image:: ../pictures/lab3/deployment.png
           :align: center

   * Click ``Next``

#. Configure the ``Routing`` as with version 1.0 except for the ``location`` component which now routes the traffic to a different micro-service in k8s (listening on port 31303 instead of 31103 for v1.0).

   .. list-table:: List of all micro-services and their component configuration.
      :header-rows: 1

      * - Name
        - Workload Group Name
        - Backend Workload URI

      * - cp-generator-v3
        - wl-generator-v3
        - http://10.1.20.8:31200

      * - cp-locations-v3
        - wl-locations-v3
        - http://10.1.20.8:31303

      * - cp-animals-v3
        - wl-animals-v3
        - http://10.1.20.8:31101

      * - cp-adjectives-v3
        - wl-adjectives-v3
        - http://10.1.20.8:31100

      * - cp-colors-v3
        - wl-colors-v3
        - http://10.1.20.8:31102

#. Drag and drop each ``Path`` resource to the ``corresponding component``.

   .. image:: ../pictures/lab3/routingv3.png
      :align: center

#. Click ``Submit``

#. Check if your ``Published API`` is green. If not, address any errors and re-submit.

    .. note:: The flag can take some time to become GREEN (due to resources limitations in UDF). If the flag is RED, wait few seconds, and re-submit your changes (refresh the page too). 

   .. image:: ../pictures/lab3/green.png
      :align: center

|

Test the v3.0 (and v2.0) API deployments
========================================

Steps:

#. RDP to the ``Win10`` VM (user/user).
#. Open ``Postman`` and the ``API Sentence Generator v3`` collection.
#. Send a request with the ``GET Colors v3`` call, and check the ``PATH``. Notice that the ``PATH`` starts with ``/v3``. It means the request is being routed by version 3 of the API Definition.

   .. code-block:: JSON

        [
            {
                "id": 1,
                "name": "red"
            },
            {
                "id": 2,
                "name": "blue"
            },
            {
                "id": 3,
                "name": "green"
            },
            {
                "name": "black",
                "id": 4
            },
            {
                "name": "yellow",
                "id": 5
            }
        ]

#. Send a request with the ``GET Locations v3`` call. This is the updated version of the ``location`` micro-service running in k8s.

   .. code-block:: JSON

        [
            {
                "id": 2,
                "name": "park",
                "coordinates": [
                    -142.28261413,
                    53.28261413
                ]
            },
            {
                "id": 3,
                "name": "mountain",
                "coordinates": [
                    -110.28261413,
                    31.28261413
                ]
            },
            {
                "name": "valley",
                "coordinates": [
                    -123.10664756,
                    49.28261413
                ],
                "id": 4
            }
        ]

   .. note:: As you can see, we now have a new JSON object ``coordinates``, coming from the updated ``location`` micro-service.

#. Send a request with the ``GET Locations`` call in the ``API Sentence Generator v1 and v2`` collection in order to test that version 2.0 is still up and running.

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

.. warning:: Congrats! You published v3.0 of your API and it's correctly being routed to the new ``locations`` micro-service! Furthermore, version 2.0 is still available for any "current" clients. Only the Early Access clients querying the ``/v3`` path get access to this new API.
