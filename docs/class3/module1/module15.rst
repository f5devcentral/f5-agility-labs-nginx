Modifying or deleting cookies sent by the upstream server [http/response/modify_set_cookie]
===========================================================================================

NGINX Javascript uses the `js_header_filter` directive to modify headers sent by the upstream server before they are proxied back to the client.  In this example, we remove any cookie that is shorter than the minimum length specified in a `len` argument on the query string.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/response/modify_set_cookie'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -p 443:443 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,7,12

  curl http://localhost/modify_cookies?len=1 -v
    ...
  < Set-Cookie: XXXXXX
  < Set-Cookie: BB
  < Set-Cookie: YYYYYYY

  curl http://localhost/modify_cookies?len=3 -v
    ...
  < Set-Cookie: XXXXXX
  < Set-Cookie: YYYYYYY

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

The upstream server listens on port 8080 and returns three `Set-Cookie` headers.  In the server block listening on port 80, we proxy requests to the upstream, but call the main.cookies_filter method to inspect the headers returned.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

  ...

  http {
    js_path "/etc/nginx/njs/";

    js_import main from http/response/modify_set_cookie.js;

    server {
          listen 80;

          location /modify_cookies {
              js_header_filter main.cookies_filter;
              proxy_pass http://localhost:8080;
          }
    }

    server {
          listen 8080;

          location /modify_cookies {
              add_header Set-Cookie "XXXXXX";
              add_header Set-Cookie "BB";
              add_header Set-Cookie "YYYYYYY";
              return 200;
          }
    }
  }



This njs code copies the response headers to a "cookies" variable and then creates a new set of headers that includes only the cookies that are longer than the length specified in the `len` argument.

.. code-block:: js
  :linenos:
  :caption: modify_set_cookie.js

    function cookies_filter(r) {
        var cookies = r.headersOut['Set-Cookie'];
        r.headersOut['Set-Cookie'] = cookies.filter(v=>v.length > Number(r.args.len));
    }

    export default {cookies_filter};

