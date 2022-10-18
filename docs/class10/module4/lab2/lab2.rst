Step 8 - Onboard as a Dev API
#############################

The goal of an Developer Portal is not only to provide with API Documentation. A Developer Portal offers the possiblity to ``try out`` the API directly from it.
It means the Developers will ask for API Keys from this portal, and use these keys to ``try out`` APIs. The Developer Portal will send request to the API Gateway with the API-KEY generated.

In this lab, ``Infrastructure`` and ``API`` teams will modify the NMS ACM configurations in order to:

   * ``Infra`` team action : Enable Authentication for developers on the Dev Portal with OIDC (Keycloak as Identity Provider) 
   * ``API`` team action : Enable API-Key authentication on the Sentence API proxy (so far, there is no authentication on the API Gateway). So that Developer can use the API-KEY created by the Developer Portal.


Infrastructure team - Steps
===========================

The infrastructure team must enable OIDC on DevPortal instance. To do so, follow these Steps

#. In NMS ACM, in ``Infrastructure`` section, go into your ``sentence-team`` workspace, then ``sentence-env`` environment
#. Click on your ``devportal-cluster`` object
#. In the ``Policies`` section, click on ``Manage``

   .. image:: ../pictures/lab2/policy-manage.png
      :align: center

#. On the row ``OpenID Connect Relying Party``, click on the 3 dots on the top right and ``Add Policy``

   .. image:: ../pictures/lab2/add-policy.png
      :align: center

#. The Keycloak is already confgured to authenticate Developers with your Developer Portal listening on http://dev.sentence.com. Configure the policy as below:

   * Choose an Oauth Flow : ``PKCE``
   * App Name : ``devportal``
   * Client ID : ``devportal``
   * Client secret : empty as we are using PKCE (no secret)
   * Scopes : keep only ``openid``
   * Sign-Out Redirect URI : ``http://dev.sentence.com``
   * Keys :  ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/certs``
   * Token : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/token``
   * Authorization : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/auth``
   * User Info : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/userinfo``
   * LogOff URI : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/logout``

   .. note :: All those endpoints are provided bu Keycloack configuration console. We skip this part in this lab.

#. Click ``add``
#. Click ``Save and Submit``

.. note :: Now, the Developer Portal instance is ready to authenticate Developers against Keycloak as Identity Provider. Developers are already onboarded in the Keycloak.

.. note :: When a developer is authenticated, he can request his own and personal API-Keys

API Team - Steps
================

The API team must enable API-Key authentication on top of the exposed Sentence API Version 1, so that Developers can use the API Keys requested in the Developer Portal.

#. Switch to ``Services`` on the left menu, go to your ``sentence-app`` workspace and edit your ``sentence-api`` API proxy (click on the 3 dots)

   .. image:: ../pictures/lab2/edit-proxy.png
      :align: center

#. In the ``Policies`` section, ``add policy`` for ``APIKey Authentication``
#. Don't make any change, just click ``add``
#. Click ``Save and publish``

.. note :: Now, the API is protected by APIKey authentication. Every request to the API ``http://api.sentence.com`` requires an APIKey header and value.


Developer Team - test the protected API
=======================================

Request API keys
****************

#. In Win10, connect to the Developer Portal
#. You should see now a ``Login`` button on the top right corner (thanks the infrastructure team who enable OIDC)
#. Login as dev1/dev1 on Keycloak login page. You will redirected to the DevPortal and authenticated

   .. image:: ../pictures/lab2/login-keycloak.png
      :align: center

#. A new menu will appear ``App Credentials``, click on it

   .. image:: ../pictures/lab2/portal-app-cred.png
      :align: center

#. And click on ``create organization``. Name it ``nginx`` and click ``create``
#. Click on your new ``nginx`` organization
#. As you can notice, there is no credential yet. Let's create one

   * Click ``create credential``
   * App name : ``sentence1``
   * API : select ``sentence-api v1`` - This is the version v1 exposed on the API Gateway.
   * Click ``Generate``

#. You can now expand your ``sentence1`` APIKey to see the value. Copy the value.

   .. image:: ../pictures/lab2/apikey-value.png
      :align: center

Make a test with Postman
************************

#. Open Postman, and select any API GET Call. For instance ``GET Animals``
#. Send the request, and you can notice a ``401 - Unauthorized``. The APIKey is required

   .. code-block :: JSON

      {
         "message": "Unauthorized",
         "status": "401"
      }

#. In the ``Authorization`` tab, select ``API Key`` and paste the value copied from the Developer Portal
#. Send the request

   .. image:: ../pictures/lab2/send-apikey.png
      :align: center

.. note :: Request is accepted by the API Gateway. The API Gateway has been automatically updated with the new API Key created by the Developer. Each time a developer creates a new API Key, all API Gateways are updated.

Make a test with the Developer Portal
*************************************

The developer portal has one more capability. He can ``test / try out`` the API.

#. In the developer portal, click on ``APIs`` menu. If you are logged out, re-login.

   .. image:: ../pictures/lab2/api-doc.png
      :align: center

#. Click on ``sentence-api`` doc, select one GET call (GET /adjectives for i.e)
#. Click on ``Try it out`` and select the API Key created previously
#. Click ``Send``

   .. image:: ../pictures/lab2/try-it-out-fail.png
      :align: center

   .. warning :: It should not work. Nothing should happen. The reason is the Developer Portal inserts CORS. So we have to enable CORS policy on the API Gateway.

#. Connect to NMS ACM and edit our API Proxy (in Services menu)

   .. image:: ../pictures/lab2/edit-proxy.png
      :align: center

#. In ``Policies``, on ``CORS`` click on ``add policy``

   .. image:: ../pictures/lab2/cors-edit.png
      :align: center

#. And add the header ``apikey`` into the allow list. Start by typping akikey, and then in the field enter ``apikey`` and click ``Add Header``

   .. image:: ../pictures/lab2/add-header.png
      :align: center

#. Click Save, Save and Publish

   .. note :: Now, the API Gateway will accept request from the Developer Portal

#. Reconnect and re-login on Developer Portal, and re-test.
#. You will see the response from the API Gateway in the Developer Portal

   .. image:: ../pictures/lab2/try-it-out-ok.png
      :align: center