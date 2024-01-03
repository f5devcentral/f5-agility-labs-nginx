Kubernetes Components
=====================


Node
----

Nodes are the primary component of a Kubernetes cluster. We will talk about the two types of nodes found in every cluster. A *worker node* and a *leader node*.
You will see the leader node referred to by different names, such as master node (depending on documentation), but the process is all the same. Nodes can be bare metal, virtual
machines, or even containers (used in development use cases). Worker nodes will run your containerized workloads while the leader nodes will handle 
scheduling of where workloads will be deployed, configuration and state of the cluster. 

In this course, the cluster is already set up for you. You will communicate with the leader node to perform all actions for this course. The Kubernetes 
specific command-line tool you'll use is *kubectl*. Kubectl allows you to view, configure, inspect all aspects of the cluster.

Let's look at our two node types in detail.

.. image:: images/kube_cluster.png

The *Leader Node* is in charge of the cluster control plane. There must be at least, but not limited to, one leader node per cluster. Some of the components included in the leader
node are the API server and Scheduler. The API server validates and configures the cluster for all the cluster objects. This includes pods, services and deployments. The scheduler watches for newly created pods and determines the best matching node(s) to place the workload on. If there aren't any nodes 
matching the requirements of the pod, the pod will remian in an *unscheduled* state. 


The *Worker Node* is where our containerized workloads will run in our data plane. The worker nodes will need a container runtime engine (CRE) such as *Docker* or *containerd*
so our containers can be run. In order for the leader node to communicate to our worker node an agent called *Kubelet* must also run. Kublet is responsible for pulling container 
images, allows control plane to monitor the node, and ensures containers are healthy and running. 

.. note:: Keep in mind that in a dev environment, your leader node may also be your worker node (not a production practice).


Let's view the nodes attached to our cluster by connecting to the Jumphost from within the lab environment. 

.. image:: images/jumphost_webshell.png


From the web shell you will ssh into the leader node, ``ssh lab@10.1.1.5``, password is: ``f5AppW0rld!``.


.. code-block:: bash 
   :caption: Get node info

   kubectl get nodes 

Returned content:

.. code-block:: 
   :caption: Node data basic 

    NAME                       STATUS   ROLES                  AGE    VERSION
    k3s-leader.lab             Ready    control-plane,master   308d   v1.25.6+k3s1
    k3s-worker-2.lab           Ready    <none>                 308d   v1.25.6+k3s1
    k3s-worker-1.lab           Ready    <none>                 308d   v1.25.6+k3s1


That was very basic information on our nodes, but if we want more details we can add the `-o` flag, for *output*, and add `wide`

.. code-block:: bash 
   :caption: Get node info wide 

   kubectl get nodes -o wide

Returned content:

.. code-block:: 
   :caption: Node data wide 

    NAME                       STATUS   ROLES                  AGE    VERSION        INTERNAL-IP   EXTERNAL-IP   OS-IMAGE             KERNEL-VERSION    CONTAINER-RUNTIME
    k3s-leader.lab             Ready    control-plane,master   308d   v1.25.6+k3s1   10.1.1.5      <none>        Ubuntu 20.04.5 LTS   5.15.0-1030-aws   containerd://1.6.15-k3s1
    k3s-worker-2.lab           Ready    <none>                 308d   v1.25.6+k3s1   10.1.1.7      <none>        Ubuntu 20.04.5 LTS   5.15.0-1030-aws   containerd://1.6.15-k3s1
    k3s-worker-1lab            Ready    <none>                 308d   v1.25.6+k3s1   10.1.1.6      <none>        Ubuntu 20.04.5 LTS   5.15.0-1030-aws   containerd://1.6.15-k3s1

As you can see from the *-o wide* flag, we can get greater detail on our nodes. We can get further details by asking kubectl to *describe* the resource type and resource name.

.. code-block:: bash 
   :caption: Node describe 

   kubectl describe node k3s-leader.lab


Custom Resource
---------------

As the name implies, custom resources are objects you can build to extend capabilities in Kubernetes. You can create new resources that don't exist in the default
Kubernetes installation or even combine existing objects so they can be deployed at the same time. Throughout this course you'll be interacting with the Kubernetes 
API when we check on nodes, pods, namespaces etc. 

How you define the custom resource is by a Custom Resource Definition(CRD). This CRD will create a new RESTful endpoint that will be able to be utilized on either 
a namespace level or cluster level. 

Let's view the installed CRD's and we'll focus in on Nginx.

.. code-block:: bash
   :caption: CRD

   kubectl get crd


