Step 13 - Oauth2 Introspection
##############################

JWT is based on OAuth and OIDC. Keycloak is the OAuth Authorization Server.
Keycloak is already configured to issue JWT token for developers.

.. warning :: Currently, NMS ACM does not support multiple authentication mechanisms on the same API-Proxy. We must remove the JWT policy before enabling the Oauth2 Introspection policy.

What is Oauth2 Introspection ?
==============================

In the previous lab, we configure a Policy to authenticate API request with JWT tokens. This policy checked if a JWT token is part of the Authorization header, and the API Gateway checked 
if the JWT is signed by Keycloak (we pasted the JWKS keys into the JWT Policy).
But in this use case, the API GW does not check against Keycloak is the JWT token is valide. Only the signature and the timestamp are checked.

OAuthv2 Introspect adds a capability for the API GW to check against the Oauth AS (Keycloak) if the JWT is valide (https://docs.nginx.com/nginx-management-suite/acm/how-to/policies/introspection/)

   .. image:: ../pictures/lab3/oauth2-introspection.png
      :align: center
      :scale: 50%


Add Oauth2 Introspection on API-Proxy
=====================================

#. Edit ``API-Proxy`` ``v2`` like previously (we are going to replace JWT Auth, by Oauth2 Instrospection)
#. In ``Policies``, remove the ``JSON Web Token Asserion`` policy
#. Add a new ``Oauth2 Introspection`` policy
#. In ``Introspection Request`` section configure as follows

   #. Introspection endpoint: http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/token/introspect

#. In ``Credentials`` section configure as follows

   #. Client ID: apigw
   #. Client secret: iOVsaPIfoQ2gk8CSO9H40qPUOXFNvn48

#. Click ``Add``
#. Click ``Save and Publish``



Test Oauth2 Introspection out with Postman
==========================================

#. In Postman, select the call ``GET Colors`` and check the version is ``v2`` http://api.sentence.com/v2/api/colors
#. In Authorization, select type ``OAuth 2.0``

   .. note :: As you can notice, the Postman OAuth v2.0 client is already set to request JWT against Keycloak

#. Scroll down and click on ``Get New Access Token``

   .. image:: ../pictures/lab2/get-access.png
      :align: center

#. Authenticate as ``dev1`` and password ``dev1``

   .. image:: ../pictures/lab2/login.png
      :align: center
      :scale: 50%

#. Click ``Proceed``, then ``Use Token``

   .. image:: ../pictures/lab2/use-token.png
      :align: center
      :scale: 50%

#. Send the request. It should pass.

   .. image:: ../pictures/lab2/send.png
      :align: center

.. note:: Congratulations, you configured your API Gateway to use Oauth2 Introspection from Keycloak as Authorization Server.

.. note:: Don't forget to clean up your Postman Oauth v2 store, by deleting all JWT token.