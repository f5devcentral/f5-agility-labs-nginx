Enable NGINX App Protect on the Arcadia Finance App
===================================================

We will now enable NGINX App Protect and apply a WAF policy to the Arcadia Finance app.

#. Open Firefox and log into the NMS portal using the username **lab** and password **Agility2023!**.

.. image:: images/nms_dashboard.png

#. Click on **Instance Manager**. You'll see the list of instances managed by NMS.

.. image:: images/nms_instances.png

#. Click on **nginx-plus-2.agility.lab** in the list. 

.. image:: images/nms_instance_detail.png

#. Notice the NGINX App Protect WAF is now enabled.

.. image:: images/nms_app_protect_status.png

#. Click on the **Edit Config** button. 

.. image:: images/nms_instance_edit_config.png

#. Select the **arcadia-financial.conf** file in the navigation pane on the left.

.. image:: images/config_nav_pane.png

#. Add the following configuration lines to the **server** block:

.. code-block:: bash
  app_protect_enable on;
  app_protect_policy_file "/etc/nms/AgilityPolicy.tgz";
  app_protect_security_log_enable on;
  app_protect_security_log "/etc/nms/secops_dashboard.tgz" syslog:server=127.0.0.1:514;

Your screen should look similar to below:

.. image:: images/modified_arcadia-financial_conf.png

#. Click the **Publish** icon in the toolbar in the file editor.

.. image:: images/publish_btn.png

#. You will be presented with a confirmation prompt. Click **Publish** to continue. 

.. image:: images/publish_confirm.png

#. After a few moments, you will see a notification that the configuration was successfully published:

.. image:: images/publish_notification.png

#. Click on **Instances** in the left menubar to return to the list of instances. Click on **nginx-plus-2** to view the instance details. You should see under the **Last Deployment Details** and **App Protect Details** sections should show the WAF enabled.

.. image:: images/instance_detail_result.png


