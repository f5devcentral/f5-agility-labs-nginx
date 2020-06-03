Explore API Endpoints
-----------------------------------------

Explore the API
~~~~~~~~~~~~~~~

The NGINX Plus API has the following top level endpoints:

.. code:: shell
    
    [
    "nginx",
    "processes",
    "connections",
    "slabs",
    "http",
    "stream",
    "ssl"
    ]

These endpoints correspond with NGINX Plus build information, process info, connection statistics, configuration blocks, etc.

**Explore the NGINX Plus API using at least one of the desired methods below.**

Curl
^^^^

.. note:: Execute these examples from the NGINX Plus Master instance.

.. code:: shell

    curl -s http://master.nginx-udf.internal/api/4 | jq .
    [
    "nginx",
    "processes",
    "connections",
    "slabs",
    "http",
    "stream",
    "ssl"
    ]

.. code:: shell

    curl -s http://master.nginx-udf.internal/api/4/nginx | jq .
    {
    "version": "1.15.10",
    "build": "nginx-plus-r18",
    "address": "10.1.1.6",
    "generation": 1,
    "load_timestamp": "2019-05-13T12:03:59.958Z",
    "timestamp": "2019-05-13T12:48:10.419Z",
    "pid": 1238,
    "ppid": 1236
    }

.. code:: shell

    curl -s http://master.nginx-udf.internal/api/4/http | jq .
    [
    "requests",
    "server_zones",
    "caches",
    "keyvals",
    "upstreams"
    ]

**If desired, query various endpoints under ``/api/4/http/``.**

Swagger UI
^^^^^^^^^^

Swagger UI provides visual documentation of the NGINX Plus API generated from an OpenAPI spec. 
The Swagger UI generated for the lab is fully functional -- ie. POST and PATCH examples will update the configuration.

**Open the "Swagger UI" bookmark in Chrome.**

.. image:: /_static/swaggerbook.png
   :width: 300pt
 
Postman
^^^^^^^

A PostMan collection that targets several API endpoints is provided on the Windows Jump Host for this lab.

**Walk through the "Explore" and "Reset Stats" folders of the collection.**

.. image:: /_static/PMcollection.png
   :width: 250pt

