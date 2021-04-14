Complex redirects using njs file map. [http/complex_redirects]
=================================================================

In this example, we will use njs to use a online mapping table to transform a request's URI before proxing to the upstream.

**Step 1:** Use the following commands to start your NGINX container with this lab's files: *Notice that we are now exposing port 8090*

.. code-block:: shell

  EXAMPLE='http/complex_redirects'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -p 8090:8090 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4,7,10,13,16,19,22,25,28,31

  curl http://localhost/CCC?a=1
  200 /CCC?a=1

  curl http://localhost:8090/map
  200 {}

  curl http://localhost:8090/add -X POST --data '{"from": "/CCC", "to": "/AA"}'
  200

  curl http://localhost:8090/add -X POST --data '{"from": "/BBB", "to": "/DD"}'
  200

  curl http://localhost/CCC?a=1
  200 /AA?a=1

  curl http://localhost/BB?a=1
  200 /BB?a=1

  curl http://localhost:8090/map
  200 {"/CCC":"/AA","/BBB":"/DD"}

  curl http://localhost:8090/remove -X POST --data '{"from": "/CCC"}'
  200

  curl http://localhost:8090/map
  200 {"/BBB":"/DD"}

  curl http://localhost/CCC?a=1
  200 /CCC?a=1

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

This config uses `auth_request` to make a request to an "authentication server" before proxyingto the upstream server.  In this case, the "auth server" is an internal location that calls our njs code. The data returned by our code is put into the $route variable which is used to build a new URI to be proxied to the upstream server.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

      ...

   http {
      js_path "/etc/nginx/njs/";

      js_import utils.js;
      js_import main from http/complex_redirects.js;

      upstream backend {
        server 127.0.0.1:8080;
      }

      server {
         listen 80;

         location = /version {
             js_content utils.version;
         }

         # PROXY

         location / {
             auth_request /resolv;
             auth_request_set $route $sent_http_route;

             proxy_pass http://backend$route$is_args$args;
         }

         location = /resolv {
             internal;

             js_content main.resolv;
         }
      }
   }

This njs code grabs the first element of the request URI to query the mapping table DB.  If an entry exists, the original URI is replaced with the new one.  The new URI is passed back to NGINX in a new "Route" header.

.. code-block:: js
  :linenos:
  :caption: complex_redirects.js

    ...

    function resolv(r) {
        try {
            var map = open_db();
            var uri = r.variables.request_uri.split("?")[0];
            var mapped_uri = map[uri];

            r.headersOut['Route'] = mapped_uri ? mapped_uri : uri;
            r.return(200);

        } catch (e) {
            r.return(500, "resolv: " + e);
        }
     }
    ...

