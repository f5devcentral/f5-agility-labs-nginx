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
.. image:: ../../_static/intro_topology.png
