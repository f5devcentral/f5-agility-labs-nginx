NGINX App Protect DoS
=====================

The remainder of this lab will familiarize you with Denial of Service attacks and help you protect HTTP and gRPC services against them using NGINX App Protect Denial of Service.

You will accomplish the following as part of this lab:

#. Attack and take down an unprotected HTTP Service
#. Install and configure NGINX App Protect DoS 
#. Teach NGINX App Protect DoS about legitimate traffic to establish baseline
#. Protect HTTP services from Flood and Slow Loris attacks
#. Protect gRPC services from Flood and Slow Loris attacks
#. Observe and monitor attacks from NAP DoS metrics pulled into an ELK Stack (Elastic Search, Logstash, Kibana)
#. Monitor live activity with the built-in NGINX App Protect DoS Dashboard

Topology
========

The remainder of this lab will use VMs in your existing deployment that we have not interacted with so far. They are:

Clients
    - Legitimate Traffic Generator -- Contains scripts to act as legitimate client traffic -- 10.1.1.11
    - Attack Traffic Generator -- Contains scripts for DoS attacks to act as bad actor client traffic -- 10.1.1.16
Load Balancers
    - NGINX LB -- L4 edge load balancer that distributes traffic between two NGINX App Protect DoS instances and appropriate internal ports -- 10.1.1.17
    - NAP DoS 1 -- first L7 load balancer that maps internal ports to backend services -- 10.1.1.15
    - NAP DoS 2 -- second L7 load balancer that maps internal ports to backend services -- 10.1.1.14
    - Arbitrator --  Orchestrates multiple NGINX App Protect DoS instances to sync attack starts and stops -- 10.1.1.13
Backends
    - JuiceShop -- Sample eCommerce site to serve as a generic backend application -- 10.1.1.19
    - gRPC Application -- "RouteGuide" gRPC service running in a container environment -- 10.1.1.18
Monitoring
    - ELK -- containerized ELK stack pre-configured to monitor NGINX App Protect DoS instances -- 10.1.1.20

Attack Scripts
==============
All attack scripts are located in ``/scripts`` folder on the "Attack Traffic Generator" VM.

HTTP/1 Flood Attack -- ``/scripts/http1flood.sh``
    - A type of DoS attack in which the attacker manipulates HTTP and sends unwanted requests in order to attack a web server or application.
    - Instead of using malformed packets, spoofing and reflection techniques, HTTP floods require less bandwidth to attack the targeted servers.
    - Typically will target the most resource intensive endpoints on the service.  
    - ``ab -l -r -n 20000000 -c 10000 -d -s 120 http://10.1.1.17:600/`` 
    - This attack uses Apache Benchmark (ab) to send 20 million requests with 10k concurrent connections w/ 120 second timeout looped indefinitely.
    
Slow POST HTTP Attack (Slow Loris) -- ``/scripts/slow_post_http1.sh``
    - A type of attack that relies on the fact that the HTTP protocol, by design, requires requests to be completely received by the server before they are processed.
    - Sends a legitimate POST header with a ``Content-Length`` header specifying the size of the message body.
    - Attacker sends the actual message body at a slow rate or not at all.
    - Attacker then opens thousands of such connections exhausting the logical resources for concurrent connections rather than bandwidth or processing power, allowing the attacker to efficently take out a web server.
    - ``slowhttptest -c 50000 -B -g -o my_body_stats -l 600 -i 5 -r 1000 -s 8192 -u http://10.1.1.17:600/api/Feedbacks/ -x 10 -p 3``
    - 50k connections with 5 second delay in message body for 600 seconds, 1k connections per second, 8192 byte Content-Length header, 10 byte follow-up data, 3 second timeout for HTTP response on probe connection.  Sends delayed POST request in message body to /api/Feedbacks/ endpoint on JuiceShop service.
    
HTTP/2 Flood Attack -- ``/scripts/http2flood.sh``
    - Like the HTTP 1 Flood Attack, but this uses the HTTP/2 protocol.
    - gRPC uses HTTP/2 under the hood so we are targeting the gRPC endpoint with a simple HTTP/2 flood attack.
    - ``h2load -n 10000 -c 1000 http://10.1.1.17:500/routeguide.RouteGuide/GetFeature``
    - Uses h2load to launch an attack using 10000 requests with 1000 clients on the "RouteGuide" gRPC service.
