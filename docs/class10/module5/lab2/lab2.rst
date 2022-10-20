Step 10 - Test API v2.0
#######################

Now, it is time to test the new API published by API Team. To so so, the Developer needs to ask for a new API Key for this new version. API Keys are tied to the API version.

Check the doc for Version 2
===========================

#. Connect to the Developer Portal
#. Click on ``APIs`` and select the ``sentence-api. 

   .. note :: You can notice the 2 versions for the same API (v1 and V2)
      
      .. image:: ../pictures/lab2/home-versions.png
         :align: center

#. Select ``v2`` in the top left drill-down menu

   .. image:: ../pictures/lab2/select-v2.png
      :align: center

#. Now, you can see the ``colors`` API endpoint

   .. image:: ../pictures/lab2/doc-v2.png
      :align: center


Test API Version 2 with Postman
===============================

#. Login as ``dev1`` (password dev1) - if the cookie is still there, authentication will be transparent (thanks to OIDC)
#. Click on ``App Credentials`` and enter into your organisation
#. ``Create credential`` for the version 2

   .. image:: ../pictures/lab2/cred-v2.png
      :align: center
      :scale: 50%

#. Copy the new Key and open ``Postman``
#. Select ``GET Colors``, add your API key in Authorization and send the Request

   .. note :: Request fails with a 403 response code.

      .. image:: ../pictures/lab2/colors-403.png
         :align: center

    .. note :: As you can notice, as /colors is not part of the v1, the API Gateway denied the request. The URI path is wrong. It must be ``/v2/api/``

#. Still in Postman, modify the request to ``http://api.sentence.com/v2/api/colors`` and send it -> it passes

   .. image:: ../pictures/lab2/colors-ok.png
      :align: center

#. Let make a try and send a request to ``/animals`` from version 1

   .. note :: It works because the gateway knows thanks to the /v1 or /v2, which API Proxy to use. You can try to change /anmials to v2. It will work as this endpoint exists also in v2.

Test API Version 2 with Dev Portal
==================================

#. In Developer Portal, re-login (refresh the browser first)
#. Go to APIs doc, and select ``v2``
#. Select ``GET /colors`` endpoint, and ``try it out``
#. Select the ``sentence2`` credential and send the request

   .. image:: ../pictures/lab2/devportal-v2.png
      :align: center


.. note :: In this lab, you saw how to update an existing API Proxy with a new version and how the gateway behaves with different versions up and running