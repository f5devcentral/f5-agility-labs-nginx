Introduction
============

This lab will familiarize you with NGINX AppProtect Denial of Service (NAP DoS), a module that protects HTTP and gRPC apps fronted by NGINX Plus against Denial of Service attacks.

You will accomplish a few things as part of this lab:

#. Attack and take down an unprotected application
#. Install and enable NAP DoS 
#. Teach NAP DoS about legitimate traffic to establish baseline
#. Protect HTTP services from Flood and Slow Loris attacks
#. Protect gRPC services from Flood and Slow Loris attacks
#. Observe and monitor attacks from NAP DoS metrics pulled into an ELK Stack (Elastic Search, Logstash, Kibana)
#. Monitor live activity with the built-in NAP DoS Dashboard

Lab Topology
============

Clients
    - Legitimate Traffic -- Contains scripts to act as legitimate client traffic -- 10.1.1.10
    - Attacker -- Contains scripts for DoS attacks to act as bad actor client traffic -- 10.1.1.11
Load Balancers
    - NGINX LB -- L4 edge load balancer that distributes traffic between two NAP DoS instances and appropriate internal ports -- 10.1.1.4
    - NAP DoS 1 -- first L7 load balancer that maps internal ports to backend services -- 10.1.1.6
    - NAP DoS 2 -- second L7 load balancer that maps internal ports to backend services -- 10.1.1.7
    - Arbitrator --  Orchestrates multiple NAP DoS instances to sync attack starts and stops -- 10.1.1.12
Backends
    - JuiceShop -- Sample eCommerce site to serve as a generic backend application -- 10.1.1.13
    - gRPC Application -- "RouteGuide" gRPC service running in a container environment -- 10.1.1.9
Monitoring
    - ELK -- containerized ELK stack pre-configured to monitor NAP DoS instances -- 10.1.1.3
.. image:: ../_static/intro_topology.png

Attack Scripts
============

HTTP/1 Flood Attack
    - A type of DoS attack in which the attacker manipulates HTTP and sends unwanted requests in order to attack a web server or application.
    - Instead of using malformed packets, spoofing and reflection techniques, HTTP floods require less bandwidth to attack the targeted servers.
    - ab -l -r -n 20000000 -c 10000 -d -s 120 http://10.1.1.4:600/ 
    - This attack uses Apache Benchmark (ab) to send 20 million requests with 10k concurrent connections w/ 120 second timeout looped indefinitely.
    
Slow POST HTTP Attack
    - A type of attack that relies on the fact that the HTTP protocol, by design, requires requests to be completely received by the server before they are processed.
    - If an HTTP request is not complete, or if the transfer rate is very low, the server’s resources are kept busy waiting for the rest of the data. If too many resources are exhausted, this causes a denial of service.
    - slowhttptest -c 50000 -B -g -o my_body_stats -l 600 -i 5 -r 1000 -s 8192 -u http://10.1.1.4:600/api/Feedbacks/ -x 10 -p 3
    - 50k connections with 5 second delay in message body for 600 seconds, 1k connections per second, 8192 byte Content-Length header, 10 byte follow-up data, 3 second timeout for HTTP response on probe connection.  Sends delayed POST request in message body to /api/Feedbacks/ endpoint on JuiceShop service.
    
HTTP/2 Flood Attack
    - Like the HTTP 1 Flood Attack, but this uses the HTTP2 protocol.
    - h2load -n 10000 -c 1000 http://10.1.1.4:500/routeguide.RouteGuide/GetFeature
    - Use h2load to launch an attack using 10000 requests with 1000 clients on the “RouteGuide” GRPC service”.

gRPC Message Flood Attack
    - Increasingly, we have seen more DoS attacks using HTTP and HTTP/2 requests or API calls to attack at the application layer (Layer 7), in large part because Layer 7 attacks can bypass traditional defenses that are not designed to defend modern application architectures.
    - Detecting DoS attacks on gRPC applications is extremely hard, especially in modern environments where scaling out is performed automatically. A gRPC service may not be designed to handle high‑volume traffic which makes it an easy target for attackers to take down.
    - Based on statistical anomaly detection, NGINX App Protect DoS successfully identifies bad actors by source IP address and TLS fingerprints, enabling it to generate and deploy dynamic signatures that automatically identify and mitigate these specific patterns of attack traffic. This approach is unlike traditional DoS solutions on the market that detect when a volumetric threshold is exceeded. 
    - ghz --insecure -c 10000  -n 100000 -t 2s -z 2s --import-paths ./routeguide --proto route_guide.proto --call routeguide.RouteGuide.GetFeature 10.1.1.4:500
    - Launch the ghz gRPC benchmarking tool against the “RouteGuide” GRPC service using 10000 request workers with 100000 requests, with a timeout and duration of 2 seconds.

Slow POST gRPC Attack
    - The attacker supplies several concurrent slow POST gRPC requests that exceed the server capacity of concurrent requests.
    - python slow_post.py  > /dev/null 2>&1 &
    - This attack sends 100 streams of a POST request to /testing using gRPC



    
    




    


    
    
