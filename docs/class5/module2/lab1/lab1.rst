Installing NGINX App Protect on an existing NGINX Plus instance
===============================================================

.. note:: NGINX Plus and NGINX App Protect repositories are accessed using a cert/key pair that enables access for customers who have purchased licenses. In this lab, NGINX Plus repo keys are already copied to the Ubuntu VM.

.. note:: This section of the lab covers installation of NGINX App Protect. General instructions for installation can be found at https://docs.nginx.com/nginx-app-protect-waf/admin-guide/install/.

1. Connect to the jump host via RDP if not already.

2. Installation of NGINX App Protect is performed on the CLI of the host. Click on the **Applications** menu, select **SSH Shortcuts** and select **nginx-plus-2**. 

.. image:: images/nginx_plus_2_ssh_shortcut_menu.png

.. note:: This host has NGINX Plus installed and serving the Arcadia Finance app, but NGINX App Protect is not installed.

3. Update the repository and install the NGINX App Protect WAF package:

.. code-block:: bash

  sudo apt-get update
  sudo apt-get install -y app-protect

If you are prompted for a password, enter `AppWorld2024!`.

**Result**

.. image:: images/nap_install_result.png

4. Load the NGINX App Protect WAF module on the main context in the nginx.conf file:

Open the file in an editor:

.. code-block:: bash

  sudo nano /etc/nginx/nginx.conf

Add the following line to the top of the file:

.. code-block:: bash

  load_module modules/ngx_http_app_protect_module.so;

Your configuration file should look similar to below:

.. image:: images/load_module_config_result.png

Press **CTRL + X** to save the file, followed by **Y** when asked to save the buffer, then **enter** when asked for the filename. 

5. Start the NGINX App Protect service and set it to start at boot:

.. code-block:: bash

  sudo systemctl enable --now nginx-app-protect

6. Restart the NGINX service:

.. code-block:: bash

  sudo nginx -s reload

Providing that no errors have occurred during these steps, you now have NGINX App Protect installed. Continue to the next section of the lab.
