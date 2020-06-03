Installing NGINX Plus
=====================

This exercise will cover installation of NGINX Plus in a standalone (CentOS7) instance.
The UDF environment has three NGINX Plus instances -- Master, Plus2, and Plus3. 
To save time NGINX Plus has been installed on Plus2 and Plus3. In this lab we will install NGINX Plus on Master.

Repository Certificate and Key
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Typically, a customer would log into the `NGINX Plus Customer Portal`_ and download thier ``nginx-repo.crt`` and ``nginx-repo.key`` files. 
These files are used to authenticate to the NGINX Plus repository in order to retrieve the NGINX Plus package for installation.  
For this lab the necessary cert and key have already been provided on the instance in **/etc/ssl/nginx**.

Install NGINX Plus
~~~~~~~~~~~~~~~~~~~~

.. note:: Execute this command from the NGINX Plus Master instance.

.. warning:: Do not perform these steps from the UDF 'Web Shell'. Use a native terminal client or Putty from the Windows Jump Host.

.. code:: shell

   sudo yum install -y ca-certificates && \
   sudo wget -P /etc/yum.repos.d https://cs.nginx.com/static/files/nginx-plus-7.repo && \
   sudo yum install -y nginx-plus && \
   sudo systemctl enable nginx.service && \
   sudo systemctl start nginx.service

These commands install Certificate Authorities certificates, download the repository information from the NGINX customer portal, and install the NGINX Plus package.
The NGINX service is set to ``enable`` to start on boot. The last command starts the service. NGINX should be running at this time.

Verify NGINX Plus is running
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note:: Execute these commands on the NGINX Plus Master instance.

**Check the service status from systemd.**

.. code:: shell

   systemctl status nginx

**Verify the output shows the service running:**

.. code:: shell

   ● nginx.service - NGINX Plus - high performance web server
    Active: active (running) since Fri 2019-05-10 12:08:14 UTC; 2min 18s ago

**For an additional check, you should be able to curl to localhost port 80.**

.. code:: shell

  curl http://localhost

**Verify the output is the default NGINX placeholder page.**

.. code:: shell

   # Content Removed
   <h1>Welcome to nginx!</h1>
   <p>If you see this page, the nginx web server is successfully installed and
   working. Further configuration is required.</p>
   # Content Removed

NGINX Plus is now installed and running on the NGINX Plus Master instance.

.. _NGINX Plus Customer Portal: https://cs.nginx.com
