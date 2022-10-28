Step 6 - Test API v1.0
######################

To test the API, we will use ``Postman``. In a real world, API is consumed by a mobile or modern application (or a machine).

Steps
=====

#. RDP to Jumphost as login ``user`` and password ``user``
#. Open ``Postman``
#. Open the collection ``Sentence API`` and run the call ``GET Adjectives``

   * Look the request : http://api.sentence.com/v1/api/adjectives
   * Endpoint FQDN is the Nginx API Proxy (api.sentence.com) configured by the ``Infra team``
   * The version is ``v1`` coming from the OpenAPI File
   * The base path is ``api`` coming from the OpenAPI File
   * As a reminder, from the previous configuration, we chose to ``strip`` the version and the basepath before forwarding the request to the backend. It means the backend server will receive ``/adjectives`` and not ``/v1/api/adjectives``

#. You should receive all the ``words`` from the ``adjectives`` pod.

   .. code-block :: JSON

        [
            {
                "id": 1,
                "name": "kind"
            },
            {
                "id": 2,
                "name": "proud"
            },
            {
                "id": 3,
                "name": "calm"
            }
       ]

#. Now, send the request for ``Colors``. As a reminder, this API Endpoint is not yet published by API Team, and not part of the OpenAPI File.

   * You should receive a ``404`` from the API Gateway

   .. code-block :: JSON

    {
        "message": "Not Found",
        "status": "404"
    }



What did happen and what did we do ?
====================================

#. The backend server is a modern-app listening on http://10.1.20.7:30511
#. The API Server exposes several APIs on 3 PATHS (version 1)

   * /adjectives
   * /animals
   * /locations

#. The API gateway will expose the different versions of this API, that's why the API Gateway takes care of the ``version`` and the ``base path``.
#. The API gateway ``strips`` the ``version`` and the ``base path`` as the back end server does not need/care of them. They are used to ``route`` request to the right API.
#. And as ``/colors`` is not part of the OpenAPI spec file, this request is rejected by the API Gateway.
