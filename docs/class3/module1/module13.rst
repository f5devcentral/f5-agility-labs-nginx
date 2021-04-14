Subrequests chaining [http/subrequests_chaining]
================================================

Chaining subrequests allows us to use the output of one subrequest as the input to another.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/subrequests_chaining'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -p 443:443 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4,7,10

  curl http://localhost/start -H 'Authorization: Bearer secret'
  Token is 42

  curl http://localhost/start
  SyntaxError: Unexpected token at position 0

  curl http://localhost/start -H 'Authorization: Bearer secre'
  Error: token is not available

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

Notice how this config uses location blocks to define the target of each subrequest.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

  ...

  http {
    js_path "/etc/nginx/njs/";

    js_import utils.js;
    js_import main from http/subrequests_chaining.js;

    server {
          listen 80;

          location / {
              js_content main.process;
          }

          location = /auth {
              internal;
              proxy_pass http://localhost:8080;
          }

          location = /backend {
              internal;
              proxy_pass http://localhost:8090;
          }
    }

    ...

      server {
            listen 8080;

            location / {
                js_content main.authenticate;
            }
      }

      server {
            listen 8090;

            location / {
                return 200 "Token is $arg_token";
            }

  }

This njs code retrieves a token from the "/auth" location and then passes the token to a second subrequest of the "/backend" location.

.. code-block:: js
  :linenos:
  :caption: subrequests_chaining.js

    function process(r) {
        r.subrequest('/auth')
            .then(reply => JSON.parse(reply.responseBody))
            .then(response => {
                if (!response['token']) {
                    throw new Error("token is not available");
                }
                return response['token'];
            })
        .then(token => {
            r.subrequest('/backend', `token=${token}`)
                .then(reply => r.return(reply.status, reply.responseBody));
        })
        .catch(e => r.return(500, e));
    }

    function authenticate(r) {
        if (r.headersIn.Authorization.slice(7) === 'secret') {
            r.return(200, JSON.stringify({status: "OK", token:42}));
            return;
        }

        r.return(403, JSON.stringify({status: "INVALID"}));
    }

    export default {process, authenticate}

