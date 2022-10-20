Step 12 - Rate Limiting
#######################

API Team wants to limit to 5 Requests / minute / user on Version 2 of the API.

Add a Rate Limit policy on API API-Proxy
========================================

#. In NMS, edit the API-Proxy ``sentence-api`` ``v2``
#. In ``Policies``, add new ``Rate Limit`` policy

   .. image:: ../pictures/lab1/add-rl.png
      :align: center

#. Add Rate Limit
#. Select ``URI`` as key to apply, and ``5`` request per minute

   .. image:: ../pictures/lab1/rl-5req.png
      :align: center

#. Click ``Add``, ``Add``, ``Save and Publish``


Test it out
===========

#. In ``postman``, Re-use the ``/colors`` on ``v2`` endpoint. As a reminder, it is ``http://api.sentence.com/v2/api/colors``
#. If the API Key is not there anymore, add it in Authorization
#. Send many requests and after 5 requests, the others will be blocked

   .. code-block :: JSON

      {
        "message": "Too Many Requests",
        "status": "429"
      }

   .. image:: ../pictures/lab1/rl-blocked.png
      :align: center

