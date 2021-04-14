Subrequests join [http/join_subrequests]
===========================================
When our njs code generates dynamic content we can send our own HTTP requests to external services by calling the subrequest method. In this example we will combine the results of several subrequests asynchronously into a single JSON reply.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/join_subrequests'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,4

  curl http://localhost/join
  [{"uri":"/foo","code":200,"body":"FOO"},{"uri":"/bar","code":200,"body":"BAR"}]

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
    js_import main from http/join_subrequests.js;

    server {
          listen 80;

          location /join {
              js_content main.join;
          }

          location /foo {
              proxy_pass http://localhost:8080;
          }

          location /bar {
              proxy_pass http://localhost:8090;
          }
    }
  }

The `join_subrequests()` method will iterate though elements of the array of URLs passed to it and make a subrequest to each one.  The `done` method is used as a callback to parse the results of each subrequest.

.. code-block:: js
  :linenos:
  :caption: join_subrequests.js

  function join(r) {
      join_subrequests(r, ['/foo', '/bar']);
  }

  function join_subrequests(r, subs) {
      var parts = [];

      function done(reply) {
          parts.push({ uri:  reply.uri,
                       code: reply.status,
                       body: reply.responseBody });

          if (parts.length == subs.length) {
              r.return(200, JSON.stringify(parts));
          }
      }

      for (var i in subs) {
          r.subrequest(subs[i], done);
      }
  }

  export default {join}

