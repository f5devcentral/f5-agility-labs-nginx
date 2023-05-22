Step 14 - Access Control Routing with JWT Claims
################################################

JWT is based on OAuth and OIDC. Keycloak is the OAuth Authorization Server.
Keycloak is already configured to issue JWT tokens for developers.

What is Access Control Routing?
================================

In the previous labs, we configured a Policy to authorize access to /v2/colors only if a valid JWT token is presented in the request. We did two labs where we only relied on the 
JWT token signature (JWT validation), and a second lab where we rely on the Keycloak validation (Oauth2 introspection).

But there is no granularity and access control based on JWT claims. A claim is an attribute with a value. For instance, a claim can be added to the JWT token with the groups to which the user 
belongs to.

A claim looks like this:

.. code-block:: json

   {
   "email_verified": false,
   "name": "Developer Team1",
   "preferred_username": "dev1",
   "given_name": "Developer",
   "family_name": "Team1",
   "email": "dev1@f5.com",
   "group": "sales"
   }

.. note:: As you can notice, there is a claim named ``group`` and the value for ``dev1`` user is ``sales``


In Keycloak, we created two users with the following attributes (claims)

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
   #. Allow the following HTTP Methods : DELETE
   #. Click ``Next``

   .. image:: ../pictures/lab4/DELETE.png
      :align: center

#. While still in the ``Access Control Routes`` section, click on ``Add ACR`` to create the second rule for /colors (the POST endpoint)

   #. Key type : TOKEN
   #. Key : group
   #. Matches One of : vip
   #. Route : /colors
   #. Allow the following HTTP Methods : POST
   #. Click ``Next``

   .. image:: ../pictures/lab4/POST.png
      :align: center

#. Click ``Add``
#. Click ``Save and Publish``



Test the Access Control Routing policy
======================================

Test with a GET
---------------

The GET is not part of the ACR policy; no claim will be checked.

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

.. note:: You can redo the same test but with the user ``dev2`` and password ``dev2``. The user will be allowed to access GET /colors as the GET method has no claims control.


Test with a DELETE
------------------

.. note:: As a reminder, only users with claim ``group`` and value ``vip`` can DELETE. But the dev1 user is not in the ``vip`` group, as it is in the ``sales`` group

Below is a quick extract of dev1 and dev2 JWT tokens. You can notice the ``group`` claim is different.

   .. code-block:: json

      {
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

#. Send DELETE request to http://api.sentence.com/v2/api/colors/5 It should not pass. You can see a ``403 Forbidden``. Dev1 user does not belong to the ``vip`` group.

   .. image:: ../pictures/lab4/postman-delete.png
      :align: center
      :scale: 50%

#. Clear the cookies in Postman, and request a new token but with the ``dev2`` user. Password is ``dev2``.

   .. image:: ../pictures/lab4/clear-cookies.png
      :align: center
      :scale: 50%

#. You can now DELETE entry number #5 (http://api.sentence.com/v2/api/colors/5)

   .. image:: ../pictures/lab4/delete-dev2.png
      :align: center
      :scale: 50%


Test with a POST
----------------

You can do the same exercise with the POST call. Only ``vip`` users are allowed (dev2)

#. Clear your cookies
#. Authenticate as ``dev1``, make a test POST Request to http://api.sentence.com/v2/api/colors  You should see a 403 Forbidden error.
#. Clear the cookies
#. Authenticate as ``dev2``, make a test test POST Request to http://api.sentence.com/v2/api/colors   This test should complete with a status of 201 Created.  The body of the API call with add ``yellow`` as an avaiable color.

   .. image:: ../pictures/lab4/postman-post.png
      :align: center
      :scale: 70%



.. note:: Congrats, you applied two Access Control Routing rules to only allow specific users to DELETE and POST entries in the API application.