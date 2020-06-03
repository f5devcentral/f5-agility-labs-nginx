Incrementally More Useful Configurations
----------------------------------------

The basic configuration was missing several crucial directives needed for a useful reverse proxy.
This lab will incrementally build a more advanced and useful configuration which takes advantage of NGINX Plus features.


Upstream Features: Selection Algorithm, Weight
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: Execute this command on the NGINX Plus Master Instance.

.. code:: shell

  sudo bash -c 'cat > /etc/nginx/conf.d/labApp.conf' <<EOF
  upstream f5App { 
      least_conn;
      server docker.nginx-udf.internal:8080 weight=25;  
      server docker.nginx-udf.internal:8081 weight=5;  
      server docker.nginx-udf.internal:8082 weight=5;
  }

  server {
    listen 80;
    error_log /var/log/nginx/f5App.error.log info;  
    access_log /var/log/nginx/f5App.access.log combined;

    location / {
        proxy_pass http://f5App;
    }
  }
  EOF

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

The basic declaration didn't specify a selection algorithm (ie. load balancing method) so Round Robin was used. 
NGINX supports `Round Robin`_, `Hash`_, `IP Hash`_, and `Least Connections`_ selection algorithms. NGINX Plus adds the `Least Time`_ algorithm.

``Weight`` is a similar concept as ratio load balancing with F5 products.
In this example, the container listening on port 8080 is weighted 5 times heavier than the other upstream servers. 

**Verify the configuration.**

On the ``Windows Jump Host`` reload the ``F5 App`` several times paying attention to the ``Server IP`` field on the page.
One container should be weighted heavier than the others -- this weighting will likely not be as pronounced as expected.
In this configuration, ``weight`` is enforced on a per-worker basis.

Multiple Upstreams, Server Blocks, and a Shared Memory Zone
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This lab will end up using several upstreams. In order to keep the configuration size manageable, these will be stored in a separate file. 

.. note:: Execute these steps on the NGINX Plus Master instance.

**Define the upstream configuration.**

.. code:: shell

    sudo bash -c 'cat > /etc/nginx/conf.d/labUpstream.conf' <<EOF
    upstream f5App { 
        least_conn;
        zone f5App 64k;
        server docker.nginx-udf.internal:8080;  
        server docker.nginx-udf.internal:8081;  
        server docker.nginx-udf.internal:8082;

    }

    upstream nginxApp { 
        least_conn;
        zone nginxApp 64k;
        server docker.nginx-udf.internal:8083;  
        server docker.nginx-udf.internal:8084;  
        server docker.nginx-udf.internal:8085;
    }

    upstream nginxApp-text {
        least_conn;
        zone nginxApp 64k;
        server docker.nginx-udf.internal:8086;  
        server docker.nginx-udf.internal:8087;  
        server docker.nginx-udf.internal:8088;
    }
    EOF

.. warning:: Do *not* reload the configuration until after the next step.

This example defines the ``zone`` directive. NGINX manages weights independently per each worker process. NGINX Plus uses a shared memory segment for upstream data 
(configured with the zone directive), so weights are shared between workers and traffic is distributed more accurately across the instance.

Next, the advanced configuration will define multiple server blocks (and some will have multiple locations).

**Define the server block configuration.**

.. code:: shell

    sudo bash -c 'cat > /etc/nginx/conf.d/labApp.conf' <<EOF
    server {
        listen 80 default_server;
        server_name f5-app.nginx-udf.internal bigip-app.nginx-udf.internal;
        error_log /var/log/nginx/f5App.error.log info;  
        access_log /var/log/nginx/f5App.access.log combined;
 
        location / {
            proxy_pass http://f5App;

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
        }
        location / {
            proxy_pass http://nginxApp;
        }
    }
    EOF

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

In this example, multiple server blocks are defined listening on the same port. 
When multiple server blocks match a request, NGINX compares the request ``Host`` header to the ``server_name`` directive.
If no ``server_name`` match is found the server block marked ``default_server`` will be used.

In the last server block, there are multiple locations defined.
NGINX matches the URI against the most specific ``location`` and then proxies the request to the defined upstream.

The ``status_zone`` directive allow workers to collect and aggregate server block statistics. Multiple ``server`` blocks could be part of the same ``status_zone``.



.. _`Round Robin`: https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#round-robin
.. _`Hash`: https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#hash
.. _`IP Hash`: https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#ip-hash
.. _`Least Connections`: https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#least-connections
.. _`Least Time`: https://www.nginx.com/blog/choosing-nginx-plus-load-balancing-techniques/#least-time