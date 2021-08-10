Step 2 - Publish Arcadia app with Kubernetes NodePort
#####################################################

It's time to make the Arcadia application accessible outside of the Kubernetes cluster.

**Expose Arcadia with NodePort**

Now that the Arcadia App is running in the Kubernetes Cluster. We need to expose it externally. In this example, we will make accessible directly (without an Ingress Controller) by using a Kubernetes NodePort.

To do so, we have a yaml manifest to apply with ``kubectl``.

**Steps:**

    #. Use the CICD VM in any of the provided tools (vscode / windows terminal (right click the shortcut on taskbar) / WebSSH)
    #. Run this command ``kubectl apply -f /home/ubuntu/lab-files/arcadia-manifests/arcadia-services-nodeport.yaml``

.. code-block:: YAML
    apiVersion: v1
    kind: Service
    metadata:
    name: backend
    namespace: default
    labels:
        app: backend
        service: backend
    spec:
    type: NodePort
    ports:
    - port: 80
        nodePort: 30584
        protocol: TCP
        targetPort: 80
        name: backend-80
    selector:
        app: backend
    ---

.. note:: Arcadia is now available via the NodePorts for each service, but not protected. In the following steps we will create an NGINX instance to protect it.
