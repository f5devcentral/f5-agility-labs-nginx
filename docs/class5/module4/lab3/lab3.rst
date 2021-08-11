Step 11 - Explore the Tools for KIC + NAP
##########################################

We will first generate some logs and then view the data in ELK and Grafana.

#. In the browser, click ``Arcadia links>Arcadia k8s ingress node1`` bookmark (you may have to refresh on the browser if you get an error)
#. You are now connected to the Arcadia App through the Kubernetes Ingress Controller with NAP
#. Send an attack (like a XSS in the address bar) by appending ``?a=<script>``
#. Open ``Kibana`` bookmark and click on ``Discover`` to view the logs

    .. image:: ../pictures/lab1/kibana_WAF_log.png
        :align: center

#. In the browser, click the NGINX+ Dashboard. Note the tab for ``HTTP Zones`` where we can see the VirtualServer we deployed for ``k8s.arcadia-finance.io`` and the real-time metrics. You can change the refresh interval by clicking the gear in the upper-right corner.

    .. image:: ../pictures/nginx-plus-dashboard.png
        :align: center


#. At the top of the menu, click the link for ``HTTP Upstreams``. Here you can see the pods that are part of each of the Arcadia micro-services.

    .. image:: ../pictures/nginx-plus-dashboard-upstreams.png
        :align: center


    .. note:: We have only deployed 1 pod per service. In production environments, it is common for there to be many pods per service and the KIC will load balance them.

#. Optional: Scale the ``app2`` deployment to 3 pods and view the dashboard again.

    .. code-block:: BASH
    
       kubectl scale deployment app2 --replicas 3
    

    .. note:: When pods are scalled up and down, NGINX Plus does not have to reload as it uses the dynamic API- dramatically reducing overhead in dynamic environments.