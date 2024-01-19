Installing Prerequisites:
=========================

This exercise will cover installing the Nginx JavaScript Module (njs) which is required for handling the interaction between NGINX Plus and the OpenID Connect identity provider (IdP). 

Install NGINX Plus njs module
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. Copy and paste below command into the NGINX 1 webshell (Use Ctrl/Shift+V to paste).

   .. code:: shell

      sudo apt install nginx-plus-module-njs

.. note:: 
   The njs module has already been installed on NGINX 2 and NGINX 3 for this lab exercise

   **screenshot of expected output**

   .. image:: ../images/ualab03.png
      :align: left

2. Verify that the modules are loaded into NGINX Plus with the below command (Use Ctrl/Shift+V to paste again).  

   .. code:: shell
       
      sudo ls /etc/nginx/modules

   **screenshot of expected output**

   .. image:: ../images/ualab04.png
     :align: left
     :width: 800

3. Now you will need to load the module into nginx.conf. 

The following directive needs to be included in the top-level (“main”) configuration context in /etc/nginx/nginx.conf, to load the NGINX JavaScript module.


**Copy and run below command on the NGINX 1 server to open the nano editor and select the main nginx configuration file**


.. code:: shell
    
   nano /etc/nginx/nginx.conf


**Below is the line of code that needs to be copied into /etc/nginx/nginx.conf file**

.. code:: shell
      
   load_module modules/ngx_http_js_module.so;

**screenshot of where to place line of code**

.. image:: ../images/ualab05.png

.. note:: 
   To quit nano, use the Ctrl+X key combination. If the file you are working on has been modified since the last time you saved it, you will be prompted to save the file first. Type 'y' to save the file then press enter to confirm

**Save and exit the file**

4. Verify nginx config is good and reload.
     
**verify configuration is good**
     
.. code:: shell

   nginx -t

**reload the nginx config**

.. code:: shell
      
   nginx -s reload

Create a clone of the nginx-openid-connect GitHub repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

5. Clone the branch in your home directory with the command below.

.. code:: shell
        
   cd /home/ubuntu && git clone https://github.com/nginxinc/nginx-openid-connect.git

6. Verify the clone has completed by running the following command.  

.. code:: shell

   ls | grep nginx-openid-connect
		
**screenshot of output**
	
.. image:: ../images/OPENID_Connect_verify.jpg
   :width: 400 

.. attention::
   
   **Please do not close the UDF Shell browser tab!**	

Configuring the IdP Keycloak
============================
   
.. note:: 
   These next steps will guide you through creating a keycloak client for NGINX Plus in the Keycloak GUI

1. Open your browser tab with the Firefox container from the 'Getting Started' lab section.

2. Login to keycloak (you will need to type the URL below in to the Firefox container).

URL:
http://idp.f5lab.com:8080

3. Click on Administration Console.

.. image:: ../images/keycloak_admin_page.png

