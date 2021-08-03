Step 2 - Publish Arcadia app with Kubernetes NodePort
#################################################################

It's time to make the Arcadia application available externally from the Kubernetes cluster.

**Expose Arcadia with NodePort**

Now that the Arcadia App is running in the Kubernetes Cluster. We need a solution to expose it externally (using the Kubernetes nodes IP addresses) and routing the packets to the right pods (main, back, app2, app3)

To do so, we have a yaml manifest to apply with ``kubectl``.

**Steps:**

    #. Use the CICD VM in any of the provided tools (vscode / windows terminal (right click the shortcut on taskbar) / WebSSH and ``cd /home/ubuntu/``
    #. Run this command ``kubectl apply -f /home/ubuntu/lab-files/arcadia-yaml/arcadia-deployments-and-services.yaml``

.. note:: We have deployed the "main" service on NodePort 30511, which means that the application is accessible as http://k8s.arcadia-finance.io:30511/ (in this case, the fqdn is pointing to the IP of one of the nodes). Will we use this later as our target for the NGINX App Protect deployments on a VM and as a docker container.

.. note:: Arcadia is now available via the NodePort, but not protected.

**Steps:**

    #. In the Browser, click on the bookmark ``Aracdia Links>Arcadia NodePort``
    #. Click on ``Login``
    #. Login with ``matt:ilovef5``
    #. You should see all the apps running (main, back, app2 and app3)
    #. add "/?<script>" to the end of the URL in the address bar and see that it is not blocked


.. image:: ../pictures/arcadia-app.png
   :align: center
