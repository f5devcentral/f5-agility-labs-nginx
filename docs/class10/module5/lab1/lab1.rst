Step 8 - Publish API v2.0
#########################

The API Team performs these actions.

Upload OpenAPI Spec file Version 2
==================================

#. In NMS ACM, in ``Services`` (the API Team environment), go to your workspace ``sentence-app``
#. In ``API Docs``, click ``Add API Doc`` then upload ``oas-sentence-v2.yaml``from the Win10 Desktop and click ``Save``.

   .. note :: You can now see 2 OpenAPI specification files

      .. image:: ../pictures/lab1/doc-v2.png
         :align: center

#. In ``API Proxies``, notice the version of the existing proxy ``sentence-api``. It is ``v1``.

   .. image:: ../pictures/lab1/proxy-v1.png
      :align: center

#. Edit the ``sentence-api`` by clicking on the three dots on the top right of the row and clicking ``Edit Proxy``.
#. Now, in the ``Configuration`` section, select ``api-sentence-generator-v2`` as the API Spec

   .. image:: ../pictures/lab1/oas-v2.png
      :align: center

#. Click ``Save & Publish``

   .. note :: A new line is created with ``version v2``

      .. image:: ../pictures/lab1/proxy-v2.png
         :align: center

   .. note :: As a reminder, the API Gateway exposes the API with the /version/basepath scheme. It means the new path for Version 2 is /v2/api/


