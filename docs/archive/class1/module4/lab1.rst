Configure Zone Synchronization
==============================

Each NGINX instance in a cluster needs to be configured to listen and exchange data with other cluster members.
Cluster configuration is performed in the ``stream`` context (note this command appends to ``/etc/nginx/nginx.conf``).

.. note:: Execute these steps on the NGINX Plus Master instance.

.. code:: shell
    
   sudo bash -c 'cat >> /etc/nginx/nginx.conf' <<EOF
   stream {

       server {
       listen 9000;

       zone_sync;
       zone_sync_server master.nginx-udf.internal:9000;
       zone_sync_server plus2.nginx-udf.internal:9000;
       zone_sync_server plus3.nginx-udf.internal:9000;
       }
   }
   EOF

.. note:: Restart the NGINX daemon for these changes to take effect (``sudo systemctl restart nginx``)

An NGINX Plus node will only discover other nodes and start sending updates when it first starts. 
This configuration defines a TCP listener to be used for ``zone_sync``.
Nginx Plus instances included in the cluster are defined with ``zone_sync_server`` directives (or with dns via ``resolve``).
