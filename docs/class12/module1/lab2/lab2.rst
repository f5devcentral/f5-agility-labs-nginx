Kubernetes Components
=====================


NODE
----

Nodes are the primary compent of a Kubernetes cluster. We will talk about the two types of nodes found in every cluster. A *worker node* and a *leader node*.
You will see the leader node referred to by different names (depending on documentation) but the process is all the same. Nodes can be bare metal, virtual
machines, or even containers (used in development use cases). Worker nodes will run your containerized workloads while the leader nodes will handle 
scheduling of where workloads will be deployed, configuration and state of the cluster. 

In this course, the cluster is already set up for you. You will communicate with the leader node to perform all actions for this course. The Kubernetes 
specific command-line tool you'll use is *kubectl*. Kubectl allows you to view, configure, inspect all aspects of the cluster.

Let's view the nodes attached to our cluster.

.. code-block:: bash 
   :caption: Get Nodes 

   kubectl get nodes 

That was very basic information on our nodes, but if we want more details we can add the `-o` for *output* and add *wide*

.. code-block:: bash 
   :caption: Get Nodes 

   kubectl get nodes -o wide

POD 
---


