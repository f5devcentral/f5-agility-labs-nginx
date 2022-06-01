Step 2 - Publish Arcadia app with Kubernetes ClusterIP
######################################################

It's time to make the Arcadia application accessible outside of the Kubernetes cluster.

**Expose Arcadia with ClusterIP**

Now that the Arcadia App is running in the Kubernetes Cluster. We need to expose it externally. In this example, we will make accessible by using a Kubernetes ClusterIP Service.

To do so, we have a yaml manifest to apply with ``kubectl``.

**Steps:**

    #. Use the Rancher VM in any of the provided tools (vscode / windows terminal (right click the shortcut on taskbar) / WebSSH)
    #. Run this command which will create a ClusterIP service for our Arcadia deployments 

        .. code-block:: BASH

            kubectl apply -f ~/lab-files/arcadia-manifests/arcadia-services-cluster-ip.yaml``

        .. code-block:: yaml

            apiVersion: v1
            kind: Service
            metadata:
            name: backend
            namespace: default
            labels:
                app: backend
                service: backend
            spec:
            type: ClusterIP
            ports:
            - port: 80
                protocol: TCP
                targetPort: 80
                name: backend-80
            selector:
                app: backend
            ---

    #. Create an Ingress for the Arcadia Application:

        .. code-block:: BASH

            kubectl apply -f ~/lab-files/arcadia-manifests/arcadia-virtualserver-no-waf.yaml


.. note:: Arcadia is now available via the hostname no-waf.arcadia-finance.io, but not protected. In the following steps we will use App Protect to protect it.
