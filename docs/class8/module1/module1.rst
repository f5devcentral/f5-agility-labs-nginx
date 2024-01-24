Getting familiar with the LAB
#############################


The lab consists of multiple components: 

*   NGINX Gateway Proxy, Reverse Proxy / Load balancer which we will be tuning the configuration to achieve better performance for the applications
*   NGINX API Server, the backend serving up the content
*   Locust Worker, generates the traffic load
*   Locust controller, GUI Interface to manager the load generater 
*   NGINX Instance Manager, NGINX Central Manager

|
|

Here is a picutre of the components and how they connect together: 

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

proxy_max_temp_file_size 0;  Disables buffering of responses to temporary files

|

upstream app_servers config block includes

* zone backend 64k

server config block includes 

* status_zone my_proxy;

.. image:: /class8/images/codeblock.png
  :width: 600 px
 
|

WHAT DO THESE ACTUALLY DO - JUST CHECKING CONFIG IS FINE BUT CUSTOMERS WOULD WANT TO KNOW WHY

|
|

3) **Go to NGINX Proxy Dashboard and review**

|

Under ACCESS for the NGINX Proxy, select NGINX+DASHBOARD

|

.. image:: /class8/images/nginx-web-shell.png
  :width: 600 px
  :align: center

|
|

Review the Dashboard and what is included under the tabs across the top of the page
	
.. image:: /class8/images/n-dashboard.png  

|

We need to probably say something about the useful info provided in the dashboard. To click through different sections, how it can be used , what to decipher from it etc.

|
|

4) **Start up Locust controller software**
   
Log on to the Locust Controller cli or WEB SHELL

Review the Locust configuraiton files

   `cat /home/ubuntu/run_locust_controller.sh`

   `cat /home/ubuntu/locustfile.py`

Now start up the Locust controller GUI 

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

Verify 8-core machine, run this command to verify CPUs

   `mpstat -P ALL`  
  
.. image:: /class8/images/locus-cpu.png  

|

Start up locust workers by running this command:

   `/home/ubuntu/start_locust_workers.sh`

|
|

7) **In Locust GUI, start the load generation**
   
Number of Users: 100

Spawn rate: 10

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class8/images/locus-10-100-30.png  

|

Click the 'Start swarming' button

|
|

8) **Review graphs as they generater**
   
.. note:: What is happening with Total Request per Second and Response Time graphs 
	
Click the Charts tab to review graphs as they are generated

|
|

9) **Run same test again**

Run same test a 2nd time by clicking 'New test' at the top-right under 'Status STOPPED'. Keep the settings the same as before and click the 'Start swarming' button.

|

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

Review NGINX Proxy CPUs and the Locus GUI Charts

|

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

