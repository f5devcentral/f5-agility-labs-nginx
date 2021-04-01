Step 7 - Add Authentication and Authorization
#############################################

In this lab, we will add security in top of our API Gateway. To do so, we will:

- Add JWT token validation
- Add Claims authorization
- Add a Rate Limiting policy

.. image:: ../pictures/lab1/archi.png
   :align: center

.. note:: A JWT token need to be issued by an Oauth Authorization Server. There are several Oauth AS on the market. Some of same are IDaaS like Azure AD or Okta. Some others are opensource (or commercial) like **Keycloak**.

   In this lab, we will use Keycloak as Oauth AS to issue the JWT tokens.

|

Steps to enable JWT token validation and authorization
******************************************************

Configure Keycloak as JWT OIDC token issuer
===========================================

#. RDP to Win10 VM as user / user
#. Open ``Edge Browser`` and click on ``Keycloak`` bookmark
#. Cick on ``Administration Console`` 

   .. image:: ../pictures/lab1/admin_console.png
      :align: center

#. Login on Keycloak as admin / admin
#. On the top left corner, check the realm selected ``Api-app`` and click on ``Client`` menu
#. Then select ``my-postman``

   .. image:: ../pictures/lab1/clients.png
      :align: center

   .. note:: in order to avoid any mistake during this lab, we created in advance the ``client`` ``my-postman`` and the ``secret key``  ``9cabf36d-8eda-4cf8-a362-ccc982408ba7``

#. In the ``My-postman`` client, click on ``Credentials``. You can notice the secret key we will use to ask for a JWT token in postman.
#. Click on ``Users`` in the left menu, and click on ``View all users``

   .. image:: ../pictures/lab1/users.png
      :align: center

   .. note:: As you can notice, we created ``matt`` with password ``matt``. At this stage, this user does not have any ``groups attribute`` assigned

#. Click on ``matt`` user ID to edit it.
#. In the ``Attributes`` tab, add a new key ``groups`` and value ``employee``
#. Click ``Add`` and ``Save``
#
   .. warning:: You have to click on ``Add`` to add the attribut, and on ``Save`` to save the user settings.

   .. image:: ../pictures/lab1/matt_attributes.png
      :align: center

#. Now, we create our own scope ``groups`` so that a claim is added into every JWT token with the groups attribute value(s)
    #. Click on ``Client Scopes`` and ``Create``
    #. Name it ``groups``, click ``Save`` and click on ``Mappers`` tab
    #. Click ``Create`` in order to create a new mapper. Configure as below, the mapper type is ``User Attribute``

       .. image:: ../pictures/lab1/mapper.png
          :align: center

       .. note:: The configuration above says to add a claim with the name ``groups`` and assign the value from the user attribute ``groups``

#. Come back to ``My-postman`` client and add this new scope into it
    #. Click ``Clients`` > ``My-postman`` and select the tab ``Client Scopes``
    #. Before adding our new scope ``groups``, let's have a look on how the JWT token looks like. There is a great feature in Keycloak to see a generated token for a specific user
    #. Click on the sub-menu ``Evaluate`` and add the user ``matt`` at the bottom, then click ``Evaluate``

       .. image:: ../pictures/lab1/evaluate.png
          :align: center

    #. Click on ``Generated Access Token``, and check the JWT content.

       .. image:: ../pictures/lab1/jwt_no_groups.png
          :align: center

       .. note:: As you can notice, there is no ``groups`` claim in this JWT token

    #. Click on the ``Setup`` sub-menu , and add the ``groups`` scope into the ``Assigned Default Client Scopes``
    #. Click on ``Evaluate`` sub-menu, and check the claim exists with the group attribute value ``employee``

.. warning :: Congrats, we are good now to configure Nginx Controller in order to check the groups claim values to grant or not access to API endpoints.

|

Create an Identity Provider in the Controller
=============================================

The JWT token is a readable token signed by a public/private key workflow. Keycloak (or any other Oauth AS) provides with either a private secret key, or a JWKS url.

