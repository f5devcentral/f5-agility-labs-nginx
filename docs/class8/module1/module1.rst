Getting familiar with the LAB
#############################


The lab consists of multiple components: 

*   NGINX Gateway Proxy, this is what we will be performance tuning
*   NGINX API Server, the backend serving up the content
*   Locus Worker, generates the traffic load
*   Locus controller, GUI Interface to manager the load generater 
*   NGINX Instance Manager, GUI GINX Central Manager

|
|

Here is a picutre of the components and how they connect together: 

.. image:: /class8/images/lab-diagram.jpg  
  :width: 800 px


The Locus load generation tool will be retrieving a 1.5MB file from the backend application server. 

Review the Environment

|
|

1) **Log in to NGINX Proxy**
   
Click on ACCESS and then WEB SHELL

.. image:: /class8/images/nginx-web-shell.png
  :width: 600 px
  :align: center

|
|

2) **Review the nginx.conf file and some of the parameters already set**

  `vi /etc/nginx/nginx.conf`

proxy_max_temp_file_size 0;  This disable the temporary buffer as the 1.5M response doesn't fit and would logs warning

Nginx Dashboard configuration

upstream app_servers config block includes

* zone backend 64k

server config block includes 

* status_zone my_proxy;

|
|

3) **Go to NGINX Proxy Dashboard and review**

.. image:: /class8/images/nginx-web-shell.png
  :width: 600 px
  :align: center

|

Review the Dashboard and what is included under the tabs across the top of the page
	
.. image:: /class8/images/n-dashboard.png  

|
|

4) **Start up Locus controller software**
   
Log on to the Locus Controller cli or WEB SHELL

Review the Locus configuraiton Failures

   `cat /home/ubuntu/run_locust_controller.sh`

   `cat /home/ubuntu/locusfile.py`

Now start up the Locus controller GUI 

   `/home/ubuntu/run_locust_controller.sh`

|
|

5) **Sign on to Locus Controller GUI**

Under Locus Controller ACCESS click on LOCUS to bring up the GUI

.. image:: /class8/images/locus-gui.png  

|
|

6) **On Locus Worker node**
   
Log on to the Locus Worker cli or WEB SHELL

Verify 8-core machine, run this command to verify CPUs

   `mpstat -P ALL`  
  
.. image:: /class8/images/locus-cpu.png  

|

Start up 8 locus workers by running this command 8 times

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

   `/home/ubuntu/run_locus_worker.sh 10.1.1.6`

|
|

7) **In Locus GUI, start the load generation**
   
Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-10-100-30.png  


|
|

8) **Review graphs as they generater**
   
.. note:: What is happening with Total Request per Second and Response Time graphs 
	
Click on Workers tab on top list, ensure there are 8 worker running 

|
|

9) **Run same test a 2nd time**

.. image:: /class8/images/locus-new-test.png 

Review NGINX Proxy CPUs while test is running.  Back on NGINX Proxy WEB SHELL: 

  `mpstat -P ALL 1`

.. note:: How much CPU is being used?  Is the system fully saturated? 
	

Review Locust GUI Charts

|
|

10) **Run another test but this time with more load**

Number of Users: 500

Spawn rate: 50

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-50-500-30.png  
   :width: 200 px

Review NGINX Proxy CPUs
Review Locus GUI Charts
	
.. note::  How much CPU is being used?  Is the system fully saturated? How was Total Request per Second affected by this addtional load
	
|
|

11) **Run same test again and review NGINX Dashboard**
 
How many Active connections?

In HTTP Zones, review total requests and responses



.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

