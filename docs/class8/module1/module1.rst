Getting familiar with the Lab
#############################


The lab consists of multiple components: 

*   NGINX Proxy: A reverse proxy / load balancer on which we will be tuning the configuration to achieve better performance for the applications
*   App Server: The backend application server, serving up the content
*   Locust Worker: Generates the traffic load
*   Locust Controller: Manages the Locust Worker instance and provides a GUI interface for monitoring load 
*   NGINX Instance Manager: A web based application for managing NGINX instances. You will use this to update the NGINX Proxy's configuration file.

|
|

Here is a diagram of the components and how they connect together: 

.. image:: /class8/images/lab-diagram.jpg  
  :width: 800 px


The Locust load generation tool will be retrieving a 1.5MB file from the backend application server. 

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

  `view /etc/nginx/nginx.conf`

upstream app_servers config block includes

* zone backend 64k: Defines a shared memory zone allowing NGINX worker processes to synchronize information on the backend's run-time state. This enables us to display upstream statistics on the NGINX Plus dashboard.

server config block includes 

* status_zone my_proxy: Defines a shared memory zone allowing NGINX worker processes to collect and synchronize information on the status of the server. This enables us to monitor HTTP server statistics in the NGINX Plus dashboard.

.. image:: /class8/images/codeblock.png
  :width: 600 px
 
|
|

3) **Go to NGINX Proxy Dashboard and review**

|

Under ACCESS for the NGINX Proxy, select NGINX+ DASHBOARD

|

.. image:: /class8/images/nginx-web-shell.png
  :width: 600 px
  :align: center

|
|

Review the Dashboard and what is included under the tabs across the top of the page
	
.. image:: /class8/images/n-dashboard.png  

* HTTP Zones: this section contains the zone we defined in the proxy's server block. It tracks collective requests, responses, traffic and SSL statistics. Note that SSL statistics are missing because for simplicity, we do not use SSL for this lab.
* HTTP Upstreams: this sections contains statistics on the upstreams or backends that we defined in the proxy's upstream block. It tracks connections, requests, responses, health statistics and other information related to the proxy's connection to the application server.
* Workers: this section containers statistics that are specific to individual NGINX worker processes.
* Caches: this section is not yet visible. Later in the lab we will turn caching on and this section will display statistics related to the health of our proxy's cache.

|
|

4) **Start up Locust controller software**
   
Log on to the Locust Controller cli or WEB SHELL

Review the Locust configuration files

   `cat /home/ubuntu/run_locust_controller.sh`

   `cat /home/ubuntu/locustfile.py`

Notice that the Locust load script is configured to get a file called "1.5MB.txt", effectively putting load on the proxy.

Now start up the Locust controller and web interface.

   `/home/ubuntu/run_locust_controller.sh`

|
|

5) **Access the Locust Controller Web Interface**

Under Locust Controller ACCESS click on LOCUST to bring up the Web Interface

.. image:: /class8/images/locus-gui.png  

|
|

6) **On Locust Worker node**
   
Log on to the Locust Worker cli or WEB SHELL

|

.. image:: /class8/images/locust-controller-gui.png

|

Verify 8-core machine, run this command to verify CPUs and their associated statistics

   `mpstat -P ALL`  
  
.. image:: /class8/images/locus-cpu.png  

|

Start up locust workers by running this command:

   `/home/ubuntu/start_locust_workers.sh`

|
This script with start all 8 workers (1 per CPU) in NOHUP mode, meaning you can close the shell window and they'll keep running. However, it's best to keep this window open to monitor the workers, which will log their output to nohup.out.

Tail the nohup.out file to monitor Locust workers
  `tail -f /home/ubuntu/nohup.out`

Sometimes, overloading Locust may cause worker threads to quit. We've tuned this lab so that shouldn't happen, but if it does, you'll want to terminate the workers and restart them. You can use the previously shown script to restart the workers. To terminate them, we've included the following script:
  `/home/ubuntu/terminate_locust_workers.sh`
|

7) **In Locust GUI, start the load generation**
Let's begin with a basic test to get a performance baseline with our default settings. 
   
Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-10-100-30.png  

|

Click the 'Start swarming' button

|
|


8) **Review graphs as they are generated**
   
.. note:: What is happening with Total Request per Second and Response Time graphs 
	
Click the Charts tab to review graphs as they are generated

|
|

9) **Run same test again**

Run the same test a 2nd time by clicking 'New test' at the top-right under 'Status STOPPED'. Keep the settings the same as before and click the 'Start swarming' button.

|

.. image:: /class8/images/locus-new-test.png 

Review NGINX Proxy CPUs while test is running.  Back on NGINX Proxy WEB SHELL: 

  `mpstat -P ALL 1`

.. note:: How much CPU is being used?  Is the system fully saturated? 
	

Review Locust GUI Charts

.. note:: Even when all test parameters are the same, tests will exhibit different results due to a multitude of external factors influencing system and network resources.
|
|

10) **Run another test but this time with more load**

Number of Users: 500

Spawn rate: 50

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-50-500-30.png  
   :width: 200 px

Review NGINX Proxy CPUs and the Locust GUI Charts

|

.. note::  How much CPU is being used?  Is the system fully saturated? How was Total Request per Second affected by this additional load
	
|
|

11) **Run same test again and review NGINX Dashboard**
 
How many Active connections?

In HTTP Zones, review total requests and responses



.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

