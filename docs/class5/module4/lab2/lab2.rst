Step 13 - Configure the Arcadia App with NAP on the KIC
#######################################################

Now that we have deployed the KIC, we need to configure the ingress definition.

.. note::  In an earlier lab we created a NodePort service so that our docker instance could access the Arcadia services. Now that we have an ingress controller, we want to prevent anyone from access Arcadia without going through the ingress.

.. note::  Also note: If you came to this lab directly (without doing the previous labs), everything will still work (this can be a standalone lab).
        
#.  To do so, we will change our services to ClusterIP:

    .. code-block:: language

        kaf /home/ubuntu/lab-files/arcadia-manifests/arcadia-deployment.yaml
        kaf /home/ubuntu/lab-files/arcadia-manifests/arcadia-services-cluster-ip.yaml

    .. note:: ``kaf`` is an alias for ``kubectl apply -f``. That's too many keystrokes for such a commonly used command! Type ``alias | grep kubectl`` to see some others. ``kgp`` is a great one.


#.  Review the below manifests which contain the routes and policies for NAP and the KIC.

    .. image:: ../pictures/kic-nap-config.png
        :align: center

#.  Run these commands in order to create the NAP policy, the log profile and the ingress object (the object routing the traffic to the right service)

    .. code-block:: BASH

        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/app-protect-log-config.yaml
        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/app-protect-policy.yaml
        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/waf-policy-dataguard.yaml
        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/arcadia-virtualserver.yaml


    .. note:: These commands will create the WAF policy and the log profile for Arcadia App, and will create the VirtualServer resource (the config to route the traffic to the right services/pods)

#.  Open ``Kubernetes Dashboard`` bookmark in the browser.
#.  Scroll down on the left to ``Custom Resource Definitions`` and click it.
#.  See the various custom resources we've configured (VirtualServer, APPolicy, Policy, APLogConf)


  .. image:: ../pictures/CRDs.png
     :align: center

