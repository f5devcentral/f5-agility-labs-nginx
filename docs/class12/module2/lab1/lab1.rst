Kubernetes - Operations 
=======================

.. image:: images/k8s_service.png
   :align: center


Now that we've covered the core components of Kubernetes, it's time to put it into operation. In this module you'll create Pods, Deployments, and Services. The image above depects how 
we tie all these components together. When Kubernetes gets the run command, it will first look to see if the image is held locally on the cache by Kubelet. If there is not a local image, Kubelet 
will *pull* the image from a container registry. Let's jump into the operational items that make Kubernetes run.

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

You'll create a new pod using the Kubernetes imperative command shown below. When creating pods, best practice is to specifically define the image tag (version) and not use *latest*.

.. code-block:: bash
   :caption: Pod Creation 

   kubectl run testpod --image=nginx:1.21 -n test


Now, verify your pod is running ``kubectl get pod -n test``. Once you have verified the pod is running, you'll delete the pod. ``kubectl delete pod testpod -n test``.

Vim is not known for being overly friendly to copy/paste commands. Rather than have you spend time doing that and making sure all the indentions are correct, let's 
review what the manifest file would look like to depoy our Nginx container in a pod called *testpod*.

.. note:: YAML is can be very fussy on indentation, please pay close attention

.. code-block:: yaml
   :caption: Pod Manifest 

   apiVersion: v1
   kind: Pod
   metadata:
     name: testpod
     namespace: test
   spec:
     containers:
     - name: nginx
       image: nginx:1.21
       ports:
       - containerPort: 80



Let's explain the directives from above.

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

   kubectl run dryrun --image=nginx:1.21 --port 80 -n test --dry-run=client -o yaml

Notice the *-o* output flag. You can also ask Kubernetes to output *json* format as well. You can also direct the output to a file by using ``>``. An example would be ``kubectl run dryrun --image=nginx --dry-run=client -o yaml > testpod.yaml``. Let's
try it out.

Now that your manifest file is ready, time to apply it to Kubernetes.

.. code-block:: bash
   :caption: Pod Dry Run

   kubectl run dryrun --image=nginx:1.21 --port 80 -n test --dry-run=client -o yaml > testpod.yaml


.. code-block:: bash
   :caption: Testpod manifest

   kubectl apply -f testpod.yaml 

Notice in the cli command we did not specify the namespace, that is because we defined the namespace in the manifest file. This is always a good practice to prevent pods from showing
up the default namespace.


One last step will walk through in this section is the *edit* command. To do this, we will edit the pod we've just created. Currently you are running *testpod* on an older version of 
Nginx. We will edit the manifest to update the version. 

.. code-block:: bash
   :caption: Edit

   kubectl edit pod testpod -n test

We will focus on this line in the returned data:

.. code-block:: bash
   :caption: Update
   :emphasize-lines: 3

   spec:
     containers:
     - image: nginx:1.21
       imagePullPolicy: IfNotPresent

Arrow your cursor down to the *image* line and press ``i``. This command allows you to edit the file. You'll be changing the tagged version from **1.20** to **1.25**. Once
this change is made use the vim write and quit command, press ``ESC`` (escape key), ``:wq``.

You should see the pod was edited.

.. code-block:: bash
   :caption: Edit

   pod/testpod edited

Now to verify the updated pod we'll use the describe command.

.. code-block:: bash
   :caption: Describe

   kubectl describe pod testpod -n test

Output from describe should look like the below. Showing Kubelet pulled the container image, created and started the container.

.. code-block:: bash
   :emphasize-lines: 7-10

    Events:
    Type    Reason     Age                  From               Message
    ----    ------     ----                 ----               -------
    Normal  Scheduled  6m47s                default-scheduler  Successfully assigned test/testpod to k3s-leader.lab
    Normal  Pulled     6m47s                kubelet            Container image "nginx:1.21" already present on machine
    Normal  Killing    104s                 kubelet            Container testpod definition changed, will be restarted
    Normal  Pulling    104s                 kubelet            Pulling image "nginx:1.25"
    Normal  Pulled     98s                  kubelet            Successfully pulled image "nginx:1.25" in 6.203075695s (6.203083694s including waiting)
    Normal  Created    98s (x2 over 6m47s)  kubelet            Created container testpod
    Normal  Started    97s (x2 over 6m47s)  kubelet            Started container testpod


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