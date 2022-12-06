Step 13 - Protect Arcadia API with Kubernetes Ingress Controller
################################################################

.. note::  If you came to this lab directly (without doing the previous modules), everything will still work.

    A quick primer on Kubernetes extensibility and Custom Resource Definitions (CRD); (*)see links at the bottom of the page for more information-
    
    A CRD can be defined as a manifest that defines a collection of API objects to extend the K8s API beyond vanilla deployments. This allows configuration of extended functionality (like NGINX APP Protect) natively through kubectl.

#.  Review the below color-coded manifest which contain the mappings between the configuration items required for NAP.

    .. image:: ../pictures/arcadia-complete-app-protect-config.png
        :align: center

    In this manifest we have created 3 "Policies." We have a WAF policy for Threat Campaigns (1) that uses high accuracy signatures to block common threats. The Threat Campaign policy is applied at the root of the Arcadia site.
    
    The API security policy (2) uses a reference to the OpenAPI json file that is hosted on our Source Control Management tool (github). The API policy is applied to the appropriate URIs. https://raw.githubusercontent.com/nginx-architects/kic-example-apps/udf-bp/app-protect-openapi-arcadia/open-api-spec.json 

    .. note:: The Github repo contains the this entire example if you want to run it on your own cluster: https://github.com/nginx-architects/kic-example-apps 
    
    We also create a rate-limit policy (3) and applied to the /trading/rest URI. This will prevent bots and users from high-frequency trading! Rate-limiting is an important part of many API security strategies depending on the nature of the API. More detail on the configuration of this policy here: https://docs.nginx.com/nginx-ingress-controller/configuration/policy-resource/#ratelimit

#.  Open a terminal to the k3s VM, vscode is recommended. See the "Terminal" menu at the top of the screen.

    .. image:: ../pictures/ingress-controller-configuration.png
        :align: center

#.  Run these commands to create the policies, the logging profile and the ingress (VirtualServer) objects

    .. note:: The Custom Resource Definitions (CRD) were created by NGINX to extend the basic capability of the standard Kubernetes "Ingress" resource.

    - The **VirtualServer** resource is a new load balancing configuration, introduced in release 1.5 as an alternative to the Ingress resource. The resources enable use cases not supported with the Ingress resource, such as traffic splitting, advanced content-based routing, App Protect.

    - The **APPolicy** resource defines the WAF policy for App Protect to apply. The WAF policy is a YAML version of the standalone App Protect JSON‑formatted policy.

    - The **APLogConf** resource defines the logging behavior of the App Protect module.

    - The **Policy** resource allows you to configure features like access control and rate-limiting, which you can add to your VirtualServer and VirtualServerRoute resources.

    .. code-block:: BASH

        kubectl apply -n default -f /home/ubuntu/lab-files/arcadia-manifests/open-api/rate-limit.yaml
        kubectl apply -n default -f /home/ubuntu/lab-files/arcadia-manifests/open-api/threat-campaign-policy.yaml
        kubectl apply -n default -f /home/ubuntu/lab-files/arcadia-manifests/open-api/api-security-policy.yaml
        kubectl apply -n default -f /home/ubuntu/lab-files/arcadia-manifests/open-api/virtualserver-with-policies.yaml

#.  Run some tests to validate the APIs are protected:

    .. code-block:: BASH

        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/01-post-money-transfer.sh

    .. code-block:: BASH

        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/02-get-money-transfer.sh

    .. code-block:: BASH
        
        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/03-apache-struts2-rest-plugin-xstream-metasploit.sh

    .. code-block:: BASH

        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/04-drupalgeddon2-rce-muhstik.sh

    .. code-block:: BASH

        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/buy-stocks-post.sh

    .. code-block:: BASH
        
        /home/ubuntu/lab-files/arcadia-manifests/open-api/tests/buy-stocks-get.sh

    .. note:: Buy stocks GET fails because the API definition only allows a POST.

#.  Open the ``Rancher`` dashboard bookmark in the browser and login with admin/admin.
#.  Scroll down on the left to ``More Resources>k8s.nginx.org`` and ``More Resources>appprotect.f5.com``
#.  See the various custom resources we've configured (VirtualServer, APPolicy, Policy, APLogConf)

    .. note::  Other distributions of Kubernetes dashboards may look different, just look for the CRDs or Custom Resources.

  .. image:: ../pictures/CRDs.png
     :align: center

(*) https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/