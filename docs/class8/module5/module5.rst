Additional Tuning Parameters and Best Practices
###############################################

This section list some additional tuning parameters, these are good to understand and may make a difference depending on your use case.

|
|

1) **Optimize the Access Log**

Writing to disk can be expensive and time consuming, there is an ability to buffer the logs and only write to disk after a certain amount 

Review this line in nginx.conf file

* access_log /var/log/nginx/access.log main buffer=128;

|
|

1) **Review and set rate limits**  
   
Review this line in nginx.conf file
	
* limit_req_zone $binary_remote_addr zone=addr:10m rate=1000r/s;

|
|

1) **Review gzip compression**

* gzip  on;

|
|

4) **Review keepalive parameters**

* keepalive_timeout  65;
* keepalive_requests 10000;
* upstream block, keepalive 512;

|
|

Thank you!! Hope you enjoyed this lab!!

|

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

