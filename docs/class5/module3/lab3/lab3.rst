Review the Grafana Dashboard Statistics
=======================================

1. These two last sections are optional showcasing the use of Nginx Dashboard (included with Nginx Plus). The **HTTP UPSTREAM** section shows all your Kubernetes Endpoints.

.. image:: images/nginx-plus-dashboard-upstreams.png

 The additional detail provided in the Nginx Dashboard is provided via *Snippets* that we enabled in the **values.yaml** file and directives we called out in **arcadia-vs.yml** file.
 
.. image:: images/nginx-plus-dashboard.png

1. This section shows Prometheus exporting Nginx Ingress Controller data to Grafana. 

.. image:: images/grafana.png 

.. image:: images/grafana_menu_dashboard.png

.. image:: images/arcadia-api.png

