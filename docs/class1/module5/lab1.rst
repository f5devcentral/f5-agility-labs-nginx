Dashboard and API Configuration
-----------------------------------------

This lab walks through configuring the NGINX Plus Dashboard and API.

**Deploy the API and dashboard configuration.**

.. note:: Execute this command on the NGINX Plus Master instance.

.. code:: shell

    sudo bash -c 'cat > /etc/nginx/conf.d/labApi.conf' <<EOF
    server {
        listen 80;
        server_name master.nginx-udf.internal;

        location /api/ {
            api write=on;
        }

        location = /dashboard.html {
            root /usr/share/nginx/html;
        }

        # Redirect requests for pre-R14 dashboard
        location /status.html {
            return 301 /dashboard.html;
        }

        location /swagger-ui/ {
            root /usr/share/nginx/html/;
            index index.html;
        }
    }
    EOF

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

Typically, the NGINX API is exposed on port 8080 and some form of authentication is configured.
This lab uses a ``server_name`` directive and does not implement security.


  