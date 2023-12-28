The Path to Understanding Kubernetes and Containers
====================================================

Purpose:


*Containers* slightly resemble virtual machines. In that, they contain filesystems, all necessary libraries, and will use portions of memory and compute
from the host. Containers can allow you to build and move applications nearly anywhere and are usually lightweight. Being that they are lightweight, 
this allows you to maintain different environments (dev, qa, production) and have full application fucintionality.

*Kubernetes* originates from Greek, meaning pilot or helmsman. It's an open source platform used in managing containerized workloads and services. Kubernetes
is an *orchestration* tool ensuring containerized workloads are available and scalable. And since it's power is in orchestration this relieves admins from the burden
of many manual processes to keep applications available and push updates.

What Kubernetes is **NOT**:
 - Not a Hypervisor or Operating System
 - Not a replacment for container runtimes (i.e. Docker)
 - Just for Microservices
 - Not a standalone solution

What Kubernetes IS:
 - Orchestation Platform (ensuring workloads are available/scalable)
 - 


.. image:: images/container_evo.png
   :width: 400
   :alt: Container Evolution
