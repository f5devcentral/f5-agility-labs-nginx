Converting response body characters to lower case [http/response/to_lower_case]
===============================================================================

NGINX Javascript now provides a `js_body_filter` directive to modify the response body before returning it to the client.  In this example, we just convert the body text to lower case.


**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/response/to_lower_case'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -p 443:443 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4

  curl http://localhost/
  hello world

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

This config proxies requests to a simple upstream on port 8080.  Responses are passed through the main.to_lower_case method before being returned to the client.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

  ...

  http {
    js_path "/etc/nginx/njs/";

    js_import main from http/response/to_lower_case.js;

    server {
          listen 80;

          location / {
              js_body_filter main.to_lower_case;
              proxy_pass http://localhost:8080;
          }
    }

    server {
          listen 8080;

          location / {
              return 200 'Hello World';
          }
    }
  }



This njs code takes the "data" returned by the upstream server and uses the .toLowerCase() method to convert it to lower case.  It then constructs a new response using r.sendBuffer() that is sent to the client instead.

.. code-block:: js
  :linenos:
  :caption: to_lower_case.js

    function to_lower_case(r, data, flags) {
        r.sendBuffer(data.toLowerCase(), flags);
    }

    export default {to_lower_case};


