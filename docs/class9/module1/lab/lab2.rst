Lab 1 - Installing Prerequisites:
=================================

1) Start by installing the NGINX JavaScript module (njs) whixh is required for handling the interaction between NGINX Plus and the OpenID Connect provider (IdP). Install the njs module after installing NGINX Plus by running one of the following:

**run the following on nginx box**

.. code:: shell

  sudo apt install nginx-plus-module-njs 

.. image:: images/ualab03.png
  :width: 800
  
verify modules are loaded into nginx

**run the following command**

.. code:: shell

  sudo ls /etc/ssl/modules

.. image:: images/ualab04.png
  :width: 800
  
2) Now you will need load the module in the nginx.conf 

The following directive included in the top-level (“main”) configuration context in /etc/nginx/nginx.conf, to load the NGINX JavaScript module:

**run below command then copy the following command and place into nginx.conf file**

.. code:: shell

  nano /etc/nginx/nginx.conf

line to copy into /etc/nginx/nginx.conf file

.. code:: shell

  load_module modules/ngx_http_js_module.so;

.. image:: images/ualab05.png
  :width: 800

**save and exit file**