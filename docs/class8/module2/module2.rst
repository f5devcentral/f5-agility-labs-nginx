<<<<<<< HEAD
Start your Tuning
#################

In this section we will be tuning some NGINX configuration parameters and reviewing the results.
We will be using NGINX Instance Manager to make configuration changes and then pushing those changes to the NGINX Proxy. 

|
|

1) **Log in to NGINX Instance Manager**

Go to NGINX Intsance Manager --> ACCESS --> NIM WEB GUI

username: admin

pass: NIM123!@#

.. image:: /class8/images/nim-login.png

|

Click on the Instance Manager tile.

|

.. image:: /class8/images/nim-button.png

|
|


2) **Modify nginx.conf parameters**
   
.. image:: /class8/images/nim-edit-button.png

Click on Instances in the left column and then the ellipsis on the far right of the NGINX-Plus-Proxy instance. Next, click Edit Config.

|
|

Now you can edit the NGINX configuration file through this NIM interface

.. image:: /class8/images/nim-nginx-conf.png

|
|

Find the line (3) that has worker_processes. When set to "auto" NGINX will spawn worker processes to match the number of CPU cores on the system. This system is configured with 2 CPU cores, so in this case, NGINX will spawn 2 worker processes.

Let's change the value from auto to 1, reducing the number of worker processes in half.

.. image:: /class8/images/nim-processes-1.png

|
|

.. image:: /class8/images/nim-publish.png

Hit the publish button in the upper right to push the changes out to the NGINX Proxy

|
|

Now run another test and review the Locust Charts  

.. image:: /class8/images/locus-10-100-30.png
  :width: 200 px

.. note:: Are there any differences in Requests per Second, Response times or other stats from the previous test?
	
|
|

3) **Make another change to the nginx.conf, publish and test again**
 	
Find and change worker_connections to a value of 16 from 4096 (line 11)

.. image:: /class8/images/nim-worker-1.png

After changes, make sure to publish and run test again with same values.

.. note:: How did the performance change and What does worker_connections do?
	

|
|

4) **Revert changes to original settings and publish**
   
worker_processes auto; (line 3)

|

worker_connections 4096; (line 11) 

|

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:
=======
<<<<<<<< HEAD:docs/class5/module7/module7.rst
Module 7 - Install and Enable NGINX App Protect DoS
###################################################
========
Module 2 - Install and Enable NGINX AppProtect DoS
######################################################
>>>>>>>> origin/master:docs/class8/module2/module2.rst


In this module you will install and enable NGINX App Protect DoS on NAP DOS 1 and NAP DOS 2

NGINX App Protect DoS directives:

1. **load_module** - This command will load the dynamic module into NGINX Plus.  Located in the main context

2. **app_protect_dos_enable** - Enable/Disable App Protect DoS module. It can be located in the location, server or http contexts.

3. **app_protect_dos_monitor** - This directive is how App Protect monitors stress level of the protected resources. There are 3 arguments for this directive:

   - URI - a mandatory argument, this is the destination to the protected resources
   - Protocol - an optional argument, this is the protocol of the protected resource ( http1, http2, grpg) http1 is the default
   - Timeout - determines how many seconds App Protect waits for a response. The default is 10 seconds for http1 and http2 and 5 seconds for grpc

4. **app_protect_dos_security_log_enable** - Enable/Disable App Protect DoS security logger

5. **app_protect_dos_security_log** - This directive takes two arguments, first is the configuration file path and the second is the destination where events will be sent


Install NGINX App Protect DoS 
-----------------------------
   
1. Open the WebShell of "NAP DOS 1" VM (UDF > Components > Systems > NAP DOS 1 > Access > Web Shell)

2. Install NGINX App Protect 

   .. code:: shell

      apt install -y app-protect-dos

<<<<<<<< HEAD:docs/class5/module7/module7.rst
.. image:: images/nginx-app-protect-dos-install.png
========
    - All NGINX App Protect configurations should be commented out. Use your editing tool of choice (vi, vim, or nano) to complete this task.
    - Please note the NAP DOS Live Activity Monitoring section of the /etc/nginx/nginx.conf file will be edited at a later time (Module 6)
>>>>>>>> origin/master:docs/class8/module2/module2.rst

