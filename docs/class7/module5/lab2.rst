Lab 5.1 - Deploying the application
===================================

In this lab you will issue a series of kubectl commands to deploy the rancher demo application. Once deployed you will access the application URL to view the application's page.

Deploy the Rancher demo application
-----------------------------------

**Complete the following**

Create the deployment.

.. code-block:: bash

    kubectl apply -f deployment.yaml

Create the service.

.. code-block:: bash

    kubectl apply -f service.yaml

Create the ingress resource.

.. code-block:: bash

    kubectl apply -f ingress.yaml


To check that our application's containers have deployed use the commands below to validate. 

Change to the default namespace.

.. code-block:: bash

    kubens default

Get all in this namespace to view the application's elements.

.. code-block:: bash

    kubectl get all

Once these manifests have deployed, you can now navigate to the app.bddemo.udf link to access the demo site. This is bookmarked already in the browser.

.. note::
    If the site is not showing, use the command below to re-apply the netplan. Then refresh the site.

.. code-block:: bash

    sudo netplan apply

Recap
-----
You now have the following:

- You have deployed the demo app and ingress resource.
- Validated that you are able to access the demo site.
- You are now done with the main body of the training, congratulations!.

Next OPTIONAL deploy Prometheus and Grafana to our RKE cluster and add the Ingress Dash to Grafana.
