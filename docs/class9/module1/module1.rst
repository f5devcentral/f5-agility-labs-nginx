Installing Prerequisites:
========================

This exercise will cover installing the Nginx JavaScript Module (njs) which is required for handling the interaction between NGINX Plus and the OpenID Connect provider (IdP). 

Install Nginx+ njs module
-------------------------

#. First step you'll need to access the Nginx Instance and locate the webshell option on the udf under the system nginx

  .. image:: ../images/9webshell.png
    :width: 800

 
#. Copy and paste below command into nginx webshell

   .. code:: shell

      sudo apt install nginx-plus-module-njs

   **screenshot of expected output**

      .. image:: ../images/ualab03.png
         :align: left
         :width: 800

#. verify modules are loaded into nginx with the below command.

   .. code:: shell
       
      sudo ls /etc/nginx/modules

   **screenshot of expected output**

   .. image:: ../images/ualab04.png
     :align: left
     :width: 800

#. now you will need to load the module in the nginx.conf 

  The following directive needs to be included in the top-level (“main”) configuration context in /etc/nginx/nginx.conf, to load the NGINX JavaScript module:


  **copy and run below command on the nginx server to open the nano editor and select the main nginx configuration file**


  .. code:: shell
    
    nano /etc/nginx/nginx.conf


  **below is the line of code that needs to be copied into /etc/nginx/nginx.conf file**


   .. code:: shell
      
      load_module modules/ngx_http_js_module.so;

   **screenshot of where to place line of code**

   .. image:: ../images/ualab05.png
      :width: 800

   **save and exit file**

#. Verify nginx config is good and reload
     
    **verify configuration is good**
     
    .. code:: shell
       
      nginx -t

    **reload the nginx config**

    .. code:: shell
      
      nginx -s reload

Create a clone of the nginx-openid-connect GitHub repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Note:** There is a branch for each NGINX Plus release. Switch to the correct branch to ensure compatibility with the features and syntax of each release. The main branch works with the most recent NGINX Plus and JavaScript module releases.


#. Verify version of nginx

    .. code:: shell
        
        nginx -v

.. image:: ../images/ualab_nginxv.png
    :width: 800


#. Now that we have the version number we are ready to clone the branch in github. Clone the branch with the command below.

    .. code:: shell
        
        git clone --branch R26 https://github.com/nginxinc/nginx-openid-connect.git

.. image:: ../images/ualab_verifyclone.png
    :width: 800

.. note:: 
   Please note that you need to install git on your linux machine (https://github.com/git-guides/install-git) it has already been installed on this lab instance.



Configuring the IdP Keycloak:
============================
   
.. note:: 
   These next steps will guide you through creating a keycloak client for NGINX Plus in the Keycloak GUI


#. Connect to firefox container via udf connection methods
   
   .. image:: ../images/ualab06.png
      :align: left
      :width: 800 

#. Login to keycloak

   .. image:: ../images/ualab07.png
      :align: left
      :width: 800


#. Create a Keycloak client for NGINX Plus in the Keycloak GUI:

      In the left navigation column, click Clients. On the Clients page that opens, click the Create button in the upper right corner.

      On the Add Client page that opens, enter or select these values, then click the  Save  button.

      **Client ID – agility2022**

      **Client Protocol – openid-connect.**

   .. image:: ../images/ualab08.png
      :width: 800

  2) On the NGINX Plus page that opens, enter or select these values on the Settings tab:

      Access Type – confidential
      Valid Redirect URIs – The URI of the NGINX Plus instance, including the port number, and ending in /_codexch (in this guide it is https://10.1.1.5:443/_codexch)
      
      *Notes: For production, we strongly recommend that you use SSL/TLS (port 443).*
      *The port number is mandatory even when you’re using the default port for HTTP (80) or HTTPS (443).*

.. image:: ../images/ualab09.png
   :width: 800
