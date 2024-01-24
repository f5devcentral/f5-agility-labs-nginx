Tuning the Cache
################

|

Cache is a hardware or software component that is embedded in application or device memory. It is used to temporarily store data needed by the user, reducing the time and effort required for retrieving data that is accessed repeatedly.

|
|

1) **Turn on file caching in the Nginx proxy**

.. note:: How would caching help the performance of delivering applications?  

In NIM, edit nginx.conf, and publish changes

|

Uncomment proxy_cache_path, line 35

.. image:: /class8/images/line35.png

|

Uncomment proxy_cache, line 72

.. image:: /class8/images/nim-proxy-cache.png

|
|

2) Confirm cache is operational 
   
On NGINX Proxy cli

   `ps aux | grep nginx`

.. note:: Are there any new processes running? Look for cache manager and loader processes

|
|

.. image:: /class8/images/cacheprocess.png

|

Now review the NGINX Dashboard GUI, you should now see a Cache section 

|
|

3) **Run a test and review performance**
   
Number of Users: 500

Spawn rate: 50

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-500-50-30.png  
   :width: 200 px

.. note::  Where you do see the performance improvement?

XXXXXXXXXXXX NEED HINT FOR THIS. Do they simply take the value for “Served” in the Traffic section of the NGINX Dashboard or should they be looking at something else?
	
Review NGINX Dashboard cache section.  How much bandwidth was saved from going to upstream server?

|
|

4) **Improve reading from disk performance**

Turn on Sendfile linux system call

.. note:: What does Sendfile do?

XXXXXXXXXXXXXX NEED INFO ON WHAT SENDFILE DOES

In NIM, edit nginx.conf and publish 

Comment out "sendfile off", line 28

Uncomment "sendfile on", line 29 

|

.. image:: /class8/images/nim-sendfile.png  

	
Run the same test again.

.. note:: Were there any performance gains seen?

|
|

5) **Turn on open file cache**

.. image:: /class8/images/nim-open-file-cache.png  

In NIM, edit nginx.conf and publish

Uncomment open_file_cache, line 36

   `open_file_cache max=4096`

|

.. note:: Do you notice any improvements?  

XXXXXXXXXXXXXX  NEED HINT ON WHAT TO EXPECT

|

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

   
