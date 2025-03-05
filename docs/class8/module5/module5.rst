Additional Tuning Parameters and Best Practices
###############################################

This section contains additional tuning parameters that can improve performance in certain use cases. We've included these tunes into the nginx.conf file on the Proxy instance and encourage you to try uncommenting them and running your Locust tests (one at a time) to see how they impact performance.

1. **Optimize the Access Log**

Writing to disk can be resource intensive. This setting allows you to buffer log output and only write to disk after collecting a specified amount of data in the buffer.

Review this line in the nginx.conf file (line 27):

* `access_log /var/log/nginx/access.log main`

You may choose to buffer your access log writes. For example:

* `access_log /var/log/nginx/access.log main buffer=128k`

This instruct NGINX to write access logs to a memory buffer before writing directly to disk. Once the memory buffer is full, its contents are transferred to disk, effectively combining these writes into one.

Although typically not recommended, if writing to disk is a concern, you may chose to turn access log writes off entirely.

* `access_log off;`

2. **Linux TCP Memory Tuning**

Observe existing TCP memory settings by entering the following linux command into the web shell:

.. image:: /class8/images/udf-proxy-webshell.png

.. code:: shell

  sudo sysctl -a|grep tcp_[rw]*mem

.. image:: /class8/images/tcp-default.png

Now edit `/etc/sysctl.conf` with your favorite editor and uncomment the TCP memory settings at the end of the file.

.. image:: /class8/images/tcp-sysctl.png

Now load the new TCP settings

.. code:: shell

  sudo sysctl -p

.. image:: /class8/images/tcp-sysctl-p.png

3. **Review gzip compression**
Note that gzip compression will not work in combination with the sendfile tune. In order to compress the payload, NGINX will need to copy data into user-space. Compression is only advised under certain circumstances when CPU resources are available.

* `gzip  on;`

4. **Rate limits**

Review the following lines in the nginx.conf file. Uncommenting these directives will enable rate limiting, according to the parameters set in limit_req_zone:

* `limit_req_zone $binary_remote_addr zone=addr:10m rate=1000r/s;`
* `limit_req zone=addr;`

5. **Connection limits**

Review the following lines in the nginx.conf file. Uncommenting these directives will enable connection limits:

* `limit_conn_zone $binary_remote_addr zone=addr:10m;`
* `limit_conn addr 400;`

Both connection and rate limits are advised as best-practices for any service running in production. These parameters can help defend against some Denial-of-Service attacks, as well as, prevent back-end application servers from being overwhelmed with rouge traffic.

.. note:: If you attempted to enable both connection and request limiting did you notice any errors when publishing the update? What could be a good solution to this? Ask for help if you need any assistance.

6. **Review upstream keepalive parameters**

* `keepalive_requests 10000;`
* `upstream block, keepalive 512;`

.. note:: While not too effective in our particular lab environment due to close proximity of our upstream to the proxy, keepalive parameters are essential to performance in real production environments.

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

