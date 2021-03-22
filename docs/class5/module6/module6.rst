Module 6 - Advanced features
############################

In this class, we will advanced features offered by the latest NAP release.

#. Bot Protection
#. Cryptonice integration
#. A.WAF/ASM Policy converter
#. gRPC Protection

|

First of all, for this Class, it is important to un-deployed the NAP Ingress Controller deployed with Helm, because we will use the CentOS instance for the next 3 modules.

**Steps**

   #.  SSH from Jumpbox commandline ``ssh ubuntu@10.1.1.8`` (or WebSSH and ``cd /home/ubuntu/``) to CICD Server
   #.   Run this command in order to delete the previous NAP Ingress Controller

         .. code-block:: bash

            helm uninstall nginx-ingress -n nginx-ingress
            kubectl apply -f /home/ubuntu/k8s_ingress/deploy_policy_and_logs.yaml
            kubectl apply -f /home/ubuntu/k8s_ingress/ingress_arcadia_nap.yaml

   #. Now, re-deploy the NginxPlus Ingress without NAP

         .. code-block:: bash

            kubectl apply -f /home/ubuntu/k8s_ingress/full_ingress_arcadia.yaml



.. warning:: In this lab, there are cert + keys to download the packages from official NGINX repo. It is forbidden to share them with anyone.

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

