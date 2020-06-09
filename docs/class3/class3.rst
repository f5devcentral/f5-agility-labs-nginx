Class3 - NGINX Dataplane Scripting
==================================

This class will introduce the student to customizing NGINX using NGINX JavaScript (njs)

**Lab Environment**

In each lab we will configure an NGINX server to either provide content itself or act as a reverse proxy that retrieves content from other servers.

We will use Docker to deploy each lab environment locally on the student's machine where all servers will run in a single Docker container.  While Docker containers are ideal for running NGINX, the same concepts apply when running NGINX in a VM or on a bare metal server.

**Lab Requirements**

While a lab system is provided for you in UDF, we encourage you to run the labs locally on your own system if you can.  To do that, you'll need to have two applications installed:

- Docker Desktop for Windows or MacOS ( https://www.docker.com/products/docker-desktop)
- A git client ( https://git-scm.com/downloads )

If you already have access to a Linux system with Docker and git, you're all set.

**Verify your System is Ready**

First make sure you have git and Docker available.  Open up a terminal on your system (or Windows Command Prompt) and try the following commands:

*(Note: The command is highlighted. The output is not.)*

.. code-block:: shell
  :emphasize-lines: 1,4

  git --version
  git version 2.25.0
  
  docker --version
  Docker version 19.03.8, build afacb8b

If both the git and docker commands work, you are ready to continue by clicking the next button below.

Expected time to complete: **1 hour**

*A listing of the modules for this class is listed below.  This same list is also available on the left column of every page for direct access.*

.. toctree::
   :maxdepth: 1
   :glob:

   module*/module*

