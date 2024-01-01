Kubernetes Troubleshooting
==========================


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