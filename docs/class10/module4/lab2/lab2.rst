Step 7 - Onboard as a Dev API
#############################

The goal of a Developer Portal is not only to provide API Documentation. A Developer Portal offers the possibility to ``try out`` the API directly from it.
It means the Developers will ask for API Keys from this portal, and use these keys to ``try out`` APIs. The Developer Portal will send request to the API Gateway with the API-KEY generated.

In this lab, ``Infrastructure`` and ``API`` teams will modify the NMS ACM configurations in order to:

   * ``Infra`` team action : Enable Authentication for developers on the Dev Portal with OIDC (Keycloak as Identity Provider) 
   * ``API`` team action : Enable API-Key authentication on the Sentence API proxy (so far, there is no authentication on the API Gateway). So that a Developer can use the API-KEY created by the Developer Portal.


Infrastructure team - Steps
===========================

The infrastructure team must enable OIDC on the DevPortal instance. To do so, follow these steps

#. In NMS ACM, in ``Infrastructure`` section, go into your ``team-sentence`` workspace, then ``sentence-env`` environment
#. Click on your ``dev-cluster`` object
#. In the ``Policies`` section, click on ``Manage``

   .. image:: ../pictures/lab2/policy-manage.png
      :align: center

#. On the row ``OpenID Connect Relying Party``, click on the 3 dots on the top right and ``Add Policy``

   .. image:: ../pictures/lab2/add-policy.png
      :align: center

#. Keycloak is already configured to authenticate Developers with your Developer Portal listening on http://dev.sentence.com. Configure the policy as below:

   * Choose an OAuth Flow : ``PKCE``
   * App Name : ``devportal``
   * Client ID : ``devportal``
   * Client secret : empty as we are using PKCE (no secret)
   * Scopes : keep only ``openid``
   * Sign-Out Redirect URI : ``http://dev.sentence.com``
   * Keys :  ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/certs``
   * Token : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/token``
   * Authorization : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/auth``
   * User Info : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/userinfo``
   * Logout URI : ``http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/logout``

   .. note :: All those endpoints are provided by Keycloack configuration console. We skip this part in this lab.

#. Click ``Add``
#. Click ``Save and Submit``

.. note :: Now, the Developer Portal instance is ready to authenticate Developers against Keycloak as Identity Provider. Developers are already onboarded in Keycloak.

.. note :: When a developer is authenticated, they can request their own personal API-Keys

API Team - Steps
================

The API team must enable API-Key authentication on top of the exposed Sentence API Version 1, so that Developers can use the API Keys requested in the Developer Portal.

#. Switch to ``Services`` on the left menu, go to your ``sentence-app`` workspace and edit your ``sentence-api`` API proxy (click on the 3 dots, then ``Edit Proxy``).

   .. image:: ../pictures/lab2/edit-proxy.png
      :align: center

#. In the ``Policies`` section, ``Add policy`` for ``APIKey Authentication``
#. Don't make any change, just click ``Add``
#. Click ``Save & Publish``

.. note :: Now, the API is protected by APIKey authentication. Every request to the API ``http://api.sentence.com`` requires an APIKey header and value.


Developer Team - Test the protected API
=======================================

Request API keys
****************

#. In Win10, connect to the Developer Portal
#. You should see now a ``Login`` button on the top right corner (thanks the infrastructure team who enabled OIDC)
#. Login as dev1/dev1 on the Keycloak login page. You will redirected to the DevPortal and authenticated

   .. image:: ../pictures/lab2/login-keycloak.png
      :align: center

#. A new menu will appear ``App Credentials``, click on it

   .. image:: ../pictures/lab2/portal-app-cred.png
      :align: center

#. And click on ``Create org``. Name it ``nginx`` and click ``Create``
#. As you can notice, there is no credential yet. Let's create one:

   * Click ``Create credential``
   * App name : ``sentence1``
   * API : select ``sentence-api v1`` - This is the version v1 exposed on the API Gateway.
   * Click ``Generate``

#. You can now expand your ``sentence1`` APIKey to see the value (if not, refresh the page). Copy the value.

   .. image:: ../pictures/lab2/apikey-value.png
      :align: center

Test with Postman
*****************

#. Open Postman, and select any API GET Call (except for ``GET Colors``). For instance ``GET Animals``
#. Send the request, and you can notice a ``401 - Unauthorized``. The APIKey is required

   .. code-block :: JSON

      {
         "message": "Unauthorized",
         "status": "401"
      }

#. In the ``Authorization`` tab, select ``API Key`` and paste the value copied from the Developer Portal into the ``Value`` field.
#. Send the request

   .. image:: ../pictures/lab2/send-apikey.png
      :align: center

.. note :: The request is accepted by the API Gateway. The API Gateway has been automatically updated with the new API Key created by the Developer. Each time a developer creates a new API Key, all API Gateways are updated.

Test with the Developer Portal
******************************

The developer portal has one more capability. They can ``test / try out`` the API.

#. In the developer portal, click on ``APIs`` menu. If you are logged out, re-login.

   .. image:: ../pictures/lab2/api-doc.png
      :align: center

#. Click on ``sentence-api`` doc, the select a GET call from the left side pane (GET /adjectives for example)
#. Click on ``Try it out`` and select the API Key created previously
#. Click ``Send``

   .. image:: ../pictures/lab2/try-it-out-fail.png
      :align: center

   .. warning :: It should not work. Nothing should happen. The reason is the Developer Portal inserts a CORS header. So we have to enable CORS policy on the API Gateway.

#. Connect to NMS ACM and edit our API Proxy (in Services menu)

   .. image:: ../pictures/lab2/edit-proxy.png
      :align: center

#. In ``Policies``, on ``CORS`` click on ``Add policy``

   .. image:: ../pictures/lab2/cors-edit.png
      :align: center

#. And add the header ``apikey`` into the allow list. Scroll down till the end, and then in the field enter ``apikey`` and click ``Add Header``

   .. image:: ../pictures/lab2/add-header.png
      :align: center

#. Click Add, Save & Publish

   .. note :: Now, the API Gateway will accept request from the Developer Portal

#. Reconnect and re-login into the Developer Portal, and re-test.
#. You will see the response from the API Gateway in the Developer Portal

   .. image:: ../pictures/lab2/try-it-out-ok.png
      :align: center