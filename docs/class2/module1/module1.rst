Module 1: Creating docker images for NGINX Plus
===============================================

In this lab we will automate building NGINX Plus Docker containers on various Linux based images. We will use custom Dockerfiles, and we will test that the container is functional before pushing it to our private container registry. Our containers are then available for application developer teams to use them as part of their NGINX Plus based projects.

`Docker <https://www.docker.com/>`__ is an open platform for building, shipping, running, and orchestrating distributed applications. Both the open source NGINX software and the commercially supported version, NGINX Plus, are excellent use cases for Docker because they are feature-rich application delivery controllers that are deployable on many Linux distributions and easily fit in a container.

While NGINX open source images are available on `Docker Hub <https://hub.docker.com/>`__, the default repository for all public Docker images, you will build your own NGINX Plus Docker images and store them in your **private** container registry. The license keys that are required to access the official NGINX Plus packages are stored as project variables in Gitlab.

For more information about Docker, see `What is Docker? <https://www.docker.com/whatisdocker/>`__
or bookmark the full `Docker documentation <https://docs.docker.com/>`__ for reference

CI/CD flowchart
---------------

**The diagram below depicts the workflow from code to deployment.** Our
exercise ends with pushing the docker image to the container registry
but could easily be extended to deploy a container with new application
code to a live environment

.. image:: ./images/image1.png

.. Important:: Run all lab activites from the Windows JumpHost

.. toctree::
   :maxdepth: 1
   :glob:

   lab/lab*
