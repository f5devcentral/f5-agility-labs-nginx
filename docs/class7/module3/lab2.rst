Lab 3.2 - Adding the RKE cluster to the Management tool
=======================================================

In this Lab you will use the information from the previous screen to add the RKE cluster to Rancher. You will use the provided cli clips along with information from the cluster's config file to complete the process.

.. important::

    You will only be using the FIRST and LAST options on the add cluster screen do not use the middle option.

.. note::

    In line with the rest of this training, you will be using the bare minimum to complete adding the RKE cluster. In a full production environment, a few additional prerequisites would be required to ensure a secure deployment. Those can be found in the documentation on Rancher's website.

Complete the following
----------------------

Click the copy button for the first code snippet provided, it should look like this.

.. code-block:: bash

    kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user [USER_ACCOUNT]

Paste the above command into the VSCode cli then locate the
kube_config_rke-cluster.yaml in the Rancher VSCode repo and find the user
account under context. It should look like this.

.. code-block:: yaml

    contexts:
    - context:
        cluster: "rke-cluster"
        user: "kube-admin-rke-cluster"
    name: "rke-cluster"
    current-context: "rke-cluster"
    users:
    - name: "kube-admin-rke-cluster"

Replace [USER_ACCOUNT] in the pasted command line with the text between
the quotes e.g. kube-admin-rke-cluster . It should look like the example below

.. code-block:: bash

    kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user kube-admin-rke-cluster

Next go back the the browser and click the copy button for the last cli
option. We will not be using the middle option as we are running with self
signed certs for this example. It should look similar to this.

.. important::

    The cli below is for example only you must use the one provided in the last cli option on the add cluster screen. Each time you add a cluster this cli is uniquely generated.

.. code-block:: bash

    curl --insecure -sfL https://rancher.demo.example/v3/import/m672vckj6zhfs725xwnt9ln5nk66s57q8fvlhwpnwscs75xjtvhddz.yaml | kubectl apply -f -


Once run, this will add the RKE cluster to the Rancher Management. Continue to
wait, it will automatically go back to the Rancher main page. You should
now see the RKE cluster in the list. When the cluster has been imported you should see an active indicator next to the cluster name.

Once the RKE cluster has been added, you can now click on the "rke-cluster" link in the Global clusters page and have a look around the newly added cluster. 

Recap
-----
You now have the following:

- Added a cluster role binding for the RKE cluster.
- Imported the RKE cluster into the Rancher Manager.
- Reviewed the user interface for the newly added RKE cluster.

Next in Module 4 you will have a look around the Rancher catalog and add the NGINX Plus Kubernetes Ingress Controller to the RKE cluster.
