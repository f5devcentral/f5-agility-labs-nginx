Tuning Buffers and Cache
########################
NGINX's traffic buffering and content caching features can have significant impact on system response time. Let's see how we can tune them to improve our application's performance.

1. **Tune proxy_buffers in the NGINX Proxy**

Rather than initiating a sub-request to an upstream application server for each request received by the proxy, NGINX can buffer data in memory, serving it to the client without the need for a roundtrip to the backend. By default, this buffer is too small (8 buffers of 4k or 8k, depending on the system) to store our 1.5MB payload. Let's increase our buffer size and see how this impacts performance.

In NIM, edit nginx.conf.

Uncomment the proxy_buffers directive, line 39
`proxy_buffers 8 1638k;`

.. image:: /class8/images/nim-proxy-buffers.png

Publish changes

2. **Run a test and review performance**
Scale the number of users down to 100 with a Spawn Rate of 10/s

Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. note:: Where you do see the performance improvement? Requests per Second or Latency?

3. **Turn on file caching in the Nginx proxy**
A cache is a hardware or software component embedded in application or device memory. It is used to temporarily store data needed by the user, reducing the time and effort required for retrieving data that is accessed frequently. NGINX can act as a caching server, storing files from backends on disk, thus eliminating the need for a sub-request to an upstream.

.. note:: How do you think caching could help the performance of delivering applications?

In NIM, edit nginx.conf, and publish changes

Uncomment proxy_cache_path, line 37

.. image:: /class8/images/nim-proxy-cache-path.png

Uncomment proxy_cache, line 56

.. image:: /class8/images/nim-proxy-cache.png

Publish changes

4. Confirm cache is operational

On NGINX Proxy cli

   `ps aux | grep nginx`

.. note:: Are there any new processes running? Look for cache manager and loader processes

.. image:: /class8/images/cacheprocess.png

Now review the NGINX Dashboard GUI, you should now see a Cache section

5. **Run a test and review performance**

Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-500-50-30.png
   :width: 200 px

.. note:: Where you do see the performance improvement in the Locust chart?

.. note:: Review NGINX Dashboard cache section.  How much bandwidth was saved from going to upstream server? (For a hint, refer to the HINTS section at the bottom of this page.)

6. **Improve reading from disk performance**

Turn on sendfile to take advantage of the linux system call with the same name.

In NGINX Instance Manager, edit nginx.conf

Uncomment "sendfile on", line 30

Publish the changes.

.. note:: What does sendfile do? (For a hint, refer to the HINTS section at the bottom of this page.)

.. image:: /class8/images/nim-sendfile.png

Run the same test again.

.. note:: Did you notice any performance?

7. **Improve network packet packaging**

In NIM, edit nginx.conf

Uncomment "tcp_nopush on", line 31

This will cause NGINX to send the first part of the file in the same packet as the response header to the client, further improving performance.

Publish the changes and re-run the test.

.. note:: Did you notice any performance gains?

8. **Turn on open file cache**

In NIM, edit nginx.conf

Uncomment open_file_cache (line 38). Doing so enables NGINX to track open file descriptors, which can have a positive impact on performance.

.. image:: /class8/images/nim-open-file-cache.png

.. note:: Did you notice any improvements?

.. hint::
   Step 3. Review NGINX Dashboard cache section. How much bandwidth was saved from going to upstream server?_
   Look at the numbers in the Traffic section in the upper-right.

   Step 4. What does sendfile do?_
   The sendfile option improves performance when copying data from disk to NGINX process memory. When this option is enabled, the Linux system call of the same name (sendfile) is used to copiy data between a source and destination entirely within kernel space. This is more efficient than issuing a write, followed by a read, which transfers data through the user space.
   See https://man7.org/linux/man-pages/man2/sendfile.2.html

   Step 5. Do you notice any improvements?_
   If the performance improvement isn't immediate obvious, look at both the 50th percentile and 95th percentile curves. What do these values represent?

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:
