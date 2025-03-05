High Volume Testing, Identifying Break Points
#############################################

Now it's time to generate a high volume of traffic to identify the NGINX Proxy's breaking points.

1. **Run the Locust test with a high volume of Users**

Number of Users: 2000

Spawn rate: 200

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-2000-200-30.png
   :width: 200 px

Review the Locust result charts

.. note:: Did you notice any changes to the graphs?  Were there any failures?

If you're seeing failures, review the Failures tab at the top of the Locust web interface.

2. **Review the logs on NGINX Proxy's command line interface for failure reasons**

.. code:: shell

  sudo grep crit /var/log/nginx/error.log

.. note:: What problem is identified in the NGINX Proxy's error logs?

3. **Fix the problem by increasing the rlimit**
This changes the limit on the number of open files that a worker process may have

In NGINX Instance Manager, edit the nginx.conf file.

Increase rlimit to 4096, by uncommenting line 4

* worker_rlimit_nofile 4096;

Increase worker_connections from 1024 to 4096

* worker_connections 4096; (line 11 or 12)

Publish the new configuration.

.. image:: /class8/images/nim-rlimit-4096.png

4. **Run the same test again**

Review the resulting Locust graphs

.. note:: Were there improvements and were there still failures?

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

