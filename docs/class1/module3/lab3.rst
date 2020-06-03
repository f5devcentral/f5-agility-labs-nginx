Health Checks
--------------------------

For passive health checks, NGINX and NGINX Plus monitor transactions as they happen, and try to resume failed connections.
If the transaction cannot be resumed, NGINX open source and NGINX Plus mark the server as unavailable and temporarily stop sending it requests until the server marked active again.

The conditions under which an upstream server is marked unavailable are defined for each upstream server with parameters to the server directive in the upstream block.
For example:

.. code:: shell

  upstream backend {
      server backend1.example.com;
      server backend2.example.com max_fails=3 fail_timeout=30s;
  }

Active Health Checks
~~~~~~~~~~~~~~~~~~~~
NGINX Plus can periodically check the health of upstream servers by sending special ``health‑check`` requests to each server and verifying the correct response.
For example:

.. code:: shell

  server {
      location / {
          proxy_pass http://backend;
          health_check;
      }
  }

By default, every five seconds NGINX Plus sends a request for “/” to each server in the backend group. 
If any communication error or timeout occurs (the server responds with a status code outside the range from 200 through 399) the health check fails.
If the server is marked as unhealthy NGINX Plus does not send client requests to it until it once again passes a health check. To allow the worker processes to use the same set of counters to keep track of responses from the servers in an upstream group use a shared memory zone (``zone``).

``health_check`` supports the following parameters:
- port
- interval
- fails
- passes
- uri
- match

  
Defining Custom Conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~
NGINX Plus can use custom conditions that the response must satisfy for the server to pass the health check. 
The conditions are defined in a ``match`` block, which is referenced in the match parameter of the health_check directive.
For example:

.. code:: shell

  http {
      #...
      match server_ok {
          # tests are here
      }
  }

Refer to the block from the health_check directive by specifying the ``match`` parameter and the name of the match block.
To keep the configuration tidy, ``match`` blocks will kept in their file apart from upstream blocks and server blocks.

.. note:: Execute these commands on the NGINX Plus Master instance.

**Create the "match" blocks.**

.. code:: shell

    sudo bash -c 'cat > /etc/nginx/conf.d/labMatch.conf' <<EOF
    match f5_ok {
        status 200;
    }

    match nginx_ok {
        status 200-399;
        body !~ "maintenance mode";
    }
    EOF

**Update the server blocks.**

.. code:: shell

    sudo bash -c 'cat > /etc/nginx/conf.d/labApp.conf' <<EOF
    server {
        listen 80 default_server;
        server_name f5-app.nginx-udf.internal bigip-app.nginx-udf.internal;
        error_log /var/log/nginx/f5App.error.log info;  
        access_log /var/log/nginx/f5App.access.log combined;
        status_zone f5App;

        location / {
            proxy_pass http://f5App;
            health_check match=f5_ok;
        }
    }

    server {
        listen 80;
        server_name nginx-app.nginx-udf.internal;
        error_log /var/log/nginx/nginxApp.error.log info;  
        access_log /var/log/nginx/nginxApp.access.log combined;
        status_zone nginxApp;

        location /text {
            proxy_pass http://nginxApp-text;
            health_check match=nginx_ok;
        }
        location / {
            proxy_pass http://nginxApp;
            health_check match=nginx_ok;
        }
    }
    EOF

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

NGINX Plus is now monitoring upstreams with active health checks.
