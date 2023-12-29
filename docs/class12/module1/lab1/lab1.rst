Container Components
====================

Containers are a lightweight, executable software package containing all the necessary code and it's dependencies to run as a process on a host. Traditionally, applications
were run from bare metal or virtual machines atop an operating system. This meant that multiple applications could compete for resources and any changes to the operating system
could break dependencies for web servers and applications running on the host. This also meant that any upgrade was a long process to upgrade the OS, then test. Next 
upgrade the web server language dependencies, then test. Finally the application code could be upgraded and user acceptance testing could begin.

Containerization has greatly increased the time it takes to rollout new code (enhancements or fixes) to production. In the world of applications and application security, 
speed is still king. 

Even though we will not build a container, we will discuss some important things about containers. First, containers run as a process on the host system. They need 
a container runtime, such as Docker to run on. The runtime engine will validate the container's image and configuration. Secondly, your new container will share host network information
(i.e. DNS, routing/nat) and will ONLY have what you installed. Again, a container is not a full distro of an operating system. 

Many different types of container images (Linux, Windows)

Building your container can be compared to making a layered cake. There needs to be a base image (Linux or Windows base images), then you can add on 
packages/libraries to allow your application to run. Containers can be *built* using a Dockerfile. In this file you'll define the base, packages needed, and importantly
necessary commands to be run. It's **VERY** important to remember, containers run until the defaut command executes, then they terminate. 

Let's look at some excerpts from our very own Nginx container. 

.. code-block:: bash 
   :caption: Nginx Dockerfile 

   FROM debian:bookworm-slim

   EXPOSE 80

   CMD ["nginx", "-g", "daemon off;"]

The above excerpt tells us our container has a base image **FROM** Debian Linux and is a particular slimmed down version of Debian. To communicate 
with the container, you'll need to **EXPOSE** ports and this is that command. The **CMD** (command) is turning the Nginx daemon off so it will run in the foreground so it will not stop. 

Kubernetes Components
=====================


Node
----

Nodes are the primary compent of a Kubernetes cluster. We will talk about the two types of nodes found in every cluster. A *worker node* and a *leader node*.
You will see the leader node referred to by different names (depending on documentation) but the process is all the same. Nodes can be bare metal, virtual
machines, or even containers (used in development use cases). Worker nodes will run your containerized workloads while the leader nodes will handle 
scheduling of where workloads will be deployed, configuration and state of the cluster. 

In this course, the cluster is already set up for you. You will communicate with the leader node to perform all actions for this course. The Kubernetes 
specific command-line tool you'll use is *kubectl*. Kubectl allows you to view, configure, inspect all aspects of the cluster.

Let's view the nodes attached to our cluster by connecting to the Jumphost from within the lab environment. 

.. image:: images/access_jump.png


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


That was very basic information on our nodes, but if we want more details we can add the `-o` flag, for *output*, and add *wide*

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


Custom Resource Definitions (CRD)
----------------------------------

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

Pod
---

Deployment 
----------

Service
-------

How to determine A record 
- Loadbalancer
- ClusterIP
- NodePort
- Brief CNI 


