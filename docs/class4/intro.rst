Introduction
============

The purpose of this Lab is to introduce NGINX Instance Manager. NGINX 
Instance Manager is designed to make NGINX even easier to configure,
use and maintain.  We designed it from the ground up to be in line with
the experience you expect from NGINX (small, lightweight, fast).  NGINX
Instance Manager is our latest product offerring and the lab is designed
to showcase how to get started with it and what it can do.

NGINX Instance Manager is focused on using existing NGINX instances and 
the concepts in this lab can be applied to production environments.

Background
==========

`NGINX <https://nginx.org/en>`__ and `NGINX 
Plus <https://www.nginx.com/products/nginx>`__ itself uses a native 
configuration lanugage ("NCL") that leverages the linux flat file 
and directory structure.  A main `nginx.conf` file will have 
multiple includes that typically will be in directories.  This allows 
shared configurations and isolation for individual instances. NGINX 
can also be deployed on many different form factors and integrates 
well into CI/CD pipelines.

NGINX has become a very popular application and is the most used web server 
on the internet today. NGINX Instance Manager extends the existing 
functionality of NGINX by adding an API, metrics and Analyzer functionality. 
It is a native NGINX management solution.
 
NGINX Instance Manager is NGINX centric and the same skills and terms you 
use for NGINX are applied to NGINX Instance Manager.

Overview
========

This Lab guide will help you complete the following:

1. Utilize the scanner function in NGINX Instance Manager to discover new instances.

2. Deploy the nginx-agent to existing NGINX instances.

3. Manage configurations of NGINX instances and utilize NGINX Analyzer for suggestions.

4. Explore the metrics of NGINX instances.

5. Explore the API of NGINX Instance Manager.

Getting Started
---------------

The infrastructure is already setup for you.

The **nginx-manager** is the instance that provides the NGINX Instance Manager 
API, metrics endpoint and user interface to use.  It also functions as the 
reciever for the nginx-agent component on the NGINX instances.
**Run all lab activities from the nginx-manager unless specified**

Lab Topology 
----------------------------

The NGINX machines are there to provide a cross section of installation 
options.

NGINX Instances:

+--------------+----------------------+--------------+-------------+
| **Instance** | **IP Address**       | **OS**       | **NGINX**   |
+--------------+----------------------+--------------+-------------+
| NGINX Plus   | 10.1.1.5             | Ubuntu 20.04 | Plus        |
+--------------+----------------------+--------------+-------------+
| NGINX OSS    | 10.1.1.7             | Centos 7     | Open Source |
+--------------+----------------------+--------------+-------------+
| NGINX OSS 2  | 10.1.1.8             | Centos 7     | Open Source |
+--------------+----------------------+--------------+-------------+
| NGINX Plus 3 | 10.1.1.9             | Ubuntu 20.04 | Plus        |
+--------------+----------------------+--------------+-------------+
