NGINX Plus Caching
==================

NGINX and NGINX Plus are commonly deployed as a caching tier between a load balancing tier and the application server tier.

.. image:: /_static/cache-flow.png

This lab explores a simple caching configuration. Detailed information about caching configuration directives can be found in the `admin guide`_. 
In the lab example, NGINX Plus will cache content by respecting the ``Cache-Control`` header in the response.
Content with a ``Cache-Control`` header containing ``max-age=0`` will not be cached by default.

Add a cache
~~~~~~~~~~~

**Update the configuration to define a "proxy_cache" and a method for purging the cache.**

.. note:: Execute this command on the NGINX Plus Master instance.

.. code:: shell

   sudo bash -c 'cat > /etc/nginx/conf.d/labApp.conf' <<EOF
   proxy_cache_path /tmp/cache keys_zone=f5AppCache:10m inactive=60m;

   map \$request_method \$purge_method {
       PURGE 1;
       default 0;
   }

   server {
       listen 80 default_server;
       server_name f5-app.nginx-udf.internal bigip-app.nginx-udf.internal;
       error_log /var/log/nginx/f5App.error.log info;  
       access_log /var/log/nginx/f5App.access.log combined;
       status_zone f5App;

       location / {
           proxy_pass http://f5App;
           health_check match=f5_ok;
           add_header X-Lab-NGINX \$hostname;

           proxy_cache f5AppCache;
           proxy_cache_purge \$purge_method;

           proxy_ignore_headers Set-Cookie;
           add_header X-Proxy-Cache \$upstream_cache_status;
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

This configuration  defines a ``proxy_cache_path`` directory on the local file system, a shared memory zone where hashed keys for cached items are stored, and an inactivity timeout.
The ``proxy_cache`` is referenced in the server block. Additionally, method for purging the cache (sending a request with an HTTP verb of ``PURGE``) is defined.

Several methods for signaling a cache purge could be created -- a magic header, requests from a certain IP address, etc.
In production usage, the ability to make a cache invalidating request should be protected in a suitable manner. This lab provides no security around cache invalidating requests.

For lab purposes, this configuration adds the ``X-Proxy-Cache`` header to show cache hits, misses, and ignores.
The configuration also instructs Nginx Plus to ignore ``Set-Cookie`` headers as there presence will prevent caching.

Invalidating Cached Items
~~~~~~~~~~~~~~~~~~~~~~~~~

**Populate the cache.**

The ``F5 App`` application is configured for a short 120 second ``Max-Age`` in the ``Cache-Control`` header.
Subsequent requests within this time period will pull static content from the browser cache. For these tests disable (local) caching.

**From the Windows Jump Host, open a new browser tab then open Chrome Developer tools.**

.. image:: /_static/developer.png
   :width: 300pt

**Disable the local cache.**

.. image:: /_static/no-cache.png
   :width: 400pt

Refresh the page in your browser. Notice that all content except ``index.html`` is being served from cache (``X-Proxy-Cache: HIT``).

.. image:: /_static/hit.png
   :width: 400pt

**Purge the cache.**

.. note:: Execute these commands from the NGINX Plus Master instance.

.. code:: shell

    curl -v -X PURGE http://f5-app.nginx-udf.internal/*

Refresh the page in your browser **just one time**. Look at the ``X-Proxy-Cache`` value for static content (.css, .js, .png) to verify that the cache was purged (``X-Proxy-Cache: MISS``).

.. image:: /_static/miss.png
   :width: 400pt

.. _`admin guide`: https://docs.nginx.com/nginx/admin-guide/content-cache/content-caching/

