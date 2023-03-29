Review the Grafana Dashboard Statistics
=======================================

1. These two last sections are optional showcasing the use of Nginx Dashboard (included with Nginx Plus). The **HTTP UPSTREAM** section shows all your Kubernetes Endpoints.

.. image:: images/nginx-plus-dashboard-upstreams.png

2. The additional detail provided in the Nginx Dashboard is provided via *Snippets* that we enabled in the **values.yaml** file and directives we called out in **arcadia-vs.yml** file.

.. image:: images/nginx-plus-dashboard.png

3. This section shows Prometheus exporting Nginx Ingress Controller data to Grafana. For a full list of metrics exported please see [this](https://github.com/nginxinc/nginx-prometheus-exporter#exported-metrics) link.

.. image:: images/grafana_menu_dashboard.png

.. image:: images/grafana.png 
