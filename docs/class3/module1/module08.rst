Injecting HTTP header using stream proxy [stream/inject_header]
=======================================================================

In this example we will use the stream module to inject a new header into an HTTP request in flight.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell
  :emphasize-lines: 1,2

  EXAMPLE='stream/inject_header'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro  -v $(pwd)/njs/$EXAMPLE.js:/etc/nginx/example.js:ro -v $(pwd)/njs/utils.js:/etc/nginx/utils.js:ro -p 80:80 -p 8080:8080 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4

  curl http://localhost/
  my_foo

  docker stop njs_example

**Code Snippets**

Instead of an http block, this config uses a stream block so we can use the `js_filter` directive to call our njs code.

.. code-block:: nginx
  :caption: nginx.conf
  :linenos:

  ...

  stream {
      js_import utils.js;
      js_import main from example.js;


      server {
            listen 80;

            proxy_pass 127.0.0.1:8080;
            js_filter main.inject_foo_header;
      }
  }

  ...

This njs code uses a callback to read data from an incoming request until it sees the end of a line.  It then inserts the new "Foo" header at that point in the data stream before removing the callback.

.. code-block:: js
  :caption: example.js
  :linenos:

    function inject_foo_header(s) {
        inject_header(s, 'Foo: my_foo');
    }

    function inject_header(s, header) {
        var req = '';

        s.on('upload', function(data, flags) {
            req += data;
            var n = req.search('\n');
            if (n != -1) {
                var rest = req.substr(n + 1);
                req = req.substr(0, n + 1);
                s.send(req + header + '\r\n' + rest, flags);
                s.off('upload');
            }
        });
    }

