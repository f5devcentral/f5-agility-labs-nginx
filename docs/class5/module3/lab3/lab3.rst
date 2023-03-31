Review the Grafana Dashboard Statistics
=======================================

This section is optional and showcases the use of Nginx Dashboard (included with Nginx Plus). 

1. Open **Firefox** and open a new tab. Click the **NGINX Dashboard** bookmark.

.. image:: images/nginx_dashboard_bookmark.png

2. The landing page gives you an overview of the current traffic statistics. Click on **HTTP Upstreams**.

.. image:: images/nginx_dashboard_landing.png

2. The **HTTP UPSTREAM** section shows all your Kubernetes endpoints.

.. image:: images/nginx-plus-dashboard-upstreams.png

2. The additional detail provided in the Nginx Dashboard is provided via *Snippets* that we enabled in the **values.yaml** file and directives we called out in **arcadia-vs.yml** file.

.. image:: images/status-zone.png

3. Here is a small section showing how the *snippet* directive was used in **arcadia-vs.yml** file.

.. image:: images/snippet.png
   :scale: 50%
   :align: center

4. Open a new tab in **Firefox** and click the **Grafana** bookmark.

.. image:: images/grafana_bookmark.png

5. Log into Grafana using **admin** as the usrname and **Agility2023!** as the password.

.. image:: images/grafana_login.png

6. Click on **NGINX Plus Ingress Controller** in the **Recently Viewed Dashboards** list.

.. image:: images/grafana_dashboard.png

7. This section shows Prometheus exporting Nginx Ingress Controller data to Grafana. For a full list of metrics exported please see `this <https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics>`_ link.

.. image:: images/grafana.png 

8. Expand the sections in the dashboard to see the related statistics.

.. image:: images/grafana_full_dashboard.png
