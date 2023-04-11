Step 14 - Access Control Routing with JWT Claims
################################################

JWT is based on OAuth and OIDC. Keycloak is the OAuth Authorization Server.
Keycloak is already configured to issue JWT token for developers.

.. warning :: Currently, NMS ACM does not support multiple authentication mechanisms on the same API-Proxy. We must remove the JWT policy before enabling the Oauth2 Introspection policy.

What is Access Control Routing ?
================================

In the previous labs, we configure a Policy to authorize access to /v2/colors only if a valid JWT token is presented into the request. We did 2 labs where we only relied on the 
JWT token signature (JWT validation), and a second lab where we rely on the Keycloak validation (Oauth2 introspection).

But there is no granularity and access control based on JWT claims. A claim is an attribut with a value. For instance, a claim can be added into the JWT token with the groups the user 
belongs to.

A claim looks like this:

.. code-block:: json

   {
   ...
   "email_verified": false,
   "name": "Developer Team1",
   "preferred_username": "dev1",
   "given_name": "Developer",
   "family_name": "Team1",
   "email": "dev1@f5.com",
   "group": "sales"
   }

.. note:: As you can notice, there is a claim named ``group`` and the value for ``dev1`` user is ``sales``


In Keycloak, we created 2 users with the following attributs (claims)

* ``dev1`` with attribut ``group`` and value ``sales``
* ``dev2`` with attribut ``group`` and value ``vip`` 

.. note:: We only want users part of the group ``vip`` to be allowed to ADD or REMOVE words. It means HTTP methods ``DELETE`` and ``POST``. We will do it on the ``COLORS`` endpoint (/v2/colors)

Add Access Control Routing on API-Proxy
=======================================

#. Edit ``API-Proxy`` ``v2`` like previously (we are going to ``add`` a security policy on top of the ``Oauth2 Introspection``)
#. Add a new ``Access Control Routing`` policy
#. In ``Access Control Routes`` section click on ``Add Route`` to create the first rule for /colors/{id} (the DELETE endpoint)

   #. Key type : TOKEN
   #. Key : group
   #. Matches One of : vip
   #. Route : /colors/{id}
   #. Allow following HTTP Methods : DELETE
   #. Click ``Next``

   .. image:: ../pictures/lab4/DELETE.png
      :align: center

#. Still in ``Access Control Routes`` section click on ``Add ACR`` to create the second rule for /colors (the POST endpoint)

   #. Key type : TOKEN
   #. Key : group
   #. Matches One of : vip
   #. Route : /colors
   #. Allow following HTTP Methods : POST
   #. Click ``Next``

   .. image:: ../pictures/lab4/DELETE.png
      :align: center

#. click ``Save``
#. Click ``Save and Publish``



Test the Access Control Routing policy
======================================

Test with a GET
---------------

The GET is not part of the ACR policy, no claim will be checked.

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

.. note:: You can redo the same test but with the user ``dev2`` and password ``dev2``. The user will be allowed to access GET /colors as there is no claims control on GET.


Test with a DELETE
------------------

.. note:: As a reminder, only users with claim ``group`` and value ``vip`` can DELETE. But dev2 user is not VIP, he is SALES

Below a quick extract of dev1 and dev2 JWT token. You can notice the ``group`` claim is different.

   .. code-block:: json

      {
      .......
      "scope": "openid email profile",
      "sid": "7277008d-48e7-461a-ac9c-a6f736126e01",
      "email_verified": false,
      "name": "Developer Team1",
      "preferred_username": "dev1",
      "given_name": "Developer",
      "family_name": "Team1",
      "email": "dev1@f5.com",
      "group": "sales"
      }

   .. code-block:: json

      {
      .......
      "scope": "openid email profile",
      "sid": "20d44034-6bb2-4817-b69a-216cc483a586",
      "email_verified": false,
      "name": "Developer Team2",
      "preferred_username": "dev2",
      "given_name": "Developer",
      "family_name": "Team2",
      "email": "dev2@f5.com",
      "group": "vip"
      }



#. In Postman, select the call ``DELETE Colors`` and check the version is ``v2`` http://api.sentence.com/v2/api/colors
#. In Authorization, select type ``OAuth 2.0``
#. Scroll down and click on ``Get New Access Token``

   .. image:: ../pictures/lab2/get-access.png
      :align: center

#. Authenticate as ``dev1`` and password ``dev1`` if you are prompted

   .. image:: ../pictures/lab2/login.png
      :align: center
      :scale: 50%

#. Click ``Proceed``, then ``Use Token``

   .. image:: ../pictures/lab2/use-token.png
      :align: center
      :scale: 50%

#. Send the request. It should not pass. You can see a ``403 Forbidden``. Dev1 user does not belong to ``vip`` group.

   .. image:: ../pictures/lab4/postman-delete.png
      :align: center
      :scale: 50%

#. Clear the cookies in Postman, and request a new token but with ``dev2`` user. Password is ``dev2``.

   .. image:: ../pictures/lab4/clear-cookies.png
      :align: center
      :scale: 50%

#. You can now DELETE the entry number #5 (http://api.sentence.com/v2/api/colors/5)

   .. image:: ../pictures/lab4/delete-dev2.png
      :align: center
      :scale: 50%


Test with a POST
----------------

You can do exactly the same exercice with the POST call. Only ``vip`` users are allowed (dev2)

#. Clear your cookies
#. Authenticate as ``dev1``, make a test
#. Clear the cookies
#. Authenticate as ``dev2``, make a test


.. note:: Congrats, you applied two Access Control Routing rules in order to only allowed specific users to DELETE and POST entries in the API application.