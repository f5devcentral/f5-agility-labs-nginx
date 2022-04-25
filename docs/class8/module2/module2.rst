Module 2 - Install and Enable NGINX AppProtect DoS
######################################################


In this module you will install and enable NGINX App Protect DoS on NAP DOS1 and NAP DOS 2

NGINX App Protect DoS directives:

1. **load_module**  - This command will load the dynamic module into NGINX Plus.  Located in the main context 

2. **app_protect_dos_enable** - Enable/Disable App Protect DoS module. It can be located in the location, server or http contexts.

3. **app_protect_dos_monitor** - This directive is how App Protect monitors stress level of the protected resources. There are 3 arguments for this directive:

   - URI - a mandatory argument, this is the destination to the protected resources
   - Protocol - an optional argument, this is the protocol of the protected resource ( http1, http2, grpg) http1 is the default
   - Timeout - determines how many seconds App Protect waits for a response. The default is 10 seconds for http1 and http2 and 5 seconds for grpc
   
4. **app_protect_dos_security_log_enable** - Enable/Disable App Protect DOS security logger

5. **app_protect_dos_security_log** - This directive takes two arguments, first is the configuration file path and the second is the destination where events will be sent 


Install NGINX App Protect DOS 
-----------------------------

1. Install NGINX AppProtect DoS
   
  1. Open the WebShell of NAP DOS VM
   
  2. Install NGINX App Protect 
  
.. code:: shell 

      apt install -y app-protect-dos 

2. Enable NGINX App Protect 
   
.. Note:: 

    All NGINX App Protect configurations have been previously commented out. 

   1. Using Nano remove the comments '#' from the App Protect directives in the nginx.conf file

.. image:: images/nginx.conf.png


.. code:: shell

    nano /etc/nginx/nginx.conf 


   Example: In the above screen shot you will un-comment the load module and log_format lines. 

   1. Save and Exit Nano ( Ctrl-X to save and exit )

3. Restart NGINX   

.. code:: shell 

    service nginx restart 

If NGINX restarted successfully you should be returned to a shell prompt  


