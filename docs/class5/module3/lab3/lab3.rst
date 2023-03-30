Review the Grafana Dashboard Statistics
=======================================

1. These two last sections are optional showcasing the use of Nginx Dashboard (included with Nginx Plus). The **HTTP UPSTREAM** section shows all your Kubernetes Endpoints.

.. image:: images/nginx-plus-dashboard-upstreams.png

2. The additional detail provided in the Nginx Dashboard is provided via *Snippets* that we enabled in the **values.yaml** file and directives we called out in **arcadia-vs.yml** file.

.. image:: images/status-zone.png

3. Here is a small section showing how the *snippet* directive was used in **arcadia-vs.yml** file.

.. image:: images/snippet.png
   :scale: 50%
   :align: center

4. This section shows Prometheus exporting Nginx Ingress Controller data to Grafana. For a full list of metrics exported please see `this <https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics>`_ link.

.. image:: images/grafana_menu_dashboard.png

.. image:: images/grafana.png 
