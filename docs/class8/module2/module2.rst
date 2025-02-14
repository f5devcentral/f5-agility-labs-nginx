Start Your Tuning
#################

In this section we will be tuning various NGINX configuration parameters and reviewing performance test results. We will be using NGINX Instance Manager (NIM) to make configuration changes and then pushing those changes to the NGINX Proxy.

1. **Log in to NGINX Instance Manager**

In the UDF console, find the NGINX Instance Manager system, click the ACCESS link and select NIM WEB GUI. Log in with the following credentials:

username: admin

pass: NIM123!@#

.. image:: /class8/images/nim-login.png

2. **Modify nginx.conf parameters**

Click on Instances in the left column and then the ellipsis on the far right of the NGINX-Plus-Proxy instance. Next, click Edit Config.

.. image:: /class8/images/nim-edit-button.png

Now you can edit the NGINX Proxy's configuration file through this NIM interface

.. image:: /class8/images/nim-nginx-conf.png

Find the line (lines 2 and 3) containing the worker_processes directive. When set to "auto" NGINX will spawn worker processes to match the number of CPU cores on the system. This system is configured with 2 CPU cores, so in this case, NGINX will spawn 2 worker processes.

Let's change the value from auto to 1, reducing the number of worker processes in half. Hit the publish button in the upper right to push the changes to the NGINX Proxy.

.. tip:: In many cases, you will find commented out versions of NGINX directives that are already configured with the values being asked by this lab. Feel free to uncomment them, taking care to comment out the analogous existing directives, rather than changing them directly.

.. image:: /class8/images/nim-processes-1.png

Now let's run another test and review the Locust Charts.

.. image:: /class8/images/locus-10-100-30.png
  :width: 200 px

.. note:: Did you observe any differences in Requests per Second, Response times or other stats from the previous test?

3. **Make another change to the nginx.conf, publish and test again**

Find and change worker_connections to a value of 16 from 1024 (lines 11 and 12)

.. image:: /class8/images/nim-worker-1.png

After making the changes, publish the configuration and run the test again with the same values.

.. note:: How did the performance change and what does worker_connections do?

4. **Revert changes to original settings and publish**

worker_processes auto; (lines 2 and 3)

worker_connections 1024; (lines 11 and 12)

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:
