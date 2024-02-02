<<<<<<< HEAD
Additional Tuning Parameters and Best Practices
###############################################

This section list some additional tuning parameters. These are good to understand and will improve performance in certain use cases. We've included these tunes into the nginx.conf file on the proxy and you may choose to uncomment them to see how they impact performance.

|
|

1) **Optimize the Access Log**

Writing to disk can be resource intensive. This setting allows you to buffer log output and only write to disk after collecting a specified amount of data.

Review this line in the nginx.conf file

* access_log /var/log/nginx/access.log main buffer=128;

Although typically not recommended, you may chose to turn off the access log entirely if writing to disk is a concern

* access_log off;
|
|

2) **Linux TCP Memory Tuning**  
   
Observe existing TCP memory settings

`sudo sysctl -a|grep tcp_[rw]*mem`

|

.. image:: /class8/images/tcp-default.png

|

Access the NGINX Proxy either SSH or WEB SHELL.
Edit /etc/sysctl.conf and uncomment the TCP memory settings at the end of the file.

|

.. image:: /class8/images/tcp-sysctl.png

|

Now load the new TCP settings

`sudo sysctl -p`

|

.. image:: /class8/images/tcp-sysctl-p.png

|
|

3) **Review gzip compression**
Note that gzip compression will not work in combination with the sendfile tune. In order to compress the payload, NGINX will need to copy data into user-space. Compression is only advised under certain circumstances when CPU resources are available.

* gzip  on;

|

4) **Rate limits**  
   
Review the following lines in the nginx.conf file
	
* limit_req_zone $binary_remote_addr zone=addr:10m rate=1000r/s;
* limit_req zone=addr;

Uncommenting these directives will enable rate limiting, according to the parameters set in limit_req_zone

5) **Connection limits**

Review the following lines in the nginx.conf file

* limit_conn_zone $binary_remote_addr zone=addr:10m;
* limit_conn addr 400;

Uncommenting these directives will enable connection limits.

.. note:: Both connection and rate limits are advised as best-practices for any service running in production. These parameters can help defend against some Denial-of-Service attacks, as well as, prevent back-end application servers from being overwhelmed with rouge traffic.

|

6) **Review upstream keepalive parameters**

* keepalive_requests 10000;
* upstream block, keepalive 512;

.. note:: While not too effective in our particular lab environment, keepalive parameters are essential to performance in real production environments.

Thank you!! Hope you enjoyed this lab!!

|

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

=======
<<<<<<<< HEAD:docs/class5/module10/module10.rst
Module 10 - Live Activity Monitoring with NGINX App Protect DoS Dashboard
#########################################################################
========
Module 5 - Reporting and Monitoring NAP DoS using ELK Stack
###########################################################
>>>>>>>> origin/master:docs/class8/module5/module5.rst

Overview
--------

NGINX App Protect DoS provides various monitoring tools for your application:

* The interactive DoS Dashboard page - a real-time live activity monitoring interface that shows status and information of your Protected Objects.
* NGINX App Protect DoS REST API - an interface that can obtain extended metrics information of your Protected Objects.

Example configuration
---------------------

The DoS Dashboard has been enabled for this lab by specifying the **/dashboard-dos.html** location. By default the DoS Dashboard is located in the root directory (for example, /usr/share/nginx/html) specified by the root directive.

<<<<<<<< HEAD:docs/class5/module10/module10.rst
.. code-block:: nginx
   :linenos:
========
That’s why BaDoS first mitigates with a global rate limit just to protect the server. (Dashboard: AP_DOS: HTTP mitigation, Global Rate will marked Red)
>>>>>>>> origin/master:docs/class8/module5/module5.rst

    server {
      listen 80;
      location /api {
        app_protect_dos_api;
      }
      location = /dashboard-dos.html {
        root /usr/share/nginx/html;
      }
    }

Accessing the Dashboard
-----------------------

Go to **NAP DOS 1** VM, navigate to **Access** and select **NAPDOS - Dashboard**, then click **Dos Protected Objects**.

.. image:: images/nap_dos_protected.jpg

Tab Overview
------------

The DoS tab provides statistics and configuration per each Protected Object.

Status indicators (colors - green / orange / red), one in the tab name, the other is in the table of protected objects, per protected object.

The logic for the colors is as follows:

* green - no attack, s/h < 0.9
* yellow - under attack, s/h < 1 or no attack ,s/h > 0.9 and < 1
* red - under attack S/H >= 1
>>>>>>> origin/master