.. code-block:: bash
   :caption: CRD Output
   :emphasize-lines: 24

   lab@k3s-leader:~$ k get crd
   NAME                                         CREATED AT
   addons.k3s.cattle.io                         2023-02-23T02:26:32Z
   helmcharts.helm.cattle.io                    2023-02-23T02:26:32Z
   helmchartconfigs.helm.cattle.io              2023-02-23T02:26:32Z
   analysisruns.argoproj.io                     2023-02-23T03:39:17Z
   analysistemplates.argoproj.io                2023-02-23T03:39:17Z
   clusteranalysistemplates.argoproj.io         2023-02-23T03:39:17Z
   experiments.argoproj.io                      2023-02-23T03:39:17Z
   rollouts.argoproj.io                         2023-02-23T03:39:17Z
   applications.argoproj.io                     2023-02-23T04:18:30Z
   applicationsets.argoproj.io                  2023-02-23T04:18:30Z
   appprojects.argoproj.io                      2023-02-23T04:18:30Z
   apdospolicies.appprotectdos.f5.com           2023-02-25T20:46:34Z
   apdoslogconfs.appprotectdos.f5.com           2023-02-25T20:46:34Z
   globalconfigurations.k8s.nginx.org           2023-02-25T20:46:34Z
   aplogconfs.appprotect.f5.com                 2023-02-25T20:46:34Z
   transportservers.k8s.nginx.org               2023-02-25T20:46:34Z
   dosprotectedresources.appprotectdos.f5.com   2023-02-25T20:46:34Z
   dnsendpoints.externaldns.nginx.org           2023-02-25T20:46:34Z
   apusersigs.appprotect.f5.com                 2023-02-25T20:46:34Z
   policies.k8s.nginx.org                       2023-02-25T20:46:34Z
   virtualserverroutes.k8s.nginx.org            2023-02-25T20:46:34Z
   virtualservers.k8s.nginx.org                 2023-02-25T20:46:34Z
   appolicies.appprotect.f5.com                 2023-02-25T20:46:34Z

.. code-block:: bash
   :caption: Describe CRD

   kubectl describe crd virtualservers.k8s.nginx.org 

This CRD file defines how a user can employ the newly created resource with a full schema. If you are not familiar with schema's, think of it as syntax checking process to make sure newly created 
manifest files meet the defined specification to be deployed on the Kubernetes system. We will not be building any Custom Resources in this lab but knowing what Custom Resources are and that Custom
Resource Definitions describe them is valuable knowledge. This capability allows you and companies like F5 to greatly extend functions and capabilities of your cluster or products made to interact with 
applications. 

This particual CRD allows users of the VirtualServer resource to fully utilize Nginx capabilities that are not available in a standard ingress manifest or would require service mesh 
capabilities.

Namespaces
----------

In Kubernetes, namespaces provides a mechanism for isolating groups of resources within a single cluster, think of *sub-clusters*. Names of resources need to be unique within a namespace, but not across namespaces. Namespaces cannot be nested inside one another and each Kubernetes resource can only be in one namespace.

Namespaces are intended for use in environments with many users spread across multiple teams, or projects. For clusters with a few to tens of users, you should not need to create or think about namespaces at all. Start using namespaces when you need the features they provide.


.. code-block:: bash 
   :caption: View All Namespaces

   kubectl get namespace

You can abbreviate resource types. The *namespace* resource can be abbreviated as **ns** as shown below.

.. code-block:: bash 
   :caption: View kube-system Namespaces

   kubectl describe ns kube-system

For this part of the lab, we'll just cover two important namespaces:

- **default**
- **kube-system** 

.. code-block:: bash
   :caption: default

   kubectl get all,crd

Let's look at the *default* namespace first, because it's just default. Any time you do **not explicitly** declare the namespace it is implied default. So you always want
to get into the habit of adding the namespace flag ``-n`` with the corresponding namespace. Having said all that, you will find out that some resources do indeed live in 
the default namsespace. One item that you'll find in the default namespace are CRD's.


.. code-block:: bash
   :caption: kube-system

   kubectl get all -n kube-system

Next is the *kube-system* namespace. This namespace is important as a vital Pod is running here, CoreDNS. Referencing the returned data below, we can see the CoreDNS 
objects in the namespace kube-system.



.. code-block:: bash 
   :caption: CoreDNS
   :emphasize-lines: 4,8,13

   lab@k3s-leader:~$ k get all -n kube-system
   NAME                                          READY   STATUS    RESTARTS      AGE
   pod/local-path-provisioner-79f67d76f8-7bs59   1/1     Running   9 (15m ago)   5d9h
   pod/coredns-597584b69b-5fb2r                  1/1     Running   9 (15m ago)   5d9h
   pod/metrics-server-5f9f776df5-df9cx           1/1     Running   9 (15m ago)   5d9h

   NAME                     TYPE        CLUSTER-IP     EXTERNAL-IP   PORT(S)                  AGE
   service/kube-dns         ClusterIP   10.43.0.10     <none>        53/UDP,53/TCP,9153/TCP   314d
   service/metrics-server   ClusterIP   10.43.207.69   <none>        443/TCP                  314d

   NAME                                     READY   UP-TO-DATE   AVAILABLE   AGE
   deployment.apps/local-path-provisioner   1/1     1            1           314d
   deployment.apps/coredns                  1/1     1            1           314d
   deployment.apps/metrics-server           1/1     1            1           314d

   NAME                                                DESIRED   CURRENT   READY   AGE
   replicaset.apps/local-path-provisioner-79f67d76f8   1         1         1       314d
   replicaset.apps/coredns-597584b69b                  1         1         1       314d
   replicaset.apps/metrics-server-5f9f776df5           1         1         1       314d

The next three sections will reference data from the above output.

Pod
---

In Kubernetes, a Pod is the smallest unit

Deployment 
----------



Service
-------

How to determine A record 
- Loadbalancer
- ClusterIP
- NodePort
- Brief CNI 
