Step 1 - Deploy and publish API sentence application in Kubernetes
##################################################################

It's time to deploy API Sentence application :)

**Deploy API Sentence micro-services with kubectl command**

With Kubernetes, there are several ways to deploy containers (pods). One way is to use ``kubectl`` command with a YAML deployment file (manifest).

I prepared a YAML manifest file ``attributs_without_colors.yaml``, and please see an extract below (this is only for the ``adjectives`` micro-services). You can have a look, and see it will deploy container image from my Gitlab.com repo.

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

#. RDP to the Win10 Jumphost with ``user:user`` as credentials
#. SSH from jumphost commandline ``ssh ubuntu@10.1.1.8`` (or WebSSH and ``cd /home/ubuntu/``) to Docker (k3s + Rancher)
    #. Run ``sudo su``
    #. Run this command ``kubectl apply -f /home/ubuntu/k3s/attributs_without_colors.yaml -n api``
    #. Run this command ``kubectl apply -f /home/ubuntu/k3s/generator-direct.yaml -n api``
#. Open Edge Browser
#. Open Rancher Dashboard bookmark (if not already opened)
#. Login as ``admin:admin``
#. Click on ``Cluster Explorer`` yellow button on top right corner
#. On the left menu, select Deployments. You can see the deployments running in each NameSpace.
   
   .. image:: ../pictures/lab2/rancher-deployments.png
      :align: center

#. On the left menu, select Services. You can see the services with the NodePorts running in each NameSpace.
   
   .. image:: ../pictures/lab2/rancher-services.png
      :align: center

|

    As you can notice, the ``COLORS`` micro-service is not yet deployed. This is on purpose. On the API version v1.0, DevOps didn't finished this micro-services.
    It means the API Sentence app will generate a sentence without the color word. 

    And we already deployed for you the FrontEnd micro-service through a Nginx Ingress Controller.
