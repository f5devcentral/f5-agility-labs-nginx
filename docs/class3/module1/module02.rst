Decode URI [http/decode_uri]
============================

When interacting with web servers, some characters have special meaning and can't be passed directly in a URL.  To overcome this limitation, strings can be "URL encoded" to allow special characters to be preserved.  In this example, we will use the decodeURIComponent() njs method to decode a URL encoded string provided in the query string parameter foo.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/decode_uri'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4,7,10,13

  curl -G http://localhost/foo --data-urlencode "foo=Hello Günter"
  Hello%20G%C3%BCnter

  curl -G http://localhost/dec_foo -d "foo=Hello%20G%C3%BCnter"
  Hello Günter

  curl -G http://localhost/foo --data-urlencode "foo=привет"
  %D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

  curl -G http://localhost/dec_foo -d "foo=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82"
  привет

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

The NGINX configuraton provides two locations, /foo and /dec_foo.  Using /foo just returns the string as is without decoding.  The /dec_foo location returns the decoded version of the string.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

    ...

    http {
      js_path "/etc/nginx/njs/";

      js_import utils.js;
      js_import main from http/decode_uri.js;

      js_set $dec_foo main.dec_foo;

      server {
   ...
   
         location /foo {
             return 200 $arg_foo;
         }

         location /dec_foo {
             return 200 $dec_foo;
         }
       }
   }

In our JavaScript we access the foo argument from the query string through the request's arguements object (args).  We then use the `decodeURIComponent()` built-in method to decode the string.

.. code-block:: js
  :linenos:
  :caption: decode_uri.js

   function dec_foo(r) {
     return decodeURIComponent(r.args.foo);
   }

