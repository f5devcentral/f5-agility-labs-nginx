Step 8 - Add Rate Limiting protection
#####################################

In this lab, we will protect the API endpoint with a Rate Limiting policy. To do so, we will limit per authenticated user. In the previous lab, we enable conditional acces in front of the ``colors`` API endpoint. Now we will add Rate Limiting policy.

.. warning:: As you will see, the API Management module in Nginx Controller, does not have the same Rate Limiting capabilities than standalone NGINX Plus instance. For instance, we can not Rate Limit based on JWT claims. BIG-IP APM can be considered for such use case in order to add Advanced Authorization and Rate Limiting policies.

Steps to enable Rate Limiting protection on COLORS API Endpoint
***************************************************************

#. Connect to the Controller UI, APIs, click on your API Definition and edit the Published API ``api-sentence-v3``
#. In Routing, edit the security settings of the component ``cp-colors-v3``
#. Enable Rate Limiting
    #. Key : ``Authenticated Client``
    #. Rate : ``5 requests per minutes``
       .. note:: These 5 req/sec means the client will be allow to send a request every 12 secondes (60 / 5 = 12)
          The client can not send 5 req the first 5 sec, and wait 55 seconds. This is not how the Rate Limiting works.
    #. Excess Request Processing : ``Reject Immediately``
    #. Click ``Next``
#. Click ``Submit``

.. image:: ../pictures/lab2/RL.png
   :align: center

|

Simulate too many request from the client
*****************************************

#. RDP to Win10 VM as user / user
#. Open Postman and collection ``API Sentence Generator v3``, select the previous request ``GET Colors v3``
#. Request a JWT token against Keycloak as ``matt`` and password ``matt`` 
#. Send the request, and don't wait more, send a second request. Your request is blocked because you are allowed to send one request every 12 seconds (5 req / minute)

   .. image:: ../pictures/lab2/429.png
      :align: center

#. Re-Do the test, but wait 12 seconds between each request.
