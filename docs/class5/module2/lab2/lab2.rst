Adding the NGINX Plus with App Protect Instance to NGINX Instance Manager
=========================================================================

Since this lab utilizes NIM, we're going to install the NGINX Agent and add the instance to the NGINX Instance Manager for centralized management and analytics.

.. warning:: If you're installing the NGINX Agent in your environment, a few steps are required before starting the installation process. See https://docs.nginx.com/nginx-management-suite/nginx-agent/install-nginx-agent/ for more information. In this lab, these have been checked for you.

1. Connect to the NGINX Plus 2 instance via SSH, if not already connected.

2. The NGINX Agent will be pulled from the NGINX Instance Manager server and installed:

.. code-block:: bash

  curl -k https://nginx-instance-manager.appworld.lab/install/nginx-agent | sudo sh
  sudo systemctl restart nginx-agent

**Result**

.. image:: images/nginx_agent_install_result.png

3. Configure the NGINX Agent

Now you'll need to configure NGINX Agent to perform additional tasks for NGINX App Protect. 

Load the file into a file editor:

.. code-block:: bash

  sudo nano /etc/nginx-agent/nginx-agent.conf

Near the end of the file, modify the line starting with "config_dirs" so it looks like the following:

.. code-block:: bash

  config_dirs: "/etc/nginx:/usr/local/etc/nginx:/usr/share/nginx/modules:/etc/nms:/etc/app_protect"


Next, add the following configuration block to the end of the file:

.. caution:: When you paste the block below, extra line breaks may be included. Please remove those line spaces and ensure the lines are indented properly to ensure no errors occur.

.. code-block:: bash

  events:
    # report data plane events back to the management plane
    enable: true

  # Enable reporting NGINX App Protect details to the management plane.
  extensions:
    - nginx-app-protect
    - nap-monitoring

  # Enable reporting NGINX App Protect details to the control plane.
  nginx_app_protect:
    # Report interval for NGINX App Protect details - the frequency the NGINX Agent checks NGINX App Protect for changes.
    report_interval: 15s
    # Enable precompiled publication from the NGINX Instance Manager (true) or perform compilation on the data plane host (false).
    precompiled_publication: true
  # NGINX App Protect Monitoring config
  nap_monitoring:
    # Buffer size for collector. Will contain log lines and parsed log lines
    collector_buffer_size: 50000
    # Buffer size for processor. Will contain log lines and parsed log lines
    processor_buffer_size: 50000
    # Syslog server IP address the collector will be listening to
    syslog_ip: "127.0.0.1"
    # Syslog server port the collector will be listening to
    syslog_port: 514

Prior to saving, your screen should look the same as below:

.. image:: images/nginx_agent_conf_edits.png

Press **CTRL + X** to save the file, followed by **Y** when asked to save the buffer, then **enter** when asked for the filename. 

In this example, we've configured NGINX Agent to:

- Check for configuration changes every 15 seconds
- Allow for precompiled policies, meaning that NIM will compile the policy before sending to the NGINX Plus/NAP instance
- Enable large buffers for NGINX App Protect Monitoring
- Enable NGINX Agent to run a syslog daemon that will forward logs to NIM Security Monitoring

4. Start the NGINX Agent and set to start at boot:

.. code-block:: bash

  sudo systemctl enable --now nginx-agent

Create the Metrics service on NGINX
-----------------------------------

The NGINX Agent is now configured and started. We'll need a few more configuration pieces to finish the installation.

5. Switch to **Firefox**, if already open, or open **Firefox** by selecting **Applications** > **Favorites** > **Firefox** from the top menu bar.

.. image:: images/firefox_launch.png

6. Click the NIM bookmark or navigate to https://nginx-instance-manager.appworld.lab/ui/.

.. image:: images/launch_nim.png

7. Log in using the **lab** / **AppWorld2024!** credentials.

.. image:: images/login_prompt.png

8. Click on the **Instance Manager** tile to launch NIM. 

.. image:: images/nim_tile.png

9. You should now see second instance in the list. Click **Refresh** in the toolbar if you do not see the new instance.

.. image:: images/nim_refresh_result.png

10. Click the **nginx-plus-2.appworld.lab** instance in the list. 

.. image:: images/nginx_plus_2_detail.png

11. Click the **Edit Config** button.

.. image:: images/edit_button.png

12. Click on **Add File** button in the navigation pane.

.. |expand_button| image:: images/expand_button.png
   :scale: 25%

.. image:: images/add_file_button.png

13. Provide the filename **/etc/nginx/conf.d/metrics.conf**. Click **Create**.

.. image:: images/filename_prompt.png

14. Paste the following configuration into the editor using **CTRL + V**:

.. code-block:: bash

  server {
      listen 8080;

      location /api/ {
        api write=on;
        allow 127.0.0.1;
        deny all;
      }
  }

**Result**

.. image:: images/file_contents.png

15. Click the **Publish** button.

.. image:: images/publish_button.png

16. Click **Publish** when presented with the confirmation prompt.

.. image:: images/publish_confirm.png

17. You will see the Published notification shortly after. 

.. image:: images/published_notification.png

18. Return to the SSH terminal to the NGINX Plus 2 instance. Restart NGINX:

.. code-block:: bash

   sudo nginx -s reload

19. Restart the NGINX Agent

To start the NGINX Agent on systemd systems, run the following command:

.. code-block:: bash

   sudo systemctl restart nginx-agent

20. Verifying NGINX Agent is Running and Registered

Run the following command on your data plane to verify that the NGINX Agent process is running:

.. code-block:: bash

  ps aux | grep nginx-agent

You should see output that looks similar to the following example:

.. image:: images/nginx_agent_ps_aux_result.png

This section of the lab is complete.
