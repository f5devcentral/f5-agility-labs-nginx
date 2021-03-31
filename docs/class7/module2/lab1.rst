Lab 2.1 - Setting up the Cluster YAML file
==========================================

To being the installation please locate the "cluster.yaml" in the rancher repo.
It is recommended that you make a duplicate of the cluster yaml and name
it something appropriate to the cluster in this case it will be named
"rke-cluster.yaml" which will be the name of the demo RKE cluster the the Rancher managment tool.

Complete the following
----------------------

Start by editing the "rke-cluster.yaml" This will be a three node
cluster the three IP addresses for our nodes will need to be aded to the
cluster.yaml. The UDF pattern has three nodes already set up, those are
listed below and their IP addresses can be found in the primary
description area of the UDF pattern as well.

**RKE Control Node**

.. code-block:: bash

   10.1.1.6

**RKE Worker Nodes**

.. code-block:: bash

   10.1.1.7
   10.1.1.8

The rke-cluster.yaml should now look like this

.. code-block:: yaml

    cluster_name: rke-cluster

    nodes:
    - address: 10.1.1.6
        internal_address: 10.1.1.6 # Optional if the Machines use a different IP from the Public IP
        user: ubuntu                       # username. you must have ssh access to the Server
        role: [controlplane,worker,etcd]
    - address: 10.1.1.7
        internal_address: 10.1.1.7 # Optional if the Machines use a different IP from the Public IP
        user: ubuntu                       # username. you must have ssh access to the Server
        role: [worker]
    - address: 10.1.1.8
        internal_address: 10.1.1.8 # Optional if the Machines use a different IP from the Public IP
        user: ubuntu                       # username. you must have ssh access to the Server
        role: [worker]

    services:
    etcd:
        snapshot: true
        creation: 6h
        retention: 24h

    ingress:
    provider: none

    # ingress:
    #   provider: nginx
    #   options:
    #     use-forwarded-headers: "true"

.. note::

    I have left in the original text for deploying the upstream version of nginx ingress to show that it was removed at the creation of the cluster to make room for deploying the NGINX pluss KIC soltuion via the Rancher catalog.

Recap
-----
You now have the following:

- Reviewed the anatomy of the cluster.yaml file.
- Created a new cluster.yaml named rke-cluster.yaml.
- added the IP addressed to the rke-cluster.yaml file of our target nodes.

Next you will deploy the RKE cluster using our new yamnl file.