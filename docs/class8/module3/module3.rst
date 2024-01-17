High Volume Testing, Identiying Break Points
############################################

Now it is time to generate high volume of traffic and see where the breaking points are

|
|

1) **Run Locus test with high volume of Users**
   
Number of Users: 2000

Spawn rate: 200

Host: http://10.1.1.9/

Advanced Options, Run time: 30s

.. image:: /class1/images/locus-2000-200-30.png  
   :width: 200 px
	
Review Locus Charts

.. note::  Any changes to the graphs?  Were there any failures?
	
If seeing failures, review the Failures tab on the top row

|
|

2) **Review the logs on NGINX Proxy cli for failure reasons**
   
  `sudo grep crit /var/log/nginx/error.log`

.. note :: What problem is identified in the nginx error logs?

|
|

3) **Fix the currenty problem by increaing the rlimit** 

In the NIM Console, edit nginx.conf file and publish

Increase rlimit to 4096, by uncommenting line 4

* worker_rlimit_nofile 4096; 

.. image:: /class1/images/nim-rlimit-4096.png  

.. note: What does rlimit do?  

|
|

4) **Run the same test again**
   
Review Locus graphs

.. note::  Were there improvements and were there still failures?
	
|

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

