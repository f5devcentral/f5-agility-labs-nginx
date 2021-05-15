Step 11 - Push API documentation into the API DevPortal
#######################################################

Create the API DevPortal
************************

#. Select ``APIs`` -> ``Dev Portals`` -> ``Create Dev Portal``. Use the following values:
   
   #. Name: portal-api-sentence
   #. Environment: ``env-prod``
   #. Gateways: ``devportal-gw``
   #. Published APIs: ``Select All``
   #. Click ``Next``
   #. Brand Name: ``API Sentence``
#. Click ``Submit``

.. note:: At this stage, the  `Nginx-2` instance has been configured as an NGINX Web Server with the API Sentence documentation.

.. note:: The documentation is part of the OpenAPI file we imported at the early steps when we created the API Definition. You can check it here: https://app.swaggerhub.com/apis/F5EMEASSA/API-Sentence/3.0#free
   If you look at the OAS spec file, you'll notice some ``examples``. These examples are used by the API DevPortal to automatically generate the API documentation.

   .. code-block:: YAML

      examples:
        '0':
          value: '{"name":"lake","coordinates":[-142.28261413,53.28261413]}'

|

Navigate to the API DevPortal
*****************************

#. RDP to the ``Win10`` VM (user/user).
#. Open the ``Edge Browser`` and select the ``Dev Portal`` bookmark.
#. You should see one API, ``api-sentence-app``, click on the``Explore APIs`` button.
#. You can now navigate through your API's documentation. Click on the several links and menus to discover what the DevPortal offers.

   .. image:: ../pictures/lab2/portal1.png
      :align: center

#. You can select a ``VERSION`` on the left menu. ``VERSION 3.0`` is the version with the ``coordinates`` object in the ``/locations`` API endpoint.

   .. image:: ../pictures/lab2/version.png
      :align: center

#. To view a specific endpoint, you can either select it on the left side menu, or navigate down the main screen and select ``View Docs`` on the respective endpoints. (See images below for an example with the ``create a location`` endpoint.)

   .. image:: ../pictures/lab2/location1.png
      :align: center

   .. image:: ../pictures/lab2/location2.png
      :align: center

.. note:: Feel free to navigate through the API DevPortal and check the specs and examples.
