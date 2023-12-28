Kubernetes Components
=====================


NODE
----

Nodes are the primary compent of a Kubernetes cluster. We will talk about the two types of nodes found in every cluster. A *worker node* and a *leader node*.
You will see the leader node referred to by different names (depending on documentation) but the process is all the same. Nodes can be bare metal, virtual
machines, or even containers (used in development use cases). Worker nodes will run your containerized workloads while the leader nodes will handle 
scheduling of where workloads will be deployed, configuration and state of the cluster. 

.. code-block:: bash 
   :caption: Get Nodes 

   kubectl get nodes 


.. code-block:: bash 
   :caption: Get Nodes 

   kubectl get nodes -o wide

POD 
---


