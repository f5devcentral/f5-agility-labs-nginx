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

In this lab, we will build a custom container image using *Podman*. Podman is similar to Docker for many tasks but does not have licensing constraints.
First, access the Jumphost via Web Shell 

.. image:: images/jumphost_webshell.png


.. code-block:: bash 
   :caption: Dockerfile 

   FROM nginx
   RUN rm -f /etc/nginx/conf.d/default.conf

   COPY web.conf /etc/nginx/conf.d/web.conf
   COPY index.html /usr/share/nginx/html/index.html
   EXPOSE 83/tcp
