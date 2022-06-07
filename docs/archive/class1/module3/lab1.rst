Base Configuration
==================

The UDF lab blueprint provides several containers running web applications on the ``Docker Host`` instance.
These containers will be used as ``upstreams`` (or "pool members" in F5 terminology) throughout the lab.
All necessary containers should be running when the UDF blueprint completes booting.

Throughout the lab NGINX Plus configuration will be deployed directly from bash.
In order to prevent tedious work in a text editor, the lab provides bash commands using concatenation and redirection. 
When directed, simply copy and paste the commands on the specified host.

Reloading the NGINX Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Frequently throughout this lab you will be asked to "reload the NGINX configuration". Use the following pattern:

.. code:: shell

   sudo nginx -t && sudo nginx -s reload

The first command, ``nginx -t``, checks the configuration syntax. The second command, ``nginx -s reload``, reloads the configuration.

If successful, the command output will be:

.. code:: shell

   nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
   nginx: configuration file /etc/nginx/nginx.conf test is successful

.. image:: /_static/reload.png
   :width: 500pt

During the reload procedure, a ``SIGHUP`` is sent the kernel.
The master NGINX process evaluates the new config and checks for ``emerg`` level errors.
Lastly, new workers are forked while old workers gracefully shut down.
This worker model is important to understand as some features require state sharing across the workers.

Blocks and Directives
~~~~~~~~~~~~~~~~~~~~~

.. image:: /_static/confcontexts.png
   :width: 500pt

NGINX configurations are made up nested contexts. All contexts are a child of ``Main``. The top-level contexts are:

- **Events**
  - This context is used to set global options that affect how NGINX handles connections at a general level.

- **HTTP**
  - This lab focusses on using NGINX Plus as a reverse proxy. Consequently, the ``http`` context will hold the majority of the configuration.

- **Stream**
  - The ``stream`` context provides options for TCP/UDP load balancing. This context will be used later to configure clustering between NGINX plus instances.

This lab will focus mainly configuration blocks under the ``http`` context.

Create the Base Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Start by creating a basic load balancing configuration.

.. note:: Execute this command on the NGINX Plus Master instance.

.. code:: 
  
   sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.old && \
   sudo bash -c 'cat > /etc/nginx/conf.d/labApp.conf' <<EOF
   upstream f5App { 
       server docker.nginx-udf.internal:8080;  
       server docker.nginx-udf.internal:8081;  
       server docker.nginx-udf.internal:8082;
   }

   server {
       listen 80;
       error_log /var/log/nginx/f5App.error.log info;  
       access_log /var/log/nginx/f5App.access.log combined;

       location / {
           proxy_pass http://f5App;

       }
   }
   EOF

.. note:: Reload the NGINX Configuration (``sudo nginx -t && sudo nginx -s reload``)

The command first renames ``default.conf`` to prevent serving the default page. Next, a configuration is written to ``/etc/nginx/conf.d/labApp.conf``.
This configuration contained in this is part of the ``http`` context due to the include statement in ``/etc/nginx/nginx.conf``.

.. code::

   http {
   ##Content Removed##
   include /etc/nginx/conf.d/*.conf;
   }

The following types of blocks are used in the basic configuration:

- **Upstream** - This block is used to define and configure ``upstream`` servers -- a named pool of servers that NGINX will proxy requests to. 

- **Server** - NGINX will evaluate each request to determine which ``server`` block should be used. The decision is based on the following directives:

  - **listen**: The ip address / port combination that this server block should respond to. 

  - **server_name**: When multiple listen directives of the same specificity can handle the request, NGINX will parse the ``Host`` header of the request and match it against this directive.

The log declarations allow access and error logs for this server declaration to be separated from the general NGINX logs.
  
- **Location** - Notice the ``location`` block is nested under the ``server`` block. Once a server context has been selected for a request, the request is evaluated against one or more location blocks to determine what actions need to be taken. The longest match (ie. most specific) will be selected.

The **proxy_pass** directive tells NGINX to proxy all requests to the defined ``upstream``.

Test the Site
~~~~~~~~~~~~~

Log in to the ``Windows Jump Host`` (using credentials ``user:user``). Open ``Chrome``.
Click the bookmark titled ``F5 App`` from the bookmarks bar.

.. image:: /_static/2-1.png
  :width: 400pt

An F5 example application should load.
