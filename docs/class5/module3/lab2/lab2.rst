Install NGINX App Protect on the Arcadia App in Kubernetes
==========================================================

1. On the jump host, use the **Applications** menu bar to launch **Visual Studio Code**.

.. caution:: It may take several seconds for Visual Studio Code to launch for the first time.

2. In **Visual Studio Code**, navigate to **File** > **Open Folder**. 

.. image:: images/VSCode_openFolder.png

3. Select **arcadia**, then click **Open** in the top-right corner of the navigation window.

.. image:: images/VSCode_selectArcadia.png

4. Now under the **manifest** directory, we can view the manifests **arcadia-deployment.yml**, **arcadia-svcs.yml**, and **arcadia-vs.yml** files. For this lab we will be focused on the **arcaida-vs.yml** manifest file.

.. image:: images/arcadia_deployment.png

.. image:: images/arcadia_svc.png

.. image:: images/arcadia-vs.png

.. image:: images/arcadia-ingres.png

.. image:: images/grafana.png

.. image:: images/kic-nap-config.png

.. image:: images/nginx-plus-dashboard-upstreams.png

.. image:: images/nginx-plus-dashboard.png

This step is optional, the ingress controller has already been deployed to save time and focus on the items that are specific to configuring NGINX App Protect.

That said, if you are interested in the topology or deploying the ingress controller, please continue on with this step. Otherwise you can skip to module 5: protecting API workloads.

The previous exercises were designed to show what is possible and give examples of how to configure NAP. Using these principles, we can move our NAP configurations to Kubernetes.

In this step, instead of using a VM or docker container with NGINX App Protect to proxy to a NodePort on our cluster, we will deploy the NGINX Kubernetes Ingress Controller (KIC) which will proxy to a ClusterIP of the Arcadia services. A ClusterIP is only accessible internally to the cluster. By using the ClusterIP, we force all requests to go through the KIC.

Generally, we would deploy the ingress controller behind a L4/L7 load balancer to spread the load to all of the ingress controller PODs, as depicted on the right side of this image. In this lab, we will target the KIC Service NodePort directly with our browser (without the L4 LB/LTM in red).

.. image:: images/arcadia-topology.png
   :align: center

At a high-level we will:

#. Use helm to deploy the Ingress controller that has been saved to the registry running on our docker host
#. Deploy a new "ingress configuration" using a Custom Resource Definition (CRD) specifically created by NGINX to extend the basic capability of the standard Kubernetes "Ingress" resource. This "VirtualServer" will tell the KIC pods to create the configuration necessary to access and protect our applications.

**Steps**

    #.  SSH to the k3s VM
    #.  Check the existing ``ingress`` already deployed and running. It is a NGINX OSS ingress

        .. code-block:: bash
          :caption: helm removal

            helm list

            NAME         	NAMESPACE	REVISION	UPDATED                                	STATUS  	CHART               	APP VERSION
            nginx-ingress	default  	8       	2022-12-05 14:01:51.734097641 +0000 UTC	deployed	nginx-ingress-0.15.2	2.4.2

    #.  To remove the existing ingress controller (it is a Nginx OSS ingress):

        .. code-block:: bash
          :caption: helm removal

            helm uninstall nginx-ingress

    #.  Run the following commands to install the NGINX Plus KIC helm chart in a new NameSpace ``ingress``:

        .. code-block:: bash
          :caption: helm install
 
            helm repo add nginx-stable https://helm.nginx.com/stable
            helm repo update
            
            helm install plus nginx-stable/nginx-ingress \
            --namespace ingress \
            --set controller.kind=deployment \
            --set controller.replicaCount=1 \
            --set controller.nginxplus=true \
            --set controller.image.repository=private-registry.nginx.com/nginx-ic-nap/nginx-plus-ingress \
            --set controller.image.tag=2.4.2 \
            --set controller.appprotect.enable=true \
            --set controller.serviceAccount.imagePullSecretName=regcred \
            --set controller.service.type=NodePort \
            --set controller.service.httpPort.nodePort=30080 \
            --version 0.15.2
        
        .. note:: As you can notice, with one helm command, the Ingress Controller pod will be deployed with all the required parameters (NAP enabled, NodePort 30080)

    #.  After running the command, we need to wait for the KIC pod to become available. you can use a command like:

        .. code-block:: BASH

           kubectl get pods --all-namespaces --watch

    #.  Once it we have 1/1 ``plus-nginx-ingress`` ready. You can press ``ctrl-c`` to stop the watch.

        .. image:: images/ingress-ready.png

    #. Now, it is time to configure the Ingress Controller with CRD ressources (WAF policy, Log profile, Ingress routing ...)

       #. Execute the following commands to deploy the different resources

          .. code-block:: bash

             cd /home/ubuntu/lab-files/ingress
             
             kubectl apply -f ap-dataguard-policy.yaml
             kubectl apply -f ap-logconf.yaml
             kubectl apply -f nap-waf.yaml
             kubectl apply -f virtual-server-waf.yaml

       #. The manifest ``ap-dataguard-policy.yaml`` creates the WAF policy

          .. code-block:: yaml

            apiVersion: appprotect.f5.com/v1beta1
            kind: APPolicy
            metadata:
            name: dataguard-alarm
            spec:
            policy:
                applicationLanguage: utf-8
                blocking-settings:
                violations:
                - alarm: true
                    block: false
                    name: VIOL_DATA_GUARD
                data-guard:
                creditCardNumbers: true
                enabled: true
                enforcementMode: ignore-urls-in-list
                enforcementUrls: []
                lastCcnDigitsToExpose: 4
                lastSsnDigitsToExpose: 4
                maskData: true
                usSocialSecurityNumbers: true
                enforcementMode: blocking
                name: dataguard-alarm
                template:
                name: POLICY_TEMPLATE_NGINX_BASE

       #. The manifest ``ap-logconf.yaml`` creates the Log Profile to send logs to ELK


          .. code-block:: yaml

            apiVersion: appprotect.f5.com/v1beta1
            kind: APLogConf
            metadata:
            name: logconf
            spec:
            content:
                format: default
                max_message_size: 64k
                max_request_size: any
            filter:
                request_type: all

       #. The manifest ``nap-waf.yaml`` creates the WAF config (policy + log)

          .. code-block:: yaml

            apiVersion: k8s.nginx.org/v1
            kind: Policy
            metadata:
            name: waf-policy
            spec:
            waf:
                enable: true
                apPolicy: "default/dataguard-alarm"
                securityLogs:
                - enable: true
                apLogConf: "default/logconf"
                logDest: "syslog:server=10.1.1.11:5144"


       #. The manifest ``virtual-server-waf.yaml`` creates the Ingress resource (to route the traffic and apply the WAF config)

          .. code-block:: yaml

            apiVersion: k8s.nginx.org/v1
            kind: VirtualServer
            metadata:
            name: vs-arcadia-no-waf
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

    #. Test the deployment with the Win10 Jumhost
    #. In the Chrome Arcadia Link bookmark, select ``WAF NGINX Ingress``
    #. Navigate and send attacks.