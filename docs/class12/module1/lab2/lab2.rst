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
node are the API server and Scheduler.


The *Worker Node* is where our containerized workloads will run in our data plane. The worker nodes will need a container runtime engine (CRE) such as Docker or containerd
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

As the name implies, custom resources are object you can build to extend capabilities in Kubernetes. 
A resource is an endpoint in the Kubernetes API that stores a collection of API objects of a certain kind; for example, the built-in pods 
resource contains a collection of Pod objects. A custom resource is an extension of the Kubernetes API that is not necessarily available in 
a default Kubernetes installation. It represents a customization of a particular Kubernetes installation. However, many core Kubernetes 
functions are now built using custom resources, making Kubernetes more modular.

How you define the custom resource is by a Custom Resource Definition(CRD). This CRD will create a new RESTful endpoint that will be able to be utilized on either 
a namespace level or cluster level. 

Nginx CRD for Nginx Plus (NIC)

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

   kubectl describe crd 

This CRD file defines how a user can employ the newly created resource with a full schema. If you are not familiar with schema's, think of it as syntax checking process to make sure newly created 
manifest files meet the defined specification to be deployed on the Kubernetes system. We will not be building any Custom Resources in this lab but knowing what Custom Resources are and that Custom
Resource Definitions describe them is valuable knowledge. This capability allows you and companies like F5 to greatly extend functions and capabilities of your cluster or products made to interact with 
applications. 

Namespaces
----------

In Kubernetes, namespaces provides a mechanism for isolating groups of resources within a single cluster. Names of resources need to be unique within a namespace, but not across namespaces.

Namespaces are intended for use in environments with many users spread across multiple teams, or projects. For clusters with a few to tens of users, you should not need to create or think about namespaces at all. Start using namespaces when you need the features they provide.

Namespaces provide a scope for names. Names of resources need to be unique within a namespace, but not across namespaces. Namespaces cannot be nested inside one another and each Kubernetes resource can only be in one namespace.

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

Let's look at the *default* namespace first, because it's just default. Any time you do **not explicitly** declare the namespace it it implied default. So you always want
to get into the habit of adding the namespace flag ``-n`` with the corresponding namespace. Having said all that, you will find out that some resources do indeed live in 
the default namsespace, like our CRD's. 

Next is the *kube-system* namespace. This namespace is important as a vital Pod is running here, CoreDNS. We'll look into Pods and this Pod in the next 
section. 

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
