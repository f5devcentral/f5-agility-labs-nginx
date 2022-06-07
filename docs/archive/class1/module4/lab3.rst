Share Zone information Across the Cluster
=========================================

NGINX Plus can perform runtime state sharing within a cluster for the following directives:

- `sticky learn`_
- `request limit`_
- `key value storage`_

Configure Sticky Learn 
~~~~~~~~~~~~~~~~~~~~~~

NGINX Plus offers a persistence method where cookies are learned from *Set-Cookie* headers in HTTP responses. 
The F5 demo app sets a session cookie called ``_nginxPlusLab`` with a 60 second expiry.
Using ``sticky learn`` NGINX Plus will persist a client to the container where the original request (with no cookie) was load balanced.
Using runtime state sharing, this persistence information can be shared across the cluster.

**Update the upstream configuration to use ``sticky learn``.**

.. note:: Execute these steps on the NGINX Plus Master Instance.

.. code:: 

   sudo bash -c 'cat > /etc/nginx/conf.d/labUpstream.conf' <<EOF
   upstream f5App { 
       least_conn;
       zone f5App 64k;
       server docker.nginx-udf.internal:8080;  
       server docker.nginx-udf.internal:8081;  
       server docker.nginx-udf.internal:8082;

       sticky learn
       create=\$upstream_cookie__nginxPlusLab
       lookup=\$cookie__nginxPlusLab
       timeout=1h
       zone=client_sessions:1m sync;
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

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

.. note:: Resync the NGINX Configuration with the sync script (``sudo nginx-sync.sh``)

Verify Runtime State Sharing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**From the Windows Jump Host, open a new browser tab then open Chrome Developer tools.**

.. image:: /_static/developer.png
   :width: 300pt

**Click on the ``BIG-IP App`` bookmark.**

This request hits a BIG-IP virtual server.
A pool configured for round robin load balancing containing the 3 NGINX Plus instances is attached.
This response should have the *Set-Cookie* header for the ``_nginxPlusLab`` cookie.

.. image:: /_static/setcookie.png
   :width: 400pt

Take note of the ``X-Lab-NGINX`` and ``X-Lab-Origin`` headers.
The ``X-Lab-NGINX`` header shows which NGINX instance was the result of the BIG-IP's load balancing decision.
The ``X-Lab-Origin`` header shows the docker container chosen by NGINX Plus's load balancing.

**Refresh the page multiple times.**

You should notice the NGINX Plus instance (``X-Lab-NGINX``) changing while the Origin container (``X-Lab-Origin``) stays the same.
This is because each NGINX Plus instance in the cluster has the necessary persistence information from runtime sharing ``sticky learn`` data to make the correct load balancing decision.

.. image:: /_static/stick1.png
   :width: 400pt

.. image:: /_static/stick2.png
   :width: 400pt

.. _`sticky learn`: https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/#sticky
.. _`request limit`: https://docs.nginx.com/nginx/admin-guide/security-controls/controlling-access-proxied-http/#limit_req
.. _`key value storage`: https://docs.nginx.com/nginx/admin-guide/security-controls/blacklisting-ip-addresses/
