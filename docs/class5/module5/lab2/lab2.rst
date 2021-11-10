Protect Arcadia API with Kubernetes Ingress Controller
######################################################

Just like we did with the

.. note::  Also: If you came to this lab directly (without doing the previous modules), everything will still work.

#.  Review the below color-coded manifest which contain the mappings between the configuration items required for NAP.

    .. image:: ../pictures/arcadia-complete-app-protect-config.png
        :align: center

    In this manifest we have created 3 "Policies." We have a WAF policy for Threat Campaigns (1) and one for our API. The Threat Campaign policy is applied at the root of our site and the API policy(2) is applied to the appropriate URIs.
    
    We also created a rate limit policy (3) and applied to the /trading/rest URI. This will prevent bots and users from high-frequency trading! Rate-limiting is an important part of many API security strategies depending on the nature of the API. More detail on the configuration of this policy here: https://docs.nginx.com/nginx-ingress-controller/configuration/policy-resource/#ratelimit

#.  Open a terminal to the Rancher VM (rke1), vscode is recommended. See the "Terminal" menu at the top of the screen.

    .. image:: ../pictures/ingress-controller-configuration.png
        :align: center

#.  Run these commands to create the policies, the logging profile and the ingress (VirtualServer) objects

    .. note:: The Custom Resource Definitions (CRD) were created by NGINX to extend the basic capability of the standard Kubernetes "Ingress" resource. This "VirtualServer" is very similar to a standard ingress definition with added fields to configure the additional functionality provided by NGINX Plus and App Protect.

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

    .. note::  Other distributions of kubernetes dashboards may look different, just look for the CRDs or Custom Resources.

  .. image:: ../pictures/CRDs.png
     :align: center

