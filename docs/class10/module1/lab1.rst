Installing NGINX Plus
=====================

Introduction
------------

NGINX Plus is supported on Amazon Linux, CentOS, Debian, FreeBSD, Oracle
Linux, Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server
(SLES), and Ubuntu.

For Sizing guidance for Deploying NGINX Plus, see `Sizing Guide for
Deploying NGINX Plus on Bare Metal
Servers <https://www.nginx.com/resources/datasheets/nginx-plus-sizing-guide/>`__

Prerequisites
-------------

Before begin able to use NGINX Plus you will need the following:

- An NGINX Plus subscription
- A supported operating system 
- Your credentials to the NGINX Plus Customer Portal
- Your NGINX Plus certificate and public key

.. note:: The prerequisites have been completed for you in the lab

.. seealso:: Official installing NGINX documentation:
   `Installing NGINX Plus 
   <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/>`_
   
   Official NGINX GeoIP2 documentation:
   `GeoIP2 Module 
   <https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-plus/>`_

Learning Objectives
-------------------

By the end of the lab you will be able to:

-  Install NGINX Plus
-  Install a NGINX Plus Dynamic Module
-  Verify Installation
-  Invoke NGINX and common options from from the command line

Exercise 1: Install NGINX Plus
------------------------------

1. In the **WORKSPACE** folder found on the desktop, open
   **NGINX-PLUS-3.code-workspace** in Visual Studio Code.

   **Select Workspace**

   .. image:: images/2020-06-29_20-56.png

   If you are prompted **Are you sure you want to continue?** Select
   **continue**

   .. image:: images/2020-06-29_20-57.png

2. In the VSCode, open a terminal window, using **View > Terminal menu** 
   command. You will now be able to both run NGINX commands and edit NGINX Plus
   configuration files via the VSCode Console and terminal.
   
   Open new terminal

   .. image:: images/2020-06-29_21-01.png

   .. note:: Terminal will appear on the bottom portion of the VSCode screen
   
   .. image:: images/2020-06-26_12-27.png

3. In the terminal run the following commands to install NGINX Plus

   a. Confirm you are root
 
      .. code:: bash

         whoami
   
   b. Move to the /root directory and check nginx-repo cert and key are here

      .. code:: bash

         cd /root 
         ls

   c. Run installation commands

      .. code:: bash

         mkdir -p /etc/ssl/nginx 
         cp nginx-repo.* /etc/ssl/nginx 
         wget http://nginx.org/keys/nginx_signing.key && sudo apt-key add nginx_signing.key 
         apt-get install apt-transport-https lsb-release ca-certificates 
         printf "deb https://plus-pkgs.nginx.com/ubuntu `lsb_release -cs` nginx-plus\n" | sudo tee /etc/apt/sources.list.d/nginx-plus.list 
         wget -P /etc/apt/apt.conf.d https://cs.nginx.com/static/files/90nginx 
         apt-get update 
         apt-get -y install nginx-plus 

4. Verify the version of NGINX Plus that was installed:

   .. code:: bash

      nginx -v

5. Install the NGINX Plus GeoIP2 Dynamic Module

   .. code:: bash

      apt-get -y install nginx-plus-module-geoip2 

   .. note::

      In the output of the previous command view the instructions to enable
      the module via the NGINX config. **We will do this later:**

      ``The 3rd-party GeoIP2 dynamic modules for NGINX Plus have been installed. 
      To enable these modules, add the following to /etc/nginx/nginx.conf 
      and reload nginx:`` 

      **load_module modules/ngx_http_geoip2_module.so; 
         
      load_module modules/ngx_stream_geoip2_module.so;**

      Please refer to the module documentation for further details:

      https://github.com/leev/ngx_http_geoip2_module

6. Start NGINX Plus

   .. code:: bash

      systemctl start nginx 

7. Verify that NGINX Plus has started

   .. code:: bash

      ps -eaf | grep nginx 

8. Test the NGINX Plus instance in your browser. Open **Google Chrome** from 
   your Desktop and enter the following URL, http://nginx-plus-3. 
   
   You should see the NGINX default page:

   .. image:: images/2020-06-26_12-33.png

Exercise 2: NGINX Plus command line basics
------------------------------------------

In this exercise, we will review configure NGINX Plus as a basic load
balancer and test/verify configured functionality.

1. If you have closed VSCode, once again, open **NGINX-PLUS-3code-workspace**
   found in the **WORKSPACE** folder.

   .. image:: images/2020-06-29_20-56.png

   .. image:: images/2020-06-26_12-27.png

      VSCode

2. In VSCode, open a **terminal window**, using **View > Terminal menu** 
   command. You will now be able to both run NGINX commands and edit NGINX Plus
   configuration files via the VSCode Console and terminal.

3. In the terminal try running the following NGINX commands and inspect
   the output (output won’t be listed in below):

   Print help for command-line parameters

   .. code:: bash

      nginx -h 
   
   Test the configuration file: 
   
   nginx checks the configuration for correct syntax, and then tries to open 
   files referred in the configuration.
      
   .. code:: bash

      nginx -t

   same as -t, but additionally dump configuration files to standard output

   .. code:: bash
      
      nginx -T 
      
      
   print nginx version

   .. code:: bash

      nginx -v
      
   print nginx version, compiler version, and configure parameters.
      
   .. code:: bash
      
      nginx -V 
 
   send a signal to the master process. The argument signal can be one of:

   - stop — shut down quickly
   - quit — shut down gracefully
   - reload — reload configuration, start the new worker process with a new
     configuration, gracefully shut down old worker processes.
   - reopen — reopen log files
      
   .. code:: bash
      
      nginx -s reload 

Exercise 3: Inspect NGINX Plus modules
--------------------------------------

Now that NGINX Plus is installed, browse to the NGINX configuration root,
**/etc/nginx**

1. **File > Open Folder...**

   .. image:: images/2020-06-29_15-47.png

2. Enter **/etc/nginx** in the open folder menu

   .. image:: images/2020-06-29_21-07.png


3. Select the **nginx.conf** file in the VSCode Explorer section.

4. To enable the 3rd-party GeoIP2 dynamic modules for NGINX Plus that have been
   installed, add the following lines to **/etc/nginx/nginx.conf** in the
   **main context** and **reload nginx**:

   .. code:: nginx

      load_module modules/ngx_http_geoip2_module.so; 
      load_module modules/ngx_stream_geoip2_module.so;

   For example, it may look like this:

   .. image:: images/2020-06-29_21-11.png

7. In the terminal window using **View > Terminal menu** command, and in the 
   terminal, run the following commands to reload nginx:

   .. code:: bash

      nginx -t && nginx -s reload

   .. image:: images/2020-06-29_21-13.png
      
      reload nginx

8. See which Dynamic modules are installed:

   .. code:: bash

      cd /etc/nginx/modules  
      ls -al 