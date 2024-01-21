Start your Tuning
#################

In this section we will be tuning some NGINX configuration parameters and reviewing the results.
We will be using NGINX Instance Manager to make configuraiton changes and then pushing those changes to the NGINX Proxy. 

|
|

1) **Log in to NGINX Instance Manager**

Go to NGINX Intsance Manager --> ACCESS --> NIM WEB GUI

username: admin

pass: NIM123!@#

.. image:: /class8/images/nim-login.png

|

.. image:: /class8/images/nim-button.png

|
|


2) **Modify nginx.conf parameters**
   
.. image:: /class8/images/nim-edit-button.png

Click on Instances in the left column and then the ellipsis on the far right of the NGINX-Plus instance, and then Edit Config 

|
|

Now you can edit the Nginx configuration file through this NIM interface

.. image:: /class8/images/nim-nginx-conf.png

|
|

Find the line (3) that has worker_processes.

Change the value from auto to 1

.. image:: /class8/images/nim-processes-1.png

.. note:: What does 'auto' do for worker_processes?

|
|

.. image:: /class8/images/nim-publish.png

Hit the publish button in the upper right to push the changes out to the NGINX Proxy

|
|

Now run another test and review the Locust Charts  

.. image:: /class8/images/locus-10-100-30.png
  :width: 200 px

.. note:: Are there any differences in Requests per Second, Response times or other stats?
	
|
|

3) **Make another change to the nginx.conf, publish and test again**
 	
Find and change worker_connections to a value of 1 from 4096.  Line 11.

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
