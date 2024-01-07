Kubernetes - Operations 
=======================


Now that we've covered the core components of Kubernetes, it's time to put it into operation. In this module you'll create Pods, Deployments, and Services. Creating a pod in Kubernetes 
is not a lot different than what we did in the last module when we ran the *podman run* command. When Kubernetes gets the run command, it will first look to see 
if the image is held locally on the cache by the Kublet

Container registry 
- pull process 

.. image:: images/k8s_service.png
   :align: center

.. code-block:: bash
   :caption: Pod Creation 

   kubectl run testpod --image 

.. code-block:: yaml
   :caption: Pod Manifest 

   apiVersion: v1
   kind: Pod
   metadata:
     name: nginx
   spec:
     containers:
     - name: nginx
       image: nginx:1.14.2
       ports:
       - containerPort: 80

| **apiVersion**
| **kind**
| **metadata**
| **spec**
| **containers**
| **name**
| **image**
| **ports**

Or, you can use the *dry-run* feature to have Kubernetes write the manifest for you:

.. code-block:: bash
   :caption: Dry Run

   kubectl run dryrun --image=nginx --dry-run -o yaml

- `Kubernetes Pod <https://kubernetes.io/docs/concepts/workloads/pods/>`_

.. code-block:: bash 
   :caption: Deployment 

   kubectl create deployment my-dep --image=nginx --replicas=3

.. code-block:: bash
   :caption: Deployment Manfiest 

   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: nginx-deployment
     labels:
       app: nginx
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: nginx
     template:
       metadata:
         labels:
           app: nginx
       spec:
         containers:
         - name: nginx
           image: nginx:1.14.2
           ports:
           - containerPort: 80

- `Kubernetes Deployment <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>`_