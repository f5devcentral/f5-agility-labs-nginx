Tuning Buffers and Cache
########################

1) **Tune proxy_buffers in the NGINX Proxy**

Rather than initiating a subrequest to an upstream application server for each request received by the proxy, NGINX can buffer data in memory, serving it to the client without the need for a roundtrip to the backend. By default, this buffer is too small (8 buffers of 4k or 8k, depending on the system) to store our 1.5MB payload. Let's increase our buffer size and see how this impacts performance.

In NIM, edit nginx.conf.

Uncomment the proxy_buffers directive, line 39
`proxy_buffers 8 1638k;`

Publish changes

2) **Run a test and review performance**
Scale the number of users down to 100 with a Spawn Rate of 10/s
   
Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. note::  Where you do see the performance improvement? Requests per Second or Latency?

Cache is a hardware or software component that is embedded in application or device memory. It is used to temporarily store data needed by the user, reducing the time and effort required for retrieving data that is accessed repeatedly. NGINX can act as a caching servers, storing files from backends on disk.


3) **Turn on file caching in the Nginx proxy**

.. note:: How do you think caching could help the performance of delivering applications?  

In NIM, edit nginx.conf, and publish changes

|

Uncomment proxy_cache_path, line 37

.. image:: /class8/images/line35.png

|

Uncomment proxy_cache, line 73

.. image:: /class8/images/nim-proxy-cache.png

|
Publish changes

4) Confirm cache is operational 
   
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

5) **Run a test and review performance**
   
Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-500-50-30.png  
   :width: 200 px

.. note::  Where you do see the performance improvement in the Locust chart?
	
.. note:: Review NGINX Dashboard cache section.  How much bandwidth was saved from going to upstream server?
(For a hint, refer to the HINTS section at the bottom of this page.)


6) **Improve reading from disk performance**

Turn on the sendfile linux system call

.. note:: What does Sendfile do?
(For a hint, refer to the HINTS section at the bottom of this page.)

In NIM, edit nginx.conf

Uncomment "sendfile on", line 30

Publish the changes.

|

.. image:: /class8/images/nim-sendfile.png  

	
Run the same test again.

.. note:: Were there any performance gains seen?

|
7) **Improve network packet packaging**

In NIM, edit nginx.conf

Uncomment "tcp_nopush on", line 31

This will cause NGINX to send the first part of the file in the same packet as the response header to the client, further improving performance.

Publish the changes and re-run the test.

.. note:: Were there any performance gains seen?

8) **Turn on open file cache**

.. image:: /class8/images/nim-open-file-cache.png  

In NIM, edit nginx.conf and publish

Uncomment open_file_cache, line 36

   `open_file_cache max=4096`

Doing so enables NGINX to track open file descriptors, which can have a positive impact on performance.

.. note:: Do you notice any improvements?  

|

HINTS:

_3. Review NGINX Dashboard cache section. How much bandwidth was saved from going to upstream server?_
Look at the numbers in the Traffic section in the upper-right.

_4. What does Sendfile do?_
The Sendfile option improves performance when copying data from disk to NGINX process memory. When this option is enabled, the Linux system call of the same name (sendfile) is used to copiy data between a source and destination entirely within kernel space. This is more efficient than issuing a write, followed by a read, which transfers data through the user space.
See https://man7.org/linux/man-pages/man2/sendfile.2.html

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

   
