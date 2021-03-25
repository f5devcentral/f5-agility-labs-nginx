Step 5 - Publish API v2.0
#########################

In the previous lab, we published the Version v1.0 of the API. As you noticed, the API Sentence application was not fully finsihed. The ``COLORS`` micro-service was not yet available.

Now, the API Dev finished the COLORS app, and they are going to push this app to the Kubernetes environment. They expect from the NetOps/SecOps to publish this new version of the API Sentence App.

The API Dev provided with a new version of the AOS spec file. This new version is available on SwaggerHub : https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/2.0

.. image:: ../pictures/lab2/swaggerv2.png
   :align: center

.. note:: You can notice the new PATH for ``COLORS``

Steps to publish the Version v2.0 of the API
********************************************

Deploy the new COLORS micro-service in k8s
==========================================

Let's deploy COLORS micro-service like a DevOps.

#. SSH or WEBSSH to ``Docker (k3s + Rancher)`` VM
#. Run the Kubectl command in order to deploy the COLORS micro-service and its k8s service

   .. code-block:: bash

      sudo su
      kubectl apply -f /home/ubuntu/k3s/attribut_add_colors.yaml -n api

   .. note:: As you can notice, this micro-service is deployed in the same NameSpace as other WORDS micro-service (api)

#. RDP to Win10 (user/user)
#. And check in Rancher (admin/admin) that the new deployment is deployed (deployment and service)

   .. image:: ../pictures/lab2/rancher-deploy-colors.png
      :align: center

   .. image:: ../pictures/lab2/rancher-service-colors.png
      :align: center

#. In Win10 browser, connect to the ``FrontEnd`` and check the new micro-service is providing a COLOR.

   .. image:: ../pictures/lab2/frontend-color.png
      :align: center

.. warning:: Why the FrontEnd is publishing the COLORS micro-service whereas the API Gateway is not yet configured with this new endpoint ? 

   The reason is the FrontEnd is **directly connected** to all micro-serices k8s services. This is an East/West communication. Our Nginx API Gateway is publishing the API externally for other consumers (mobile app, partners ...)

|

Update the API Definition with the Version v2.0
===============================================

#. Connect to the Controler UI, and edit your existing API Definition ``api-sentence-app``

   .. image:: ../pictures/lab2/edit-api-def.png
      :align: center

#. Copy the OAS definition v2.0 from the Swaggerhub https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/2.0
#. Click on ``Copy and paste specification text`` and paste the v2.0 of API spec

   .. image:: ../pictures/lab2/oasv2.png
      :align: center

   .. note:: As you can notice, the version of the API Definition, didn't not change in the UI (still v0.1). This is a known bug, and will be fix in the next release to reflect the update (v2.0)

#. Click ``Next`` and ``Submit``

   .. note:: You can notice one more ``resource`` -> Resources : 10

      .. image:: ../pictures/lab2/10resources.png
         :align: center


|

Update the Published API with the new COLORS endpoint
=====================================================

#. The ``COLORS API`` endpoint is now known by our API Definition, it is time to publish it
#. Edit the Published API

   .. image:: ../pictures/lab2/edit-published.png
      :align: center

#. In ``Routing`` menu, you can see the ``PATH`` and ``METHODS`` for ``COLORS``
#. Create a new component to route the requests to the right k8s COLORS service. Click ``Add New``
    #. Name: ``cp-colors``
    #. Workload Group Name: ``wl-colors``
        #. Backend Workload URIs : http://10.1.20.8:31102
        #. Click ``Done``
    #. Click ``Done``
    #. Click ``Next`` and ``Submit``

   .. image:: ../pictures/lab2/workload.png
      :align: center

#. Drag and Drop the 2 PATH for COLORS into the ``cp-colors`` component
#. Click ``Next`` and ``Submit``

|

Test your API v2.0
==================

Steps:

#. RDP to Win10 machine as ``user`` and password ``user``
#. Open ``Postman`` and the collection ``API Sentence Generator``
#. Send a request with the ``GET Colors`` call. The API GW will route the request to the ``Colors`` micro-services, and will return all the entries (all the words)

   .. code-block:: js

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
    
#. Send a request with the ``GET a sentence from Generator``. This request will ask generator to get one word per micro-service. You can notice, there is a new entry for the ``color``

   .. code-block:: js

        {
           "adjectives": "calm",
           "animals": "whale",
           "colors": "yellow",
           "locations": "park"
        }

   .. note:: The above outcomes will generate the sentence ``calm whale of the yellow park`` in the FrontEnd application.

.. warning:: CONGRATS, you updated the published API to v2.0 with Nginx Controller and an API Gateway
   As this v2.0 does not break the v1.0, we haven't created a dedicated v2.0 published API. We updated the v1.0.

   In the next lab, we will update the API to v3.0, and this upgrade will break the v2.0 as we will create a new parameter for an existing EndPoint.

   