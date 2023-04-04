Enable NGINX App Protect on the Arcadia Finance App
===================================================

We will now enable NGINX App Protect and apply a WAF policy to the Arcadia Finance app.

1. Address known-issue in NGINX Agent.

.. warning:: As of March 30th, 2023, a known issue is impacting this lab. 
  
To avoid the issue, SSH into nginx-plus-2 and issue the following command: 

.. code-block:: bash

  sudo sed -i 's/precompiled_publication: true/precompiled_publication: false/g' /etc/nginx-agent/nginx-agent.conf; sudo systemctl restart nginx-agent; sleep 7; sudo sed -i 's/precompiled_publication: false/precompiled_publication: true/g' /etc/nginx-agent/nginx-agent.conf; sudo systemctl restart nginx-agent

2. Open **Firefox** and click on the  **NMS** bookmark.

.. image:: images/nms_bookmark.png

3. Log in using the username **lab** and password **Agility2023!**. Click on the **Instance Manager** tile.

.. image:: images/nms_dashboard.png

4. Click on **nginx-plus-2.agility.lab** instance in the list. 

.. image:: images/nms_instance_select.png

5. Click on the **Edit Config** button. 

.. image:: images/nms_instance_edit_config.png

6. Select the **arcadia-financial.conf** file in the navigation pane on the left.

.. image:: images/config_nav_pane.png

7. Add the following configuration lines to the **server** block:

.. code-block:: bash

      app_protect_enable on;
      app_protect_policy_file "/etc/nms/AgilityPolicy.tgz";
      app_protect_security_log_enable on;
      app_protect_security_log "/etc/nms/secops_dashboard.tgz" syslog:server=127.0.0.1:514;

Your screen should look similar to below:

.. image:: images/modified_arcadia-financial_conf.png

8. Click the **Publish** icon in the toolbar in the file editor.

.. image:: images/publish_btn.png

9. You will be presented with a confirmation prompt. Click **Publish** to continue. 

.. image:: images/publish_confirm.png

10. After a few moments, you will see a notification that the configuration was successfully published.

.. image:: images/publish_notification.png

11. Click on **App Protect** from the menu. 

.. image:: images/app_protect_nav.png

12. On the list of policies, click on the name **AgilityPolicy**.

.. image:: images/agilitypolicy_select.png

13.  On this screen, you can see that our policy is applied.

.. image:: images/agility_policy_applied.png

This concludes this portion of the lab. 