Step 9 - Publish API v2.0
#########################

This action is done by the API Team.

Upload OpenAPI Spec file Version 2
==================================

#. In NMS ACM, in ``Services`` (the API Team environment), go to your workspace ``sentence-app``
#. In ``API Docs``, upload ``oas-sentence-v2.yaml`` located on Win10 Desktop

   .. note :: You can now see 2 OpenAPI specification files

      .. image:: ../pictures/lab1/doc-v2.png
         :align: center

#. In ``API Proxies``, notice the version of the existing proxy ``sentence-api``. It is ``version v1``.

   .. image:: ../pictures/lab1/proxy-v1.png
      :align: center

#. Edit the ``sentence-api`` by clicking on the 3 dots on the top right of the row
#. Now, in ``Configuration`` section, select ``api-sentence-generator-v2`` as API Spec

   .. image:: ../pictures/lab1/oas-v2.png
      :align: center

#. Click ``Save and Publish``

   .. note :: A new line is created with ``version v2``

      .. image:: ../pictures/lab1/proxy-v2.png
         :align: center

   .. note :: As a reminder, the API Gateway expose the API with the /version/basepath. It means, the new path for Version 2 is /v2/api/


