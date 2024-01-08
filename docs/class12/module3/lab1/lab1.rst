Kubernetes Troubleshooting
==========================

.. code-block:: bash
   :caption: Explain

   kubectl explain
   
.. code-block:: bash 
   :caption: Describe

   kubectl describe pod <container_name> -n <namespace>

.. code-block:: bash 
   :caption: Events

   kubectl get events -n <namespace>

.. code-block:: bash 
   :caption: Logs

   kubectl logs <pod_name> -n <namespace>


.. code-block:: bash 
   :caption: Shell

   kubectl exec -it <pod_name> -n <namespace> -- /bin/bash

For this next Troubleshooting exercise you'll deploy a special *dnsutils* container image.

.. code-block:: bash
   :caption: DNSUTILS

   kubectl run dnsutils --image=registry.k8s.io/e2e-test-images/jessie-dnsutils:1.3 --restart=Always -n test -- /bin/bash -c "sleep infinity"

Once deployed and running, you can execute *dig* commands from inside the cluster using the dnsutils tools.

.. code-block:: bash
   :caption: DNS dig

   kubectl exec -it dnsutils -n test -- dig lab-deploy-svc.test.svc.cluster.local