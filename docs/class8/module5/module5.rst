Additional Tuning Parameters and Best Practices
###############################################

This section list some additional tuning parameters. These are good to understand and will improve performance in certain use cases.

|
|

1) **Optimize the Access Log**

Writing to disk can be resource intensive. This setting allows you to buffer log output and only write to disk after collecting a specified amount of data.

Review this line in nginx.conf file

* access_log /var/log/nginx/access.log main buffer=128;

|
|

2) **Review and set rate limits**  
   
Review this line in the nginx.conf file
	
* limit_req_zone $binary_remote_addr zone=addr:10m rate=1000r/s;

|
|

3) **Review gzip compression**

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

