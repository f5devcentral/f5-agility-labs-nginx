Review the NGINX Plus Configuration
###################################

.. note::  If not already connected to the jump host, connect via RDP and open Firefox.

#. In the NMS Dashboard, click the **Select Module** drop-down on the top of the left menu bar and select **Instance Manager**.
.. image:: images/nms_instance_manager_dropdown.png
#. Click the first NGINX instance in the list that shows *Active* in the *Status* column. You will see the *Instance Detail* screen.
.. image:: images/nms_instance_details.png
#. Let's review the configuration of this instance. Click on the **Edit Config** button on the *Instance Detail* page.
.. image:: images/nms_instance_detail_edit_config.png
#. The *Instance Config* page will be presented. Notice that all of the relevant NGINX configuration files are present in the navigation pane, and the contents of the selected file are shown in the visual editor pane on the right.
.. image:: images/nms_instance_config.png
#. Click on the configuration file for the application that we're testing, *arcadia-finance.conf*, in the navigation pane. The file's contents will be presented in the editor.
.. image:: images/nms_arcadia_config.png
#. Notice the configuration stanzas present. We have an upstream zone with application servers defined, an HTTPS server stanza specifying the application's location, SSL certificate and key, App Protect WAF configuration and finally a HTTP server block that redirects browsers to HTTPS. 
.. image:: images/arcadia_config_file.png
.. note:: Several lab resources also run through this NGINX Plus instance, such as ELK, Grafana, etc. We'll focus on the Arcadia Finance application for this portion of the lab.
  