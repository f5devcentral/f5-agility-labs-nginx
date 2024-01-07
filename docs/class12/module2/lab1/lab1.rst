Kubernetes - Operations 
=======================

.. image:: images/k8s_service.png
   :align: center


Now that we've covered the core components of Kubernetes, it's time to put it into operation. In this module you'll create Pods, Deployments, and Services. Creating a pod in Kubernetes 
is not a lot different than what we did in the last module when we ran the *podman run* command. When Kubernetes gets the run command, it will first look to see 
if the image is held locally on the cache by the Kublet

Operations - Container registry
-------------------------------

We'll briefly talk about *container registries*. A container registry is a storage area for storing container images. Most commonly used id Docker Hub, as we have used that registry
during this class. When you return to your jobs however, your company will most likely use a private contianer registry. Hosted in one of the cloud service providers, Github or Gitlab, and 
with some access controls. In Kubernetes this is done with a *docker-registry* secret. A secret is another Kubernetes object used for storing sensitive information.

In this class, you'll not have to set any of this up.

|
- `Kubernetes Secret <https://kubernetes.io/docs/concepts/configuration/secret/>`_
- `Kubernetes Private Registry <https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/>`_

Operations - Pod
----------------

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

| **apiVersion** determines what version of the API will be used for creation
| **kind** specifies the type of object to be created and is defined in the apiVersion
| **metadata** describes information of an object that allows for the unique identification of that object
| **spec** defines the desired state of the object in Kubernetes
| **containers** specifies the containers to be built inside the pod
| **name** defines the name of the container
| **image** defines what image to use
| **ports** defines what ports the container will listen on

|
A helpful resource to check for this lab is the *api-resource*. Here you can see object type (kind), what it's *shortname* is and the *apiVersion* associated. The shortname is 
very useful to save in typing and for those of you continuing on and take the Certified Kubernetes Administrator (CKA) certification. 
|
.. code-block:: bash
   :caption: API Resources

   kubectl api-resources

Now, back to creating pods. You can use the *dry-run=client* feature to have Kubernetes write the manifest for you. This process allows you run your Kubernetes command without submitting it to the cluster.

.. code-block:: bash
   :caption: Pod Dry Run

   kubectl run dryrun --image=nginx --dry-run=client -o yaml

Notice the *-o* output flag. You can also ask Kubernetes to output *json* format as well. You can also direct the output to a file by using ``>``. An example would be ``kubectl run dryrun --image=nginx --dry-run=client -o yaml > pod_manifest.yaml``.


- `Kubernetes Pod <https://kubernetes.io/docs/concepts/workloads/pods/>`_

Operations - Deployment
-----------------------

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

.. code-block:: bash
   :caption: Scale

   kubectl scale --replicas=3 deployment/demo-deployment

- `Kubernetes Deployment <https://kubernetes.io/docs/concepts/workloads/controllers/deployment/>`_

Operations - Service
--------------------

.. code-block:: bash
   :caption: Service

   kubectl expose deployment <deployment_name> --type=ClusterIP --port=8080 --target-port=80 --name=nginx-clusterip-svc

- `Kubernetes Service <https://kubernetes.io/docs/concepts/services-networking/service/>`_

Operations - Ingress
--------------------