Step 1 - Deploy and publish the API Sentence app in Kubernetes
##############################################################

It's now time to deploy the API Sentence app :)

With Kubernetes, there are several ways to deploy containers (pods). One way is to use the ``kubectl`` command with a YAML deployment file (manifest).

We have a YAML manifest file to deploy all the various API micro-services, ``attributs_without_colors.yaml``. You can find a short extract below (this is only for the ``adjectives`` micro-service), and see that it will deploy a container image from our GitLab repo:

.. code-block:: YAML

    ---
    apiVersion: v1
    kind: Service
    metadata:
    name: adjectives
    spec:
    type: NodePort
    ports:
    - port: 80
        nodePort: 31100
        targetPort: 8080
    selector:
        app: adjectives
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: adjectives
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: adjectives
    template:
        metadata:
        labels:
            app: adjectives
        spec:
        containers:
        - name: adjectives
            image: registry.gitlab.com/sentence-application/adjectives/volterra:latest
            imagePullPolicy: Always
            ports:
            - containerPort: 8080


**Steps :**

#. SSH (or WebSSH) to the ``Docker (k3s + Rancher + ELK)`` VM. Run the following commands to start up the Kubernetes cluster:

    .. code-block:: bash

       sudo su
       kubectl apply -f /home/ubuntu/k3s/attributs_without_colors.yaml -n api
       kubectl apply -f /home/ubuntu/k3s/generator-direct.yaml -n api

#. RDP to the ``Win10`` VM. Login by using ``user`` as both the user and the password credentials (you will need to use an RDP client):
   #. Open the ``Edge Browser`` and select the ``Rancher`` bookmark. If you get a ``Your connection isn't private`` warning, click ``Advanced`` -> ``Continue to <IP> (unsafe)``.
   #. Login into the ``Rancher`` dashboard by using ``admin`` as both the user and the password credentials.
   #. Click on the ``Cluster Explorer`` yellow button on the top right corner.
   #. On the left menu, select ``Deployments``. From here, you can see the ``Deployments`` running in each ``NameSpace``:

   .. image:: ../pictures/lab2/rancher-deployments.png
      :align: center

   #. On the left menu, select ``Services``. From here, you can see the ``Services`` running in each ``NameSpace``:

   .. image:: ../pictures/lab2/rancher-services.png
      :align: center

|

    As you can see, the ``Colors`` micro-service is not yet deployed. This is on purpose. DevOps didn't manage to finish this micro-service on time for this API's initial release, v1.0.
    As such, the API Sentence app will generate a sentence without a color.

    (For your interest -- we already deployed for you the ``Frontend`` micro-service through the NGINX Ingress Controller.)
