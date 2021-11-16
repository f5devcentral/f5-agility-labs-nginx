Step 6 - Build your first NAP (NGINX App Protect) Docker image
##############################################################

In this lab, we will build the NAP Docker image via command line.

**Follow the steps below to build the Docker image:**

   #. SSH/vscode/webshell to the Docker App Protect + Docker repo VM
   #. Change directory to ``cd /home/ubuntu/lab-files``

      .. note:: Feel free to replace the date with the current date, but be sure to be consistent or commands will fail.


   #. Run the command:

      .. code-block:: bash
       
         docker build --tag app-protect:04-aug-2021 .

      .. note:: There is a "." (dot) at the end of the command (which is an alias for ``$PWD`` current directory). This tells docker the that the resources for building the image are in the current directory.

      .. note:: By default, when you run the docker build command, it looks for a file named ``Dockerfile`` in the current directory. To target a different file, pass -f flag.

   #. Wait until you see the message: ``Successfully tagged app-protect:04-aug-2021``

      
      .. code-block:: Dockerfile
         :caption: Here is the code that docker will read and build the image from:

         #For CentOS 7
         FROM centos:7.4.1708

         # Download certificate and key from the customer portal (https://cs.nginx.com)
         # and copy to the build context
         COPY nginx-repo.crt nginx-repo.key /etc/ssl/nginx/

         # Install prerequisite packages
         RUN yum -y install wget ca-certificates epel-release

         # Add NGINX Plus repo to yum
         RUN wget -P /etc/yum.repos.d https://cs.nginx.com/static/files/nginx-plus-7.repo
         RUN wget -P /etc/yum.repos.d https://cs.nginx.com/static/files/app-protect-security-updates-7.repo

         # Install NGINX App Protect
         RUN yum -y install app-protect app-protect-attack-signatures\
            && yum clean all \
            && rm -rf /var/cache/yum \
            && rm -rf /etc/ssl/nginx

         # Forward request logs to Docker log collector:
         RUN ln -sf /dev/stdout /var/log/nginx/access.log \
            && ln -sf /dev/stderr /var/log/nginx/error.log

         # Copy configuration files:
         COPY nginx.conf custom_log_format.json /etc/nginx/
         COPY entrypoint.sh  /root/

         CMD ["sh", "/root/entrypoint.sh"]



      .. code-block:: bash
         :caption: entrypoint.sh

         #!/usr/bin/env bash

         /bin/su -s /bin/bash -c '/opt/app_protect/bin/bd_agent &' nginx
         /bin/su -s /bin/bash -c "/usr/share/ts/bin/bd-socket-plugin tmm_count 4 proc_cpuinfo_cpu_mhz 2000000 total_xml_memory 307200000 total_umu_max_size 3129344 sys_max_account_id 1024 no_static_config 2>&1 >> /var/log/app_protect/bd-socket-plugin.log &" nginx
         /usr/sbin/nginx -g 'daemon off;'



         .. note:: Please take time to understand what we ran.



   #. Create a container with the image, run: 

      .. code-block:: bash

         docker run --interactive --tty --rm --name app-protect -p 80:80 --volume /home/ubuntu/lab-files/nginx.conf:/etc/nginx/nginx.conf --volume /home/ubuntu/lab-files/conf.d:/etc/nginx/conf.d app-protect:04-aug-2021


      .. note:: The container takes about 45 seconds to start, wait for a message "event": "waf_connected" before continuing.

   #. We will leave this terminal running while we perform some tests. When debugging a container, it is often better to not run it detached (-d command) so we can see if it fails immediately. Many times when a container exists immediately it is because of a missing file, or an error in your NGINX configuration.

      .. note:: If you choose to run it detached, you can follow the logs with ``docker logs --follow app-protect``

   #. Note the signature package date in the output logs.
         ``2021/08/02 14:15:52 [notice] 13#13: APP_PROTECT { "event": "configuration_load_success", "software_version": "3.583.0", "user_signatures_packages":[],"attack_signatures_package":{"revision_datetime":"2021-07-13T09:45:23Z","version":"2021.07.13"},"completed_successfully":true}``

.. note:: Congratulations, you are running NGINX App Protect with the latest signature package.

**Video of this lab (force HD 1080p in the video settings)**

.. note :: You may notice some differences between the video and the lab. When I did the video, the Dockerfile was different. But the concept remains the same.

.. raw:: html

    <div style="text-align: center; margin-bottom: 2em;">
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/7o1g-nY2gNY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>