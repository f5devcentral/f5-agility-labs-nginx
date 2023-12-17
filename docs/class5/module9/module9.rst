Module 9 - Protecting HTTP and gRPC Services from Application Layer DoS Attacks
###############################################################################

Launch HTTP Flood Attack
========================

We will be initiating a HTTP Flood Attack on the Juice Shop web site using Apache Benchmark.

1. Open WebShell to the 'Attacker VM' (UDF > Components > Systems > Attacker > Access > Web Shell)
2. Launch L7 DOS attacks.

   ``cd /scripts``
   
   ``./http1flood.sh``

You will notice that a good traffic script reports that service is unavailable

Output:
     
   ``JUICESHOP HTTP Code:000``
   
   ``JUICESHOP HTTP Code:000``
   
   ``JUICESHOP HTTP Code:000``

Go to "ELK" VM, navigate to "Access" and select "KIBANA" (UDF > Components > Systems > elk > Access > Kibana)

.. image:: access-kibana.jpg

Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link to verify NGINX App Protect DoS mitigation.

.. image:: access-dashboard1.jpg

After success mitigation service is available and reports

Output:
      
   ``JUICESHOP HTTP Code:200``
   
   ``JUICESHOP HTTP Code:200``
   
   ``JUICESHOP HTTP Code:200``

Stop the attack. Use Ctrl+C.

**Wait for the vertical black line in the ELK Dashboards** before running the next attack script.

Perform Slow HTTP Attack with slowhttptest tool
===============================================

Slow HTTP attacks rely on the fact that the HTTP protocol, by design, requires requests to be completely received by the server before they
are processed.

If an HTTP request is not complete, or if the transfer rate is very low, the server keeps its resources busy waiting for the rest of the data.

If the server keeps too many resources busy, this creates a denial of service.

We will demonstrate a Slow POST attack using slowhttptest tool.

Slow POST attack: Slowing down the HTTP message body, making the server wait until all content arrives according to the Content-Length header; or until the final CRLF arrives.

1. Open WebShell into "Attack Traffic Generator (10.1.1.16)" VM (UDF > Components > Systems > Attacker > Access > WebShell)

2. Launch Slow POST Attack
!!!!!Make sure previous attack ended before launching Attack (**Wait for the vertical black line in ELK graphs**)
   
   ``cd /scripts``
   
   ``./slow_post_http1.sh``

Wait 2 mins until tool established 10k connection.

You will notice that a good traffic script reports that service is unavailable 
   
Output:
     
  ``JUICESHOP HTTP Code:000``
  
  ``JUICESHOP HTTP Code:000``
  
  ``JUICESHOP HTTP Code:000``

After success mitigation service is available and reports
   
Output:
       
  JUICESHOP HTTP Code:200
  JUICESHOP HTTP Code:200
  JUICESHOP HTTP Code:200\::

Slowhttptest will report that NGINX App Protect DoS is closing the connection: slow HTTP test status on 165th second:

   initializing: 0
   pending: 1
   connected: 2
   error: 0
   closed: 14225
   service available: YES\::

Go to "ELK" VM, navigate to "Access" and select "KIBANA"

.. image:: access-kibana.jpg

Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link to verify NGINX App Protect DoS mitigation.

.. image:: access-dashboard1.jpg

Stop the attack. Use Ctrl+C.

**Wait for the vertical black line in the ELK Dashboards** before running the next attack script.

Launch HTTP/2 Flood attack on gRPC service
==========================================
   
We will be initiating a HTTP/2 Flood Attack on the "RouteGuide GRPC service" using h2load.

1. SSH (WebShell) into "Attack Traffic Generator (10.1.1.16)" VM.
2. Launch HTTP/2 Flood Attack.

!!!!!Make sure previous attack ended before launching Attack

  cd /scripts/
     
  ./http2flood.sh

You will notice that a good traffic script reports that service is unavailable
   
Output:
   
  details = "Received http2 header with status: 502"
  debug_error_string = "{"created":"@1639496137.06on":"Received http2:status header with non-200 OK
  status","file":"src/core/ext/filters/http/client,"file_line":134,"grpc_message":"Received
  http2 header with status: 502","grpc_status":14,"value":"502"}"\::

After success mitigation service is available and reports
   
Output:
   
  Finished trip with 10 points
  
  Finished trip with 10 points
  
  Finished trip with 10 points\:\:

Go to "ELK" VM, navigate to "Access" and select "KIBANA"

.. image:: access-kibana.jpg

Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link to verify NGINX App Protect DoS mitigation.

.. image:: access-dashboard1.jpg

Stop the attack. Use Ctrl+C.

**Wait for the vertical black line in the ELK Dashboards** before running the next attack script.

Launch Message flood DoS by gRPC
================================

Attacker sends requests to heavy URLs
     
We will be initiating a Message flood DoS by gRPC on the "RouteGuide GRPC service" using ghz tool.

1. SSH (WebShell) into "Attack Traffic Generator (10.1.1.16)" VM.
2. Launch GRPC Flood Attack.

!!!!!Make sure previous attack ended before launching Attack 

  ``cd /scripts/``
  
  ``./grpcflood.sh``

You will notice that a good traffic script reports that service is unavailable

Output:

  details = "Received http2 header with status: 502"
  debug_error_string = "{"created":"@1639496137.06on":"Received http2 :status header with non-200 OK
  status","file":"src/core/ext/filters/http/client,"file_line":134,"grpc_message":"Received
  http2 header with status: 502","grpc_status":14,"value":"502"}"\:\:

After success mitigation service is available and reports

Output:

  Finished trip with 10 points
  
  Finished trip with 10 points
  
  Finished trip with 10 points\:\:

GHZ tool will report HTTP status code 403 which indicates traffic is blocked by NGINX App Protect DoS

  Error distribution:
  
    [9050] rpc error: code = Unavailable desc = the connection is draining
    
    [1000] rpc error: code = PermissionDenied desc = Forbidden: HTTP status code 403; transport: missing content-type field
    
    [150] rpc error: code = Unavailable desc = transport is closing\:\:

Go to "ELK" VM, navigate to "Access" and select "KIBANA"

.. image:: access-kibana.jpg

Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link to verify NGINX App Protect DoS mitigation.

.. image:: access-dashboard1.jpg

Stop the attack. Use Ctrl+C.

**Wait for the vertical black line in the ELK Dashboards** before running the next attack script.

Launch Slow gRPC POST
=====================
   
Attacker supplies a number of concurrent slow POST gRPC requests that exceeds the server capacity of concurrent requests.

1. SSH (WebShell) into "Attack Traffic Generator (10.1.1.16)" VM.
2. Launch Slow gRPC POST Attack.

!!!!!Make sure previous attack ended before launching Attack

  ``cd /scripts/``
  
  ``./slow_post_http2.sh``

Go to "ELK" VM, navigate to "Access" and select "KIBANA"

.. image:: access-kibana.jpg

Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link to verify NGINX App Protect DoS mitigation.

.. image:: access-dashboard1.jpg

Stop the attack. Use Ctrl+C.

**Wait for the vertical black line in the ELK Dashboards** which indicates the end of the attack.
