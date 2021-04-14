Extract JWT Payload into NGINX Variable [http/authorization/jwt]
================================================================

JSON Web Tokens (JWT) are a common way to authenticate to web applications.  In addition to authentication, JWTs can also be used to pass information, called claims, about the user to the application.  The commercial version of NGINX, NGINX Plus, has built-in JWT handling features.  Using njs, we can parse JWTs and extract claim data even in the open source version of NGINX.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/authorization/jwt'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4

  curl 'http://localhost/jwt' -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImV4cCI6MTU4NDcyMzA4NX0.eyJpc3MiOiJuZ2lueCIsInN1YiI6ImFsaWNlIiwiZm9vIjoxMjMsImJhciI6InFxIiwienl4IjpmYWxzZX0.Kftl23Rvv9dIso1RuZ8uHaJ83BkKmMtTwch09rJtwgk"
  alice

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

This NGINX configuration uses `js_set` to invoke our JavaScript to extract the JWT claim into a variable we can return back to the user.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

  http {
    js_path "/etc/nginx/njs/";

    js_import utils.js;
    js_import main from http/authorization/jwt.js;

    js_set $jwt_payload_sub main.jwt_payload_sub;

    server {
  ...
        location /jwt {
            return 200 $jwt_payload_sub;
        }
    }
  }

In our JavaScript we are leveraging the string processing features of njs to decode and parse the JWT into a JSON object.  We then extract the claim we want called "sub."

.. code-block:: js
  :linenos:
  :caption: jwt.js

    function jwt(data) {
        var parts = data.split('.').slice(0,2)
            .map(v=>Buffer.from(v, 'base64url').toString())
            .map(JSON.parse);
        return { headers:parts[0], payload: parts[1] };
    }

    function jwt_payload_sub(r) {
        return jwt(r.headersIn.Authorization.slice(7)).payload.sub;
    }

    export default {jwt_payload_sub}

