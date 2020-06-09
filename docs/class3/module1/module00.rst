===============
Getting Started
===============

**Using NGINX with Docker**

Docker has an official image of NGINX on the Docker Hub. We will use this image to build our containers for the lab. Lets start a simple NGINX container and test it out:

.. code-block:: shell
  :emphasize-lines: 1

  docker run --rm --name mynginx -p 80:80 -d nginx

This command first downloads the nginx image (if we don't already have it,) boots a container using the image, maps port 80 on our system to the container, and returns us to the prompt.

Now let's test our new NGINX container:

.. code-block:: shell
  :emphasize-lines: 1

  curl localhost

  <!DOCTYPE html>
  <html>
  <head>
  <title>Welcome to nginx!</title>
  ...

You just successfully deployed an NGINX web server running on port 80. Congrats!

We're done with this NGINX instance so let's get rid of it:

.. code-block:: shell
  :emphasize-lines: 1

  docker stop mynginx

Note: *Since we used the "--rm" option when we started this container, it is automatically removed once we stop it.*

This NGINX Docker image also includes njs.  Let's check it out by running the following command:

.. code-block:: shell
  :emphasize-lines: 1

  docker run --rm -it nginx njs


The njs tool allows you to try out Javascript code outside of NGINX right from your terminal.

The njs tool provides a prompt "**>>**" for its Javascript console.  Let's try some commands:

.. code-block:: none
  :emphasize-lines: 6,8,10,13
  :linenos:

  interactive njs 0.4.1

  v.<Tab> -> the properties and prototype methods of v.
  type console.help() for more information

  >> 2+2
  4
  >> function hi(msg) {console.log(msg)}
  undefined
  >> hi("Hello world")
  'Hello world'
  undefined
  >> globalThis
  global {
   njs: njs {
    version: '0.4.1'
   }, ...

Hit <Ctrl-D> to exit.

**Downloading Lab Files**

The files we will use for the labs are made available in a Github repo.  Use the following commands to download them:

.. code-block:: shell
  :emphasize-lines: 1,2,3

  git clone https://github.com/xeioex/njs-examples
  cd njs-examples
  ls *

  README.rst

  conf:
  complex_redirects.conf		file_io.conf			hello.conf			jwt.conf			stream
  decode_uri.conf			gen_hs_jwt.conf			join_subrequests.conf		secure_link_hash.conf		subrequests_chaining.conf

  njs:
  complex_redirects.js	file_io.js		hello.js		jwt.js			stream
  decode_uri.js		gen_hs_jwt.js		join_subrequests.js	secure_link_hash.js	subrequests_chaining.js

You will notice that there are two directories, *njs* and *conf*.  The *njs* directory contains the JavaScript source code for each lab.  The *conf* directory contains the nginx configuration file needed to bring the JavaScript into our NGINX server.  For example, the lab named "hello" has a file in the *njs* directory called hello.js and a file in the *conf* directory called hello.conf.

You will find a lab's name surrounded by [square brackets] at the top of each lab page. Hint: *Look at the left column of this page for a listing of the labs.*

**Lab Guidance**

Make sure you stay in the njs-examples directory (as shown above) for all of your labs while running Docker commands.

Using Docker to start each lab requires many command line options.  We will make things easier my using an environment variable to select the lab we will work on so we only have to type the docker command in once and then reuse it from command line history. For example, to start the lab named hello:

.. code-block:: shell

  EXAMPLE='hello'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro  -v $(pwd)/njs/$EXAMPLE.js:/etc/nginx/example.js:ro -v $(pwd)/njs/utils.js:/etc/nginx/utils.js:ro -p 80:80 -p 8090:8090 -d nginx

*Notice how we use Docker "volume mounts" to replace the container's default configuration with our own.*

If you are using a Windows Command Prompt, use percent signs for your environment variables like so:

.. code-block:: shell

  docker run --rm --name njs_example  -v %cd%/conf/%EXAMPLE%.conf:/etc/nginx/nginx.conf:ro  -v %cd%/njs/%EXAMPLE%.js:/etc/nginx/example.js:ro -v %cd%/njs/utils.js:/etc/nginx/utils.js:ro -p 80:80 -p 8090:8090 -d nginx

When you're done with a lab, remove the running NGINX container before moving to the next one:

.. code-block:: shell
  :emphasize-lines: 1

  docker stop njs_example

We are now ready to start the first lab.  Click the "Next" button below to continue.
