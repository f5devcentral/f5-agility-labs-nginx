File IO [misc/file_io]
=========================

With njs, NGINX is able to read and write files on disk.  In this example, data is pushed to a file via HTTP POSTs.  We can then read the file using HTTP GET as well as erase the file and start over.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='misc/file_io'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4,7,10,13,16,19,22

  curl http://localhost/read
  200 <empty reply>

  curl http://localhost/push -X POST --data 'AAA'
  200

  curl http://localhost/push -X POST --data 'BBB'
  200

  curl http://localhost/push -X POST --data 'CCC'
  200

  curl http://localhost/read
  200 AAABBBCCC

  curl http://localhost/flush -X POST
  200

  curl http://localhost/read
  200 <empty reply>

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

Notice how the push, flush, and read operations are triggered through NGINX location blocks.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

    http {
      js_path "/etc/nginx/njs/";

      js_import utils.js;
      js_import main from misc/file_io.js;

      server {
            listen 80;

            location /version {
                js_content utils.version;
            }

            location /push {
                js_content main.push;
            }

            location /flush {
                js_content main.flush;
            }

            location /read {
                js_content main.read;
            }
    }

This njs code uses a file on the NGINX server's disk to provide persistent storage.

.. code-block:: js
  :linenos:
  :caption: file_io.js

  var fs = require('fs');
  var STORAGE = "/tmp/njs_storage"

  function push(r) {
          fs.appendFileSync(STORAGE, r.requestBody);
          r.return(200);
  }

  function flush(r) {
          fs.writeFileSync(STORAGE, "");
          r.return(200);
  }

  function read(r) {
          var data = "";
          try {
              data = fs.readFileSync(STORAGE);
          } catch (e) {
          }

          r.return(200, data);
  }

  export default {push, flush, read}