4. Now enter credentials provided below and sign in (if prompted, don't save the password).

.. note:: 
	Username: admin
	
	Password: admin


.. image:: ../images/ualab07.png
   
Create a Keycloak client for NGINX Plus in the Keycloak GUI:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
5. In the left navigation column, click 'Clients'. 

.. image:: ../images/keycloak_click_clients.png
		
6. On the Clients page that opens, click the 'Create' button in the upper right corner.
		
.. image:: ../images/keycloak_click_create.png
				
7. On the Add Client page that opens enter the below values then click the 'Save' button.

**Client ID – appworld2024**

**Client Protocol – openid-connect**

.. image:: ../images/ualab08.jpg

8. On the appworld2024 clients page that opens, enter or select the values below on the Settings tab, then scroll down and click 'Save':

.. attention::
   You will need to carefully type in the URI below, as it's not possible to paste into the Firefox container
   Also, note that there is an underscore before 'codexch' in the path

**Client ID - appworld2024**
		
**Access Type – confidential**

**Valid Redirect URIs - http://nginxdemo.f5lab.com:8010/_codexch**

.. image:: ../images/ualab09.jpg

.. note::
	For production, we strongly recommend that you use **SSL/TLS (port 443)**. The port number is **mandatory** even when you’re using the default port for HTTP (80) or HTTPS (443) 
	Valid Redirect URIs – This is the URI of the NGINX Plus origin web server instance, including the port number, and ending in /_codexch

9. Scroll back up and click the 'Credentials' tab, then copy the value (Ctrl-C) in the 'Secret' field to the Firefox 'Clipboard'.  Next, make a note of it on your local machine (e.g., in notepad) by opening the Firefox 'Clipboard' and copy/pasting the value. You will need this for the NGINX Plus configuration later.

.. image:: ../images/client_secret.jpg
.. image:: ../images/Firefox_Clipboard.jpg
	
10. While still under the appworld2024 Clients page, click the 'Roles' tab, then click the 'Add Role' button in the upper right corner of the page that 
opens.

.. image:: ../images/keycloak_click_role.jpg
	
11. On the 'Add Role' page that opens, type a value in the 'Role Name' field (here it is: nginx-keycloak-role) and click the 'Save' button.

.. image:: ../images/keycloak_save_role.png
	
Creating a user in keycloak
~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. In the left navigation column, click 'Users'. On the Users page that opens, click the 'Add User' button in the upper right corner to create a new user with the Username "user01" (no quotes), then click 'Save'.

.. image:: ../images/keycloak_add_user.png
	
2. Once the user is created, click on the 'Credentials' tab at the top of the screen. 

3. Enter the Password appworld2024 and Confirm.

4. Toggle Temporary to OFF, and click 'Set Password' (click yes, you're sure).

.. image:: ../images/keycloak_cred.png
	
5. On the management page for the user (here, user01), click the 'Role Mappings' tab. On the page that opens, select appworld2024 on the 'Client 
Roles' drop‑down menu. Click 'nginx-keycloak-role' in the 'Available Roles' box, then click the 'Add selected' button below the box. The role then appears in the 'Assigned Roles' and 'Effective Roles' boxes, as shown in the screenshot.

.. image:: ../images/keycloak_role_mappings.jpg

Configure NGINX Plus as the OpenID Connect relying party
========================================================

1. Now go back to the NGINX 1 UDF Shell browser tab that you have open. You are going to run a configuration script.

Please copy and paste the below command into the webshell  **DON'T FORGET TO REPLACE THE CLIENT SECRET FOR THE CODE BELOW** (use the 'Client Secret' note that you made earlier to help build the correct command syntax).

.. code:: shell

	./nginx-openid-connect/configure.sh -h nginxdemo.f5lab.com -k request -i appworld2024 -s YOURCLIENTSECRET -x http://idp.f5lab.com:8080/auth/realms/master/.well-known/openid-configuration

**screenshot of output**

.. image:: ../images/nginx_config_script.png
	:width: 1200

.. note:: Information on switches being used in script:

	 echo " -h | --host <server_name>           # Configure for specific host (server FQDN)"
    
	 echo " -k | --auth_jwt_key <file|request>  # Use auth_jwt_key_file (default) or auth_jwt_key_request"
    
	 echo " -i | --client_id <id>               # Client ID as obtained from OpenID Connect Provider"
	 
	 echo " -s | --client_secret <secret>       # Client secret as obtained from OpenID Connect Provider"
    
	 echo " -p | --pkce_enable                  # Enable PKCE for this client"
    
	 echo " -x | --insecure                     # Do not verify IdP's SSL certificate"


2. Change Directory.

.. code:: shell
	
	cd ./nginx-openid-connect/

3. Now that you are in the nginx-openid-connect directory, use the provided command to copy the below files.

frontend.conf  openid_connect.js  openid_connect.server_conf  openid_connect_configuration.conf

.. code:: shell

	cp frontend.conf openid_connect.js openid_connect.server_conf openid_connect_configuration.conf /etc/nginx/conf.d/

4. After copying files change directory to '/etc/nginx/conf.d/'.

.. code:: shell 

	cd /etc/nginx/conf.d/

5. Using Nano edit the 'frontend.conf' file.

.. code:: shell

	nano frontend.conf

6. Update the server to **10.1.1.4:8081** (this is our origin server).

.. image:: ../images/frontend_conf.png
	
**save file and close**

7. Using Nano edit the 'openid_connect.server_conf' file.

.. code:: shell

	nano openid_connect.server_conf

8. Update the resolver to use local host file as shown below. 

.. image:: ../images/host_lookup.png

**save and close file**

.. note:: 

	We are using the host file because this is a lab, so make sure to put in the LDNS server for the resolver

9. Using Nano edit the openid_connect_configuration.conf.

.. code:: shell

	nano openid_connect_configuration.conf

10. Scroll down and modify the **$oidc_client_secret** from 0 to "yourclientsecret" from the earlier step, to look like the example below.  **Do not forget to add the quotation marks!**

**screenshot of output**

.. image:: ../images/save_secret.png

Then scroll down further and add the keyword "**sync**" to the first three '**keyval_zone**' variables at the bottom of the file, so that it looks like below.

**screenshot of output**

.. image:: ../images/keyval_zone.jpg
   :width: 1000

**save and close file**

11. Reload Nginx.

.. code:: shell

	nginx -s reload

.. note:: 

   Please leave the NGINX 1 server webshell connection open!

Testing the config
==================

Now that everything is done lets test the config!  Please go back to the Firefox tab on your local browser.

1. Clear recent history and cookies from the browser (under Privacy & Security on the Firefox Settings tab).

.. image:: ../images/clear_cookies.png

2. While still in Firefox, open a new tab and type http://nginxdemo.f5lab.com:8010 into the browser and launch the page.

.. image:: ../images/test_oidc.png

Notice you'll be redirected to the IdP for login. 

3. Once on the IdP page put in the credentials for the user you created. user01 with password appworld2024 (do not save the credentials, if prompted).

.. image:: ../images/auth_login.png

You should now see the webservice! You've been logged in and the browser has been issued a JWT Token establishing identity!  You can view the token by clicking 'More tools' and 'Web Developer Tools' in the Firefox Settings menu, then selecting the 'Storage' tab and highlighting "auth_token".

.. image:: ../images/verificaion_webservice.png



Manage NGINX Plus with Instance Manager
=======================================

The OIDC authentication is working correctly. Now we will manage our NGINX Plus deployment with Instance Manager.

1. Open a new tab in Firefox and put https://nim.f5lab.com into the browser url field and launch the page (accept the risk and continue).

.. image:: ../images/nms_login-w.jpg

2. Sign into Instance Manager as admin. The username/password are saved in the browser so the fields should autopopulate.

.. image:: ../images/nms_admin_login-w.jpg

3. Once you are signed in, click on the 'Instance Manager' module.

.. image:: ../images/nms_modules-w.jpg

.. note::
   If you prefer the 'Dark Mode' interface, select it from the 'Account' menu in the upper right corner of the page

.. image:: ../images/Dark_Mode.jpg
   :width: 250

4. Once directed to main console page of NGINX Instance Manager, click on 'Instances' and you will see the instructions on how to add NGINX instances to Instance Manager.

.. image:: ../images/instance_manager_main-w.jpg

5. Copy and run the below command on the NGINX 1 server to install the agent.

.. code:: shell

	curl -k https://nim.f5lab.com/install/nginx-agent | sudo sh

6. Once the installation is complete, start the nginx agent.

.. code:: shell

	sudo systemctl start nginx-agent

7. Now let's refresh the Instance Manager page. We should see the instance under the 'Instances' tab. 

.. image:: ../images/instance_manager_instances-w.jpg


8. Clicking on the instance will show installation details and metrics (these may take a few minutes to correlate).

.. image:: ../images/instance_manager_details-w.jpg  


Create the Nginx Plus Cluster in Instance Manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. To begin, we need to install the same agent on the new NGINX servers. First open a webshell connection to NGINX 2 and then do the same for NGINX 3 (at this point, you should have all three NGINX servers open in UDF Webshell tabs). 

.. image:: ../images/NGINX-2_webshell.jpg

Copy and run the below command on -both- the NGINX 2 and NGINX 3 servers to install the agent.

.. code:: shell
	
   curl -k https://nim.f5lab.com/install/nginx-agent | sudo sh

2. Once the installation is complete, start the nginx agent on -both- servers.

.. code:: shell
	
   sudo systemctl start nginx-agent

.. note:: 

	Please leave all of the NGINX server webshell connections open!

3. Go back to the Instances Overview in Instance Manager and you should see the new servers.

.. image:: ../images/add_instance-7.jpg

4. Now we'll go back to -all three- NGINX server's webshell connections and create the Instance Group (if the webshell is currently closed for NGINX 1, please reopen it).
   To create the Instance Group, we need to edit the agent-dynamic.conf file and add an instance_group following the steps below for each of the three NGINX servers.

Open the file for editing in nano:

.. code:: shell
	
   nano /var/lib/nginx-agent/agent-dynamic.conf

.. image:: ../images/instance-group-1.jpg
   :width: 500

...add the following to the bottom of the file on each server and Save:

.. code:: shell

   instance_group: default

**screenshot of output**

.. image:: ../images/instance-group-2.jpg
   :width: 600

...and then restart the agent on each of the three servers.

.. code:: shell
	
   sudo systemctl restart nginx-agent

.. image:: ../images/instance-group-3.jpg
   :width: 500

**In order to make sure our new cluster is performant, we need to sync the authentication tokens between the instances.**

5. First, open nginx.conf on -all three- NGINX servers using the command below.

.. code:: shell
	
   nano /etc/nginx/nginx.conf

6. Then add the 'stream' block below to the configuration, just before the 'http' block.

.. attention::

   **The server 'listen' directive needs to match the IP address of each server.  The example below shows 10.1.10.6, which is correct for NGINX 1.  For NGINX 2, change this to 10.1.10.7 and for NGINX 3, change it to 10.1.10.8.** 
   
.. code:: shell
	
   stream {
   resolver 127.0.0.53 valid=20s;
    server {
        listen 10.1.10.6:9000;
        zone_sync;
        zone_sync_server 10.1.10.6:9000;
        zone_sync_server 10.1.10.7:9000;
        zone_sync_server 10.1.10.8:9000;
      }
   }

**screenshot of output**

.. image:: ../images/stream_block.jpg
   :width: 500

**save and close file**

7. Reload NGINX on -all three- servers.

.. code:: shell

   nginx -s reload   

You should now see an **Instance Group** named 'default' in the Instance Manager. 
   
   .. image:: ../images/instance-group-4.jpg

8.  Now we will go back to UDF and select 'Access' --> 'TMUI' to log on to the BIG-IP (admin:f5r0x!) in order to test and validate the configuration.  

   .. image:: ../images/BIG-IP_Access.jpg
   .. image:: ../images/big-ip-2.jpg

9. Navigate to DNS > GSLB > Pools > Pool List and select 'gslbPool'.

   .. image:: ../images/big-ip-3.jpg
   .. image:: ../images/big-ip-3.5.jpg

10. Click the 'Statistics' tab and you'll see that only 'nginx1' is currently enabled and has 'Preferred' resolutions listed under 'Load Balancing'.

   .. image:: ../images/big-ip-4.jpg
   .. image:: ../images/big-ip-4.5.jpg

11. Click the 'back' button on your web browser to get back to the 'gslbPool.  This time select the 'Members' tab.

   .. image:: ../images/big-ip-5.jpg

12. Here we will check the boxes next to 'nginx2' and 'nginx3' and click 'Enable' to add them in to the load balancing pool.
    Refresh the page by clicking the 'Members' tab again and you will see the new members become active (it may take several seconds).
    Now click the 'Statistics' tab again and we are ready to test the configuation.

   .. image:: ../images/big-ip-6.jpg

13. Go back to Firefox, open a new tab, and navigate to http://nginxdemo.f5lab.com:8010 again.
    Log back in as user01 with password: appworld2024, as needed.

   .. image:: ../images/test-gslb-1.jpg

14. Go back to the BIG-IP and refresh the page (Ctrl-F5) to verify that the successful login was performed by one of the other NGINX servers, in this case, nginx2.

   .. image:: ../images/test-gslb-2.jpg

15. Refresh the page in Firefox several times (Ctrl-R) and then refresh the BIG-IP Statistics again (Ctrl-F5) to confirm that the load balancing is leveraging each of the NGINX servers.

   .. image:: ../images/test-gslb-3.jpg
    
16. Finally, validate the configuration by running the command below on -each of the three- NGINX Plus servers to confirm that the access token has synchronized.

.. code:: shell

   curl -i http://localhost:8010/api/8/http/keyvals/oidc_access_tokens

For example, below we see the access token on nginx-2. Run the same command on nginx-1 and nginx-3 and you should see the same token.

.. image:: ../images/nginx-2_validate_token.jpg


**Congratulations, you have successfully completed the lab!**




