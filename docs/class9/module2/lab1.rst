Installing Prerequisites:
=========================

This exercise will cover installing the Nginx JavaScript Module (njs) which is required for handling the interaction between NGINX Plus and the OpenID Connect provider (IdP). Install the njs module after installing NGINX Plus by running one of the following:

Install Nginx+ njs module
-------------------------

 #. to access the Nginx Instance locate the webshell option on the udf under the system nginx
  .. image:: /_static/9nginxwebshell.png

  .. note:: 
    
    Execute this command from the nginx webshell.
 
  .. code:: shell

    sudo apt install nginx-plus-module-njs

  .. image:: images/ualab03.png
   :width: 800

 #. verify modules are loaded into nginx with the below command.

    .. code:: shell
   
    sudo ls /etc/ssl/modules

    .. image:: images/ualab04.png
     :width: 800

 #. now you will need to load the module in the nginx.conf 

