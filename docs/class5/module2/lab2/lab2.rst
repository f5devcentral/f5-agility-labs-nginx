Step 4 - Check logs in Kibana
#############################

In this lab we will check the logs in the ELK stack (Elastic, Logstash, Kibana)

**Understanding how to configure the destination syslog server**

Steps:

   #. With vscode or Windows Terminal ssh to the centos-vm
   #. In ``/home/ubuntu/lab-files`` view t
   #. View ``/etc/app_protect/conf/log_default.json`` which is installed with app-protect. By default, we log all requests.

      .. code-block:: js
         :caption: log_default.json

         {
         "filter": {
            "request_type": "all"
               },
         "content": {
            "format": "default",
            "max_request_size": "any",
            "max_message_size": "5k"
               }
         }

   #. Open nginx.conf ``less nginx.conf``

      .. code-block:: nginx
         :caption: nginx.conf
         :emphasize-lines: 34 

         user  nginx;
         worker_processes  auto;
        
         error_log  /var/log/nginx/error.log notice;
         pid        /var/run/nginx.pid;
        
         load_module modules/ngx_http_app_protect_module.so;
        
         events {
             worker_connections 1024;
         }
        
         http {
             include          /etc/nginx/mime.types;
             default_type  application/octet-stream;
             sendfile        on;
             keepalive_timeout  65;
        
             log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                             '$status $body_bytes_sent "$http_referer" '
                             '"$http_user_agent" "$http_x_forwarded_for"';
        
             access_log  /var/log/nginx/access.log  main;
        
             server {
             listen       80;
                 server_name  localhost;
                 proxy_http_version 1.1;
        
                 app_protect_enable on;
                 app_protect_policy_file "/etc/app_protect/conf/NginxDefaultPolicy.json";
                 app_protect_security_log_enable on;
                 app_protect_security_log "/etc/nginx/log-default.json" syslog:server=10.1.20.11:5144;
        
                 location / {
                     resolver 10.1.1.8:5353;
                     resolver_timeout 5s;
                     client_max_body_size 0;
                     default_type text/html;
                     proxy_pass http://k8s.arcadia-finance.io:30511$request_uri;
                 }
             }
         }


.. note:: You will notice in the ``nginx.conf`` file the refererence to ``log-default.json`` and the remote syslog server (ELK) ``10.1.20.11:5144``


**Open Kibana via firefox on the jumphost or via UDF access**

Steps:

   #. In UDF, find the ELK VM and click Access > ELK

      .. image:: ../pictures/lab2/ELK_access.png
         :align: center
         :scale: 50%

|

   #. In Kibana, click on ``Dashboard > Overview``

      .. image:: ../pictures/lab2/ELK_dashboard.png
         :align: center
         :scale: 50%

|

   #. At the bottom of the dashboard, you can see the logs. Select one of the log entries and check the content

.. note:: You may notice the log content is similar to F5 ASM and Adv. WAF

.. note:: The default time window in this Kibana dashboard is **Last 15 minutes**. If you do not see any requests, you may need to extend the time window to a larger setting. It can take a minute for logs to be processed into the graphs.

**Video of this lab (force HD 1080p in the video settings)**

.. raw:: html

    <div style="text-align: center; margin-bottom: 2em;">
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/kWfRBhrH8k8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