For modern IDaaS or AS (like keycloak), a JWKS url is used. This is the public URL to retrieve and download the public keys used to sign the JWT token.

The Keycloak JWK url is http://10.1.1.8:8080/auth/realms/api-app/protocol/openid-connect/certs, and the content looks like 

.. code-block:: js

    {
        "keys": [
            {
                "kid": "as8gYx18yAyuzBOD9UiVp-ndr-aGmnSwfOqscHGuJUM",
                "kty": "RSA",
                "alg": "RS256",
                "use": "sig",
                "n": "nJY5azyX0e5ropzKVBmFH3kt3vftV1iG7O157WyxgFU8hd22wM5vJwmkodBy91Yc3M6qcag9Gi3YMvKnFQF6OrYeaOg7ePWnabAhyhMjATWtnypbRcqM9AyyBekphNhpuNT2Mlqo7eYIt85VUT9iv3upLNy2PZ1W_iAYTh5f-RQukWAagMX7vTWQ4mrUvKfKc7RCc-ikBToaSEte193ckjRqawSLYoHRs2vAeywZYaPFXeIuBaFKglpV051dNwcJFfWMCNmbIJ0xTlXJP2HfQ1AaY7u5SFXnkcX-pkt2PBTDrWqPahZhDQjCstr3M_qbpYd6LUls5z-yhiaHQ4JW1w",
                "e": "AQAB",
                "x5c": [
                    "MIICnTCCAYUCBgF4fRp2jzANBgkqhkiG9w0BAQsFADASMRAwDgYDVQQDDAdhcGktYXBwMB4XDTIxMDMyOTA4MjgwOVoXDTMxMDMyOTA4Mjk0OVowEjEQMA4GA1UEAwwHYXBpLWFwcDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJyWOWs8l9Hua6KcylQZhR95Ld737VdYhuztee1ssYBVPIXdtsDObycJpKHQcvdWHNzOqnGoPRot2DLypxUBejq2HmjoO3j1p2mwIcoTIwE1rZ8qW0XKjPQMsgXpKYTYabjU9jJaqO3mCLfOVVE/Yr97qSzctj2dVv4gGE4eX/kULpFgGoDF+701kOJq1LynynO0QnPopAU6GkhLXtfd3JI0amsEi2KB0bNrwHssGWGjxV3iLgWhSoJaVdOdXTcHCRX1jAjZmyCdMU5VyT9h30NQGmO7uUhV55HF/qZLdjwUw61qj2oWYQ0IwrLa9zP6m6WHei1JbOc/soYmh0OCVtcCAwEAATANBgkqhkiG9w0BAQsFAAOCAQEARr5/4RxFeHMtQxa3soEgQdQ6nCMqUiAKM0V7Upnoo3lTorMiujsi3Iog2olq1r/z4+xdOXTNL6WqNWdGr+z1OFnqzmUl1l+xESNSXBYTUZyeIbLYCjLGCfrzqYJBQvs/ECJ8Rk4mabL1tLDAUOiEUhvlJgiiNLWrqhwrpOrdJtlU8rlGk5TRjv+lpWkex9ZqpYKZ4ewHlZSTlAri9Jb+WuxFmw8ksrufmqn4IQ5Oee9O3HL8nadbqgeokY6Rb8U5HKaNDyvuCERfC/wLph+DVJQd1ubG1XvnfRcdGW8e79US+uIxJUQZCY2BN01Y0f89rRmgk5tZ15Fxl6FYeT2Y/Q=="
                ]
                ,
                "x5t": "_qPH5MQIPZ4EmoWlTHv7Ciq28EY",
                "x5t#S256": "V5zhNTYsKPltmTdF9j_LnZfaIgMHCnLJoiNwxpEBUc8"
            }
            
        ]
        
    }

