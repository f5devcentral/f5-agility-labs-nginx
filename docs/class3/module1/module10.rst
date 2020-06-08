Choosing upstream in stream based on the underlying protocol [stream/detect_http]
=================================================================================

In this example we will use the stream module to inspect an incoming TCP connection and determine if it is an HTTP request or something else.  It then routes HTTP traffic to one server and non-HTTP traffic to another.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell
  :emphasize-lines: 1,2

  EXAMPLE='stream/detect_http'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro  -v $(pwd)/njs/$EXAMPLE.js:/etc/nginx/example.js:ro -v $(pwd)/njs/utils.js:/etc/nginx/utils.js:ro -p 80:80 -p 8090:8090 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4,7

  curl http://localhost/
  HTTPBACK

  echo 'ABC' | nc 127.0.0.1 80 -q1
  TCPBACK

  docker stop njs_example

*Note: Remove the -q1 option from nc above if you get an error.*

**Code Snippets**

This config uses `js_preread` to fetch incoming data into a buffer for inspection.

.. code-block:: nginx
  :caption: nginx.conf
  :linenos:

  ...

  stream {
    js_import utils.js;
    js_import main from example.js;

    js_set $upstream main.upstream_type;

    upstream httpback {
        server 127.0.0.1:8080;
    }

    upstream tcpback {
        server 127.0.0.1:3001;
    }

    server {
          listen 80;

          js_preread  main.detect_http;

          proxy_pass $upstream;
    }
  }


This code looks for "HTTP/1." in the incoming data stream to detect an HTTP connection.  It then sets the upstream to "httpback" for HTTP traffic and "tcpback" for everything else.

.. code-block:: js
  :caption: example.js
  :linenos:

    var is_http = 0;

    function detect_http(s) {
        s.on('upload', function (data, flags) {
            var n = data.indexOf('\r\n');
            if (n != -1 && data.substr(0, n - 1).endsWith(" HTTP/1.")) {
                is_http = 1;
            }

            if (data.length || flags.last) {
                s.done();
            }
        });
    }

    function upstream_type(s) {
        return is_http ? "httpback" : "tcpback";
    }

    export default {detect_http, upstream_type}

