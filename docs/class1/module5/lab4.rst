Dynamic Upstream Configuration
------------------------------

Changes to upstream servers can be made through the Dashboard or through the API. 
*Performing an upstream change through the Dashboard or API only updates the shared memory zone -- configuration files are not updated.*
Reloading NGINX when the shared memory state is not consistent with the configuration files will cause a loss of state.
NGINX Plus provides a mechanism for keeping upstream state between reloads.

.. note:: Execute this step on the NGINX Plus Master instance.

.. code:: 

    sudo bash -c 'cat > /etc/nginx/conf.d/labUpstream.conf' <<EOF
    upstream f5App { 
        least_conn;
        zone f5App 64k;
        state /var/lib/nginx/state/f5App.conf;

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

The ``state`` directive defines a local file which NGINX Plus manages to keep state across reloads.

Interacting with the State File
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
The state file can be modified only with configuration commands from the API interface. 

**Using requests in the "Update Upstream" folder of the Postman collection, manipulate the state of the "f5App" upstream.**

.. image:: /_static/upstreamupdate.png
   :width: 200pt

**Using the Dashboard, Remove one or more upstream servers from the "F5App" upstream group.**

Click the pencil icon, then the radio button of the upstream server(s) to be removed. 
Click the ``Edit Selected`` button followed by ``Remove`` (this dialogue will look different if only one upstream server is selected).

.. image:: /_static/editupstream1.png
   :width: 400pt

**Using the Dashboard, Remove one or more upstream servers from the "nginxApp" upstream group.**

Perform the same task for the ``nginxApp`` upstream. 

.. image:: /_static/doneupstreams.png
   :width: 500pt

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

**Go back to the Dashboard and check the status of the "f5App" and "nginxApp" upstream groups.**

Notice the upstream group not using the ``state`` directive reverted to the defined configuration.




