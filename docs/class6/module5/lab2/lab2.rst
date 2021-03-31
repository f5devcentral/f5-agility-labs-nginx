Step 10 - Push API documentation into the DevPortal
###################################################

Create the DevPortal
********************

#. In the APIm menu, click on ``Dev Portals`` and create a new dev Portal
#. Name : portal-api-sentence
#. Environement : ``env-prod``
#. Gateways : select the previous created gateway ``devportal-gw``
#. Published APIs : select the 2 versions we already published ``api-sentence-v1`` and ``api-sentence-v3``
#. Click ``Next``
#. Enter a Brand Name like ``API Sentence``
#. Click ``Next`` and click ``Submit``

.. note:: At this stage, the nginx-2 isntance is now configured as a Nginx Web Server with the API Sentence documentation.

.. note:: The documentation is part of the OpenAPI file we imported at the early steps when we created the API Definition. You can check it here : https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/3.0#free
   If you look at the OAS spec file, you can notice the ``examples``. This examples are used by the Dev Portal.

   .. code-block:: YAML
   
      examples:
        '0':
          value: '{"name":"lake","coordinates":[-142.28261413,53.28261413]}'

|

Navigate to the Dev Portal
**************************

#. RDP to Win10 as user / user
#. Open Edge Browser and click on ``Dev Portal`` bookmark
#. You can see one API ``api-sentence-app``, click on ``Explore APIs`` button
#. You can see now navigate to your API. Click on the several links and menus to discover what the Dev Portal offers

   .. image:: ../pictures/lab2/portal1.png
      :align: center

#. You can select a ``version`` on the left menu. Select ``Version 3.0``, this is the version with the ``coordinates`` object in ``locations`` API endpoint.

   .. image:: ../pictures/lab2/version.png
      :align: center

#. Navigate and scroll down till ``Create a location``, and click on ``View Docs``

   .. image:: ../pictures/lab2/location1.png
      :align: center

   .. image:: ../pictures/lab2/location2.png
      :align: center

.. note:: Fell free to navigate to the documentation, and check the specs and the examples.