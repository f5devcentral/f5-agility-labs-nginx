Lab 2.2 - Deploying the Cluster
===============================

In this lab we will be using the Rancher binary rke to bring up our cluster using the rke-cluster.yaml file we created in the last lab.

Complete the following
----------------------

When finished editing the "rke-cluster.yaml" run the following command to bring the baseline cluster up. This should take 2 - 3 minutes.

.. code-block:: bash

   rke up --config=./rke-cluster.yaml

After the install completes, copy over the config. This will allow you to use the local copy of kubectl to manipulate the cluster.

.. code-block:: bash

   cp kube_config_rke-cluster.yaml /home/ubuntu/.kube/config

.. note::

    Three files should now be present in your project rke-cluster.yaml which you created, as well as kube_config_cluster.yaml and rke-cluster.rkestate.  Both are currently called out of the gitignore file to ensure we do not commit them to the repo.

To test that we are ready to go, issue a simple kubectl command in the terminal window of VSCode to see if we get the correct return values.

.. code-block:: bash

    kubectl get nodes

The return value should look like the example below.

.. code-block:: bash

    NAME       STATUS   ROLES                      AGE    VERSION
    10.1.1.6   Ready    controlplane,etcd,worker   4d2h   v1.18.9
    10.1.1.7   Ready    worker                     4d2h   v1.18.9
    10.1.1.8   Ready    worker                     4d2h   v1.18.9

Recap
-----
You now have the following:

- Run rke up to deploy the cluster.
- Copied the cluster config to your .kube directory.
- Run a test command to validate that the cluster is running.

Next in Module 3 you will log into the Rancher management tool and add the RKE cluster to Rancher.
