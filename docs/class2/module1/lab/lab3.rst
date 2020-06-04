Lab 3 (OPTIONAL): Pull and run a Docker image from our private Docker Registry
==============================================================================

If you want some practice with Docker, this task is an excellent
opportunity to practice basic Docker commands. In this task, we will
pull and run a docker container on our **Staging server**, a “Docker
host.”

We will pull an image from our private docker registry, run a container,
and use volumes to persist data.

.. note:: For more self-paced, hands-on-tutorial, try out the \ `Docker 101 tutorial <https://www.docker.com/101-tutorial>`__

1. Open an SSH Shell to the Staging Server using **git bash for
   windows**.

   Git Bash is a bash shell emulator, similar to what you see natively
   on Linux and Unix machines. If the git console font is too small to
   read, use **Ctrl+ “+”** to increase the font

   Once **git bash for windows** is open, run the following command to
   SSH into the Staging server:

   .. code:: bash

      ssh centos@10.1.1.11

   .. image:: ../media/image16.png

2. The web shell will open as ``centos`` user. Make sure you are in in
   the provided project folder with NGINX Plus configurations in
   ``/home/centos/nginx-plus-docker-base``

   .. code:: bash

      $ whoami
      centos

      $ cd ~/nginx-plus-docker-base
      $ pwd
      /home/centos/nginx-plus-docker-base

3. Pull an image from our private docker registry using
   the ``docker pull`` command. Run the following command below to
   pull our NGINX Plus image built on **Alpine Linux 3.10**, if you
   want to run another image, you can copy the Docker image location
   from the Gitlab Container registry page from the
   **nginx-plus-dockerfiles** repository

   .. image:: ../media/image17.png

   .. code:: bash

      $ docker pull registry.gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles:alpine3.10
      alpine3.10: Pulling from f5-demo-lab/nginx-plus-dockerfiles
      4167d3e14976: Already exists
      d515ef1b2c63: Pull complete
      72886512006a: Pull complete
      7f39e3ca1721: Pull complete
      ea3c7cd8c3af: Pull complete
      7385769c7c40: Pull complete
      Digest:
      sha256:400dd9e21e963629fc3d974261b1b6668b5c822009ddb183ddaa0631c2ae4165
      Status: Downloaded newer image for
      registry.gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles:alpine3.10
      registry.gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles:alpine3.10

4. Run a container using the downloaded docker image from the previous
   step. We will also map ports ``9000`` and ``9080`` on the docker host
   to ports ``80`` and ``8080`` on the container, and also mount the
   local nginx configurations to the container

   .. code:: bash

      $ docker run --name test -d -p 9000:80 -p 9080:8080 -v $PWD/etc/nginx:/etc/nginx \
      registry.gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles:alpine3.10

      c3dbc2f22505bf7e7eb863ff9f548121b1daa5eb18b1279b656e8c034dc540f2

5. You can see the container is running on the mapped ports. When
   running ``docker ps`` you may see it running alongside other
   containers. The first value is the ``CONTAINER ID`` we will need
   this value later to shut down the container

   .. code:: bash

      $ docker ps

      CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
      c3dbc2f22505
      registry.gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles:alpine3.10
      "nginx -g 'daemon of..." 50 seconds ago Up 49 seconds 443/tcp,
      0.0.0.0:9000->80/tcp, 0.0.0.0:9080->8080/tcp test

6. We can now test the NGINX Plus container by making a HTTP request
   using ``curl``. We should get our test reponse page back:

   .. code:: bash

      $ curl http://127.0.0.1:9000 -L
      Status code: 200
      Server address: 127.0.0.1:8096
      Server name: c3dbc2f22505
      Date: 04/Mar/2020:17:36:06 +0000
      User-Agent: curl/7.29.0
      Cookie:
      URI: /
      Request ID: 6ab36225f5a958350154a90da2145030

7. After finishing testing, we can now stop the container using
   ``docker stop [CONTAINER NAME]``. Since we named our container
   ``test``, we can stop and remove this container using the following
   command:

   .. code:: bash

      # Stop container named test
      $ docker stop test

      # Delete the container named test
      $ docker rm test

8. When we run ``docker ps`` again you will see that the container is no
   longer running

   .. code:: bash

      $ docker ps

      CONTAINER ID IMAGE COMMAND CREATED STATUS PORTS NAMES
      9964a8554e3c
      registry.gitlab.f5demolab.com/f5-demo-lab/gitlabappster:780376076e8e7434fce680120cfd1e015863ac0c
      "nginx -g 'daemon of..." 6 days ago Up 14 minutes 443/tcp,
      0.0.0.0:81->80/tcp, 0.0.0.0:8081->8080/tcp appster-staging

   .. image:: ../media/image18.png