#. Connect to Controller UI, and in ``Service`` menu, and ``Identity Provider`` sub-menu, create a new ``Identity Provider``
#. Copy / paste the JWKS URL http://10.1.1.8:8080/auth/realms/api-app/protocol/openid-connect/certs
#. Click ``Submit``

.. image:: ../pictures/lab1/idp.png
   :align: center

|

Add Authentication for Colors API endpoint
==========================================

#. Connect to Controller UI, and edit the published API ``api-sentence-v3``

   .. image:: ../pictures/lab1/edit_auth_colors.png
      :align: center

#. In the ``Routing`` menu, edit the ``Security Settings`` for ``cp-colors-v3`` component

   .. image:: ../pictures/lab1/edit_sec_colors.png
      :align: center

#. Click ``Add Authentication``

   .. image:: ../pictures/lab1/add_auth.png
      :align: center

#. Select ``Keycloak`` as ``Identity Provider`` (created previously)
#. Select ``BEARER`` as Credential Location. This setting mens the JWT token will be present in the ``Authorization : Bearer`` header
#. Click ``Done`` and ``Submit`` 
#. Click ``Submit`` again to validate the config and push it to the nginx instance.

.. note:: As you can notice, we do not enable ``conditional access`` at the moment.

|

Test your protected API with Authentication
===========================================

#. RDP to Win10 as user / user
#. Open ``Postman``, collection ``API Sentence Generator v3``, and select the request ``GET Colors v3``
#. Run the request, you should see a ``401 Authorization Required``. This is because there is no JWT token in the request
#. Request a JWT token against Keycloak
    #. In ``Authorization`` tab, select ``Oauth 2.0``. And ``Get New Access Token``
      
       .. note:: As you can notice, we already configured Postman as Oauth Client. You can retrieve the ``Client ID and secret`` from ``My-postman`` Keycloak client confguration

       .. image:: ../pictures/lab1/postman_client.png
          :align: center

    #. Authentication as ``matt`` with password ``matt``

       .. image:: ../pictures/lab1/auth.png
          :align: center

    #. The JWT token is saved and can be used. Click on ``Use Token`` orange button.
    #. Now, send the request again. It passes.

|

Add Conditional Access for Colors API endpoint
==============================================

Now, we add Conditional Access for employee users only. So that any JWT token without the claim ``groups`` and the value ``employee`` can't reach the Colors API Endpoint.

#. In the Controller UI, edit your Published API ``api-sentence-v3``, like previously
#. Edit the ``authentication`` of the component ``cp-colors-v3``
#. Enable ``Conditional Access``

   .. image:: ../pictures/lab1/cond_access1.png
      :align: center

#. Configure it so that only JWT with ``employee`` group is allowed

   .. image:: ../pictures/lab1/cond_access2.png
      :align: center

#. Click ``Next`` ``Submit`` and ``submit`` again to push the config.

|

Test your protected API with Conditional Access
===============================================

#. RDP to Win10 as user / user
#. In Postman, for the ``GET Colors v3`` request, ask for a new token with user ``matt`` and password ``matt``. Don't be surprised if you don't see the popup windows asking for the credentials. It means Postman still has a session up with Keycloak for ``matt``
#. Use the token and send the request. So far so good, it passes.
#. Now, try with another user not part of ``employee`` group.
    #. Click on ``Clear cookies``

       .. image:: ../pictures/lab1/clear_cookies.png
          :align: center

    #. Request a new token but with ``fouad`` as a user and ``fouad`` as password
    #. Use the token and send the request. You receive a ``403 Forbidden``.
       
       .. note :: As you can notice, the response code ``403`` is different from the response code ``401`` received when the JWT token is wrong or not present.

    #. You copy the generated token from postman, and paste it in http://jwt.io in order to see the content (bookmark in Edge Browser).

       .. note :: As you can notice, Fouad is not part of the ``employee`` group, so the access is denied

       .. image:: ../pictures/lab1/jwtio.png
          :align: center

.. warning :: Congrats, you enable first Authentication in front of Colors API endpoint, and you added a conditional access based on a JWT claim.