3. Enable NGINX App Protect DoS configuration by copying the /etc/nginx/nginx.conf.dos file over the existing /etc/nginx/nginx.conf file.

   .. code:: shell

      cp /etc/nginx/nginx.conf.dos /etc/nginx/nginx.conf

4. Optionally, view the contents of /etc/nginx/nginx.conf in a text editor. As a reminder, the NGINX App Protect DoS configuration directives start with app_protect_dos_*.

5. Restart NGINX

<<<<<<<< HEAD:docs/class5/module7/module7.rst
   .. code:: shell

      service nginx restart
      service nginx status
========
      upstream myapp1 {
            server 10.1.1.13:3000;
        }

        server {
            listen 50051 http2;
            server_name grpc.example.com;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.8:5261;
            http2_max_concurrent_streams 100000;
>>>>>>>> origin/master:docs/class8/module2/module2.rst

.. image:: images/nginx-app-protect-dos-restart.png

<<<<<<<< HEAD:docs/class5/module7/module7.rst
If NGINX restarted successfully, the restart command will complete successfully and status will return that NGINX is active (running).

6. Repeat steps 1 - 5 on the "NAP DOS 2" VM
========
            location /routeguide. {
                #app_protect_dos_monitor uri=http://grpc.example.com:50051/routeguide.RouteGuide/GetFeature protocol=grpc timeout=5;
                #app_protect_dos_enable on;
                #app_protect_dos_policy_file "/etc/app_protect_dos/BADOSDefaultPolicy.json";
                #app_protect_dos_name "routeguide";
                #set $loggable '0';
                #access_log syslog:server=10.1.1.8:5561 log_dos if=$loggable;
                grpc_pass grpc://routeguide_service;
            }
        }

        upstream routeguide_service {
            zone routeguide_service 64k;
            server 10.1.1.9:10001;
            server 10.1.1.9:10002;
            server 10.1.1.9:10003;
        }


        server {
            listen 8095 ssl http2;
            keepalive_requests 100000;
            client_max_body_size 2000M;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.8:5261;
            #set $loggable '0';
            #access_log syslog:server=10.1.1.8:5561 log_dos if=$loggable;
            http2_max_concurrent_streams 100000;
            ssl_certificate /etc/ssl/certs/cert.crt;
            ssl_certificate_key /etc/ssl/certs/cert.key;
            ssl_session_cache shared:SSL:10m;
            ssl_session_timeout 5m;
            ssl_ciphers AES128-GCM-SHA256;
            ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;

            location /monitor {
                rewrite ^/monitor(.*)$ /routeguide.RouteGuide/GetFeature break;
                grpc_pass grpc://10.1.1.9:10002;
            }

            location /testing {
                rewrite ^/testing(.*)$ /routeguide.RouteGuide/RecordRoute break;
                grpc_set_header te trailers;
                #app_protect_dos_enable on;
                #app_protect_dos_name "slowpost";
                #app_protect_dos_monitor uri=https://10.1.1.7:8095/monitor protocol=grpc;
                grpc_pass grpc://10.1.1.9:10002;
            }
        }

        server {
            listen 8080;
            keepalive_requests 100000;
            server_name juiceshop;
            #app_protect_dos_security_log_enable on;
            #app_protect_dos_security_log "/etc/app_protect_dos/log-default.json" syslog:server=10.1.1.8:5261;
            #set $loggable '0';
            #access_log syslog:server=10.1.1.8:5561 log_dos if=$loggable;

            location / {
                #app_protect_dos_enable on;
                #app_protect_dos_name "juiceshop";
                #app_protect_dos_monitor uri=http://juiceshop:8080/ timeout=2;
                proxy_pass http://myapp1;
            }
        }

    ########  NAP DOS Live Activity Monitoring ########
        #server {
            #listen 80;
            #location /api {
                #app_protect_dos_api;
            #}

            #location = /dashboard-dos.html {
            #    root /usr/share/nginx/html;
            #}
        #}
    ###################################################
        


4. Restart NGINX

``service nginx restart``

``service nginx status``

If NGINX restarted successfully, the restart command will complete successfully and status will return that NGINX is online.

5. Repeat steps 1 - 4 on the "NAP DOS 2" VM
>>>>>>>> origin/master:docs/class8/module2/module2.rst
>>>>>>> origin/master
