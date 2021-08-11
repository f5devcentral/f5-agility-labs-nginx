Step 10 - Configure the Arcadia App with NAP on the KIC
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

    .. code-block:: yaml
       :caption: waf-policy.yaml
    
       apiVersion: k8s.nginx.org/v1
        kind: Policy
        metadata:
        name: waf-policy
        spec:
        waf:
            enable: true
            apPolicy: "default/dataguard-blocking"
            securityLog:
            enable: true
            apLogConf: "default/logconf"
            logDest: "syslog:server=10.1.20.11:5144"


    .. code-block:: yaml
            :caption: deploy_policy_and_logs.yaml

            apiVersion: appprotect.f5.com/v1beta1
            kind: APPolicy
            metadata:
              name: dataguard-blocking
            spec:
              policy:
                name: dataguard_blocking
                template:
                  name: POLICY_TEMPLATE_NGINX_BASE
                applicationLanguage: utf-8
                enforcementMode: blocking
                blocking-settings:
                  violations:
                  - name: VIOL_DATA_GUARD
                    alarm: true
                    block: true
                data-guard:
                  enabled: true
                  maskData: true
                  creditCardNumbers: true
                  usSocialSecurityNumbers: true
                  enforcementMode: ignore-urls-in-list
                  enforcementUrls: []
            
            ### App Protect Logs ###
            ---
            apiVersion: appprotect.f5.com/v1beta1
            kind: APLogConf
            metadata:
              name: logconf
            spec:
              filter:
                request_type: all
              content:
                format: default
                max_request_size: any
                max_message_size: 5k

                

    .. code-block:: yaml
        :caption: arcadia-virtualserver.yaml
        :emphasize-lines: 7,8

        apiVersion: k8s.nginx.org/v1
        kind: VirtualServer
        metadata:
        name: vs-arcadia
        spec:
        host: k8s.arcadia-finance.io
        policies:
        - name: waf-policy
        upstreams:
            - name: main
            service: main
            port: 80
            - name: backend
            service: backend
            port: 80
            - name: app2
            service: app2
            port: 80
            - name: app3
            service: app3
            port: 80
        routes:
            - path: /
            action:
                pass: main
            - path: /files
            action:
                pass: backend
            - path: /api
            action:
                pass: app2
            - path: /app3
            action:
                pass: app3

#.  Run these commands in order to create the NAP policy, the log profile and the ingress object (the object routing the traffic to the right service)

    .. code-block:: BASH

        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/deploy_policy_and_logs.yaml
        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/waf-policy.yaml
        kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/arcadia-virtualserver.yaml


    .. note:: These commands will create the WAF policy and the log profile for Arcadia App, and will create the VirtualServer resource (the config to route the traffic to the right services/pods)

#.  Open ``Kubernetes Dashboard`` bookmark in the browser.
#.  Scroll down on the left to ``Custom Resource Definitions`` and click it.
#.  See the various custom resources we've configured (VirtualServer, APPolicy, Policy, APLogConf)

    .. image:: ../pictures/CRDs.png
       :align: center


       **Run Tests Against the KIC**

#. In the browser, click ``Arcadia links>Arcadia k8s ingress node1`` bookmark
#. You are now connected to the Arcadia App through the Kubernetes Ingress Controller with NAP.
#. Send an attack (like a XSS in the address bar) by appending ``?a=<script>``
#. Open ``Kibana`` bookmark and click on ``Discover`` to find the log

.. image:: ../pictures/lab1/kibana_WAF_log.png
   :align: center
