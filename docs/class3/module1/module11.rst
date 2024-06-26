Authorizing requests using auth_request [http/authorization/auth_request]
=========================================================================

The `auth_request <http://nginx.org/en/docs/http/ngx_http_auth_request_module.html>`_
module is used for client authorization based on the result of a subrequest.
Using njs along with auth_request can allow additional logic to be used for authentication.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/authorization/auth_request'
  docker run --rm --name njs_example -e SECRET_KEY="foo" -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,10,19,22,32

  curl http://localhost/secure/B  
  <html>
  <head><title>401 Authorization Required</title></head>
  <body>
  <center><h1>401 Authorization Required</h1></center>
  <hr><center>nginx/1.19.0</center>
  </body>
  </html>

  curl http://localhost/secure/B  -H Signature:fk9WRmw7Rl+NwVAA759+H2Uq
  <html>
  <head><title>401 Authorization Required</title></head>
  <body>
  <center><h1>401 Authorization Required</h1></center>
  <hr><center>nginx/1.19.0</center>
  </body>
  </html>

  curl http://localhost/secure/B  -H Signature:fk9WRmw7Rl+NwVAA759+H2UqxNs=
  BACKEND:/secure/B

  docker logs njs_example
  172.17.0.1 - - [03/Aug/2020:18:22:30 +0000] "GET /secure/B HTTP/1.1" 401 179 "-" "curl/7.58.0"
  2020/08/03 18:22:47 [error] 28#28: *3 js: No signature
  172.17.0.1 - - [03/Aug/2020:18:22:47 +0000] "GET /secure/B HTTP/1.1" 401 179 "-" "curl/7.58.0"
  2020/08/03 18:22:54 [error] 28#28: *4 js: Invalid signature: fk9WRmw7Rl+NwVAA759+H2Uq

  172.17.0.1 - - [03/Aug/2020:18:22:54 +0000] "GET /secure/B HTTP/1.1" 401 179 "-" "curl/7.58.0"
  127.0.0.1 - - [03/Aug/2020:18:23:00 +0000] "GET /secure/B HTTP/1.0" 200 18 "-" "curl/7.58.0"
  172.17.0.1 - - [03/Aug/2020:18:23:00 +0000] "GET /secure/B HTTP/1.1" 200 18 "-" "curl/7.58.0"

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

This config uses `auth_request` to make a request to an "authentication server" before proxying to the upstream server.  In this case, the "auth server" is an internal location that calls our njs code. 

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

    ...

    env SECRET_KEY;

    http {
          js_path "/etc/nginx/njs/";

          js_import main from http/authorization/auth_request.js;

          upstream backend {
              server 127.0.0.1:8081;
          }

          server {
              listen 80;

              location /secure/ {
                  auth_request /validate;

                  proxy_pass http://backend;
              }

              location /validate {
                  internal;
                  js_content main.authorize;
              }
          }

          server {
              listen 127.0.0.1:8081;
              return 200 "BACKEND:$uri\n";
          }
    }


The njs code will look for a "Signature" header and compare its contents with a digital signature generated by the crypto library of njs.  It also makes sure only GET requests are allowed.

.. code-block:: js
  :linenos:
  :caption: auth_request.js

    function authorize(r) {
        var signature = r.headersIn.Signature;

        if (!signature) {
            r.error("No signature");
            r.return(401);
            return;
        }

        if (r.method != 'GET') {
            r.error(`Unsupported method: ${r.method}`);
            r.return(401);
            return;
        }

        var args = r.variables.args;

        var h = require('crypto').createHmac('sha1', process.env.SECRET_KEY);

        h.update(r.uri).update(args ? args : "");

        var req_sig = h.digest("base64");

        if (req_sig != signature) {
            r.error(`Invalid signature: ${req_sig}\n`);
            r.return(401);
            return;
        }

        r.return(200);
    }

    export default {authorize}

