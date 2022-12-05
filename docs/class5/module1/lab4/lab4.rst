Step 1 - Deploy Arcadia Finance application in Kubernetes
#########################################################

This step is not required. The Arcadia application is already deployed so that each module could be done independently. It is still here in case you are interested in how it was deployed. You can run the commands below, it will not harm anything.

**Check Arcadia Application deployed**

#. RDP to Win10 Jumphost (credentials are user / user)
#. Open ``Lens`` application
#. On the left bar menu, click on ``DE`` - this is the default ``k3s`` cluster
#. Navigate to ``Workloads`` then ``Pods``

   .. image:: ../pictures/lab1/lens-1.png
     :align: center

   .. note:: You can see the 4 Arcadia Pods up and running, and the ingress controller to route the traffic to the right pods.


Step 2 - Expose Arcadia Finance application in Kubernetes
#########################################################

#. Navigate to ``Network`` then ``Services`` and check the NodePort used to expose Arcadia ingress

   .. image:: ../pictures/lab1/lens-2.png
     :align: center

   .. note:: The NodePort used to expose Arcadia is ``30080``

