Step 1 - Deploy and publish Arcadia Finance application in Kubernetes
#####################################################################

It's time to deploy Arcadia Finance application :)

**Deploy Arcadia Application with kubectl command**

With Kubernetes, there are several ways to deploy containers (pods). One way is to use ``kubectl`` command with a YAML manifest file.
I prepared this YAML file below (this is a portion of it below showing the main app container). You can have a look, and see it will deploy containers from my Gitlab.com repo.

.. code-block:: YAML

    apiVersion: v1
    kind: Service
    metadata:
    name: main
    namespace: default
    labels:
        app: main
    spec:
    type: NodePort
    ports:
    - name: main-80
        nodePort: 30511
        port: 80
        protocol: TCP
        targetPort: 80
    selector:
        app: main
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
    name: main
    namespace: default
    labels:
        app: main
        version: v1
    spec:
    replicas: 1
    selector:
        matchLabels:
        app: main
        version: v1
    template:
        metadata:
        labels:
            app: main
            version: v1
        spec:
        containers:
        - env:
            - name: service_name
            value: main
            image: registry.gitlab.com/arcadia-application/main-app/mainapp:latest
            imagePullPolicy: IfNotPresent
            name: main
            ports:
            - containerPort: 80
            protocol: TCP
    ---

.. note:: This file contains all the deployments for the entire Arcadia appication. 

**Steps :**

    #. RDP to the jumphost as ``user:user`` credentials
    #. SSH to cicd VM. You can use vscode, Windows terminal, or UDF Web shell the command is ``ssh ubuntu@cicd`` (if you use use Web SSH, make sure to ``cd /home/ubuntu/``)
    #. Run this command ``kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/arcadia-deployments.yaml``
    #. Open Firefox Browser
    #. Open Kubernetes Dashboard bookmark (if not already opened)
    #. Click ``skip`` on the logon page
    #. You should see the  and the pods


.. image:: ../pictures/lab3/arcadia-deployments.png
   :align: center


.. warning:: Arcadia Application is running but not yet available for the customers. We need to create a Kubernetes service to expose it.

**Video of this lab (force HD 1080p in the video settings)**

.. raw:: html

    <div style="text-align: center; margin-bottom: 2em;">
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/Qb5YyQrc7mk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

