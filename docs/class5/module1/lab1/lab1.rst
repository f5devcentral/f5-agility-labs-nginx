View the NGINX Plus Instance in NMS
===================================

1. Navigate to **Applications** on the menu bar and launch **Firefox**.

.. note:: Be patient as our lab resources are finite. It may take several seconds for Firefox to launch the first time.

2. In Firefox, click on the **Acardia Finance (N+)** bookmark or navigate to **https://nginx-plus.arcadia-finance.io/**. You should see the application page load as shown below.

.. image:: images/diy_pageload.png

3. This web application is being proxied by an NGINX Plus instance running NGINX App Protect WAF. This instance is being managed by NGINX Management Suite. Let's take a look at NMS to view the configuration and instance/application metrics. Click on the **NMS** bookmark in Firefox or navigate to **https://nginx-mgmt-suite.agility.lab/ui/**. You'll be presented with the NMS login page.

.. image:: images/nms_login.png

4. Click **Sign In**. 

.. image:: images/login_prompt.png

5. Login using **lab** / **Agility2023!**. You will see the NGINX Management Suite Launchpad.

.. image:: images/launchpad.png

6. Click on the **Instance Manager** button to enter the **Instance Manager** **Instances Overview** page.

.. image:: images/nim_instances_overview.png

7. Each instance of this lab runs in a virtual environement. Since new VMs are deployed for each instance, the operating system identifiers change, so each NGINX Plus instance is treated as a new instance. Thus, you may see previous instances listed. You may optionally delete these **Offline** instances by clicking the three dot icon under the **Actions** column and selecting **Delete**. They will not interfere with the lab.

.. image:: images/nim_instances_delete_offline.png

8. Click on the **nginx-instance-1.agility.lab** instance in the list that shows **Online** under the **Status** column. The **Instance Detail** screen loads.

.. image:: images/nim_instance_detail.png

9. Notice that the **Details** is the default tab in this screen. Scroll through the contents of the **Details** tab. In the first section titled **Instance Details**, notice that you can see details about the NGINX Instance itself, including version, status, configuration path, and more. 

.. image:: images/nim_instance_details.png

10.  In the **App Protect Details** section, you can clearly see that NGINX App Protect has been installed and is active.

.. image:: images/nim_app_protect_details.png

11. Scroll down through the **Host Details**, **Disk Partitions**, **Network Interfaces** and **Processors** sections to see additional details. 

12. Next, click on the **Metrics Summary** tab. In this tab, you can see visualized metrics around instance resource utiliation, including CPU, memory, overall connection counts, HTTP connection counts and more.  

.. caution:: It may take several minutes after the lab is created for metrics to appear in this screen. 

.. image:: images/nim_metrics_summary.png

1.  Finally, click on the **Metrics** tab to drill-down into the component-level, real-time values of all metrics available for the instance. Click through the sub-tabs, such as **System**, **HTTP Server Zones** and **HTTP Upstreams**. These graphs provide a quick way to identify anomalies in load and performance.

.. image:: images/nim_metrics.png

Now that you are familar with viewing metrics of the NGINX Plus instance in NMS, we'll continue to the next lab.
