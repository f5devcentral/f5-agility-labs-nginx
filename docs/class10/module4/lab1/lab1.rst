Step 7 - Check the doc pushed by API Team
#########################################

In the previous lab, we used ``Postman`` to test our API version 1. App Developers don't use Postman, but prefer to use Developer Portals.

Developer Portal offers:

   * API documentation
   * API tests

``Infrastructure`` team deployed a DevPortal instance in Module 2

``API`` team deployed Sentence API Version 1 documentation into DevPortal in Module 3

Steps
=====

#. RDP to Win10 Jumphost as user ``user`` and password ``user``
#. Open ``Chrome``
#. Click on ``Developers`` bookmark
#. You are now connected to the ``Developer Portal`` instance.

   * Click on ``APIs`` on top right corner

      .. image:: ../pictures/lab1/portal-home.png
         :align: center
         :scale: 50%

   * Click on ``sentence-api`` documentation
   * Navigate in the doc (POST /adjectives for instance). You can notice the doc provides with

      * The Version selected
      * API host with version and base path : http://api.sentence.com:80/v1/api
      * Request and Response bodies

      .. image:: ../pictures/lab1/post-adjectives.png
         :align: center
         :scale: 50%

.. note :: As you can notice, you have all the endpoints documented to use the API Version 1.

.. note :: Next step is to use the Developer Portal to test the API without Postman.