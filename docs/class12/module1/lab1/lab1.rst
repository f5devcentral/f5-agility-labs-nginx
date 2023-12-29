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


To save on time, some of the files have been built for you. From the web shell, change directory to **lab1** ``cd lab1``. Within this directory you can 
see tow of the necessary files. *web.conf* and *index.html*. It will now be up to you to create the Dockerfile that will make our new Nginx container.

.. code-block:: bash 
   :caption: Dockerfile 

   FROM nginx
   RUN rm -f /etc/nginx/conf.d/default.conf

   COPY web.conf /etc/nginx/conf.d/web.conf
   COPY index.html /usr/share/nginx/html/index.html
   EXPOSE 83/tcp

Copying this text in the blank Dockerfile file, you'll:
 - Start container image creation from the base Nginx image
 - The *RUN* command will execuite a command, we will delete the default configuration shipped on all Nginx instances
 - The *COPY* command will allow us to place files inside the container image to be available at run time. Those files are:
    - *web.conf* This is our new nginx.conf that will tell the web server how to respond
    - *index.html* This is our web page that will be displayed 
 - The *EXPOSE* command allows us to expose additional ports on the container 

Now to build and tag the new container. Podman will take the Dockerfile and other referenced files (web.conf, index.html) and build them into our new 
container image.

.. code-block:: bash
   :caption: Podman Build

   podman build -t appworld:v1 .

As your image is being built, let's cover the command being run. We are telling podman to build a new image and give it the tag *appworld:v1*. The ``.`` is simply telling 
podman the Dockerfile file is located in the same directory we are working from. 

Once the image is built, you can now run the command to list the images. You should see two images listed. This is because podman did not have the Nginx image
and had to download it first as it was our base. 

.. code::block bash 
   :caption: List Images

   podman images

Now it is time to run our newly created container image. 

.. code-block:: bash
   :caption: Run Container

   podman run -p 83:83 --name app -dit appworld:v1

We'll cover in detail what the above command is doing. Podman is being instructed to run a container on host port 83 and map it to container port 83, and give
our new container the name of *app*. The next flagged items are:

 - ``-d`` run the container detached, if we did not do this the terminal would reflect the prompt from inside the running container 
 - ``-i`` interactive 
 - ``-t`` tty 

We can now run this command to see all container (active and stopped)

.. code-block:: bash
   :caption: Show Container

   podman ps -a


.. code-block:: bash
   :caption: Curl Container

   curl http://localhost:83

Curl Output should look like this:

.. code-block:: bash 

   root@ip-10-1-1-12:/lab1# curl http://localhost:83
     <html>
     <head>
     <title>F5 AppWorld</title>
     </head>
     <body>
             First Page
             <p>Lab1 site for training.</p>
     </body>
     </html>

This now concludes the Container section of this lab.