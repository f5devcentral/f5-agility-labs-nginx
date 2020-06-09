Generating JWT token [gen_hs_jwt]
======================================

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell
  :emphasize-lines: 1,2

  EXAMPLE='gen_hs_jwt'
  docker run --rm --name njs_example -e JWT_GEN_KEY="foo" -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro  -v $(pwd)/njs/$EXAMPLE.js:/etc/nginx/example.js:ro -v $(pwd)/njs/utils.js:/etc/nginx/utils.js:ro -p 80:80 -p 8090:8090 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4

  curl 'http://localhost/jwt'
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImV4cCI6MTU4NDcyMjk2MH0.eyJpc3MiOiJuZ2lueCIsInN1YiI6ImFsaWNlIiwiZm9vIjoxMjMsImJhciI6InFxIiwienl4IjpmYWxzZX0.GxfKkJSWI4oq5sGBg4aKRAcFeKmiA6v4TR43HbcP2X8

  docker stop njs_example

**Code Snippets**

This config uses `js_set` to invoke the jwt function in our njs code.  The result is returned is the response body.

.. code-block:: nginx
  :caption: nginx.conf
  :linenos:

  env JWT_GEN_KEY;

  ...

  http {
    js_import utils.js;
    js_import main from example.js;

    js_set $jwt main.jwt;

    server {
  ...
        location /jwt {
            return 200 $jwt;
        }
    }
  }

The njs code creates a claims object and then builds the JWT by combining the header, claims, and a digital signature.

.. code-block:: js
  :caption: example.js
  :linenos:

    function generate_hs256_jwt(claims, key, valid) {
        var header = { typ: "JWT",  alg: "HS256" };
        var claims = Object.assign(claims, {exp: Math.floor(Date.now()/1000) + valid});

        var s = [header, claims].map(JSON.stringify)
                                .map(v=>v.toUTF8())
                                .map(v=>v.toString('base64url'))
                                .join('.');

        var h = require('crypto').createHmac('sha256', key);

        return s + '.' + h.update(s).digest().toString('base64url');
    }

    function jwt(r) {
        var claims = {
            iss: "nginx",
            sub: "alice",
            foo: 123,
            bar: "qq",
            zyx: false
        };

        return generate_hs256_jwt(claims, process.env.JWT_GEN_KEY, 600);
    }

    export default {jwt}

