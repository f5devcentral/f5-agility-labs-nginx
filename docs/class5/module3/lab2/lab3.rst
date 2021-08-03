Step 6 - Build your NAP (NGINX App Protect) Docker image
#################################################################

In this lab, we will install the package Threat Campaign into a new Docker image.

Threat Campaign is a **feed** from F5 Threat Intelligence team. This team is collecting 24/7 threats from internet and darknet. 
They use several bots and honeypotting networks in order to know in advance what the hackers (humans or robots) will target and how.

Unlike ``signatures``, Threat Campaign provides with ``ruleset``. A signature uses patterns and keywords like ``' or`` or ``1=1``. Threat Campaign uses ``rules`` that match perfectly an attack detected by our Threat Intelligence team.

.. note :: The App Protect installation does not come with a built-in Threat campaigns package like Attack Signatures. Threat campaigns Updates are released periodically whenever new campaigns and vectors are discovered, so you might want to update your Threat campaigns from time to time. You can upgrade the Threat campaigns by updating the package any time after installing App Protect. We recommend you upgrade to the latest Threat campaigns version right after installing App Protect.


For instance, if we notice a hacker managed to enter into our Struts2 system, we will do forensics and analyse the packet that used the breach. Then, this team creates the ``rule`` for this request.
A ``rule`` **can** contains all the HTTP L7 payload (headers, cookies, payload ...)

.. note :: Unlike signatures that can generate False Positives due to low accuracy patterns, Threat Campaigns are very accurate and nearly eliminates any False Positives.

.. note :: NAP provides with high accuracy Signatures + Threat Campaign ruleset. The best of breed to reduce False Positives.


Threat Campaign package is available with the ``app-protect-signatures-7.repo`` repository. It is provided with the NAP subscription.

In order to install this package, we need to update our ``Dockerfile``. I created another Dockerfile named ``Dockerfile-sig-tc``

.. code-block:: bash

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
   RUN yum -y install app-protect app-protect-attack-signatures app-protect-threat-campaigns\
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


.. note:: You may notice one more package versus the previous Dockerfile in Step 4. I added the package installation ``app-protect-threat-campaigns``


**Follow the steps below to build the new Docker image:**

   #. SSH to Docker App Protect + Docker repo VM
   #. Run the command ``docker build --tag app-protect -f Dockerfile-sig-tc .`` <-- Be careful, there is a "." (dot) at the end of the command
   #. Wait until you see the message: ``Successfully tagged app-protect:latest``

.. note:: Please take time to understand what we ran. You may notice 2 changes. We ran the build with a new Dockerfile ``Dockerfile-sig-tc`` and with a new tag ``tc``. You can choose another tag like ``tcdate`` where date is the date of today. We don't know yet the date of the TC package ruleset.


**Stop the previous running NAP container and run a new one based on the new image**

   1. If the container is running interactively, stop it with <ctrl-c>. Otherwise, kill it with ``docker rm -f app-protect``

   2. Run a new container with this image  ``docker run --interactive --tty --rm --name app-protect -p 80:80 --volume /home/ubuntu/lab-files/nginx.conf:/etc/nginx/nginx.conf app-protect:latest``

.. note:: The container takes about 45 seconds to start, wait for a message "event": "waf_connected" before continuing.

   3. Check the Threat Campaign ruleset date included in the new Docker container in the running logs by looking for  ``threat_campaigns_package``

      .. code-block:: 
      
         2021/08/02 14:15:52 [notice] 13#13: APP_PROTECT { "event": "configuration_load_success", "software_version": "3.583.0", "user_signatures_packages":[],"attack_signatures_package":{"revision_datetime":"2021-07-13T09:45:23Z","version":"2021.07.13"},"completed_successfully":true,"threat_campaigns_package":{"revision_datetime":"2021-07-13T13:48:30Z","version":"2021.07.13"}}

**Simulate a Threat Campaign attack**

   #. RDP to the ``jumphost`` (user / user)
   #. Open ``Postman`` and select the collection ``NAP - Threat Campaign``
   #. Run the 2 calls with ``docker`` in the name. They will trigger 2 different Threat Campaign rules.
   #. In the next lab, we will check the logs in Kibana.


.. note:: Congrats, you are running a new version of NAP with the latest Threat Campaign package and ruleset.


**Video of this lab (force HD 1080p in the video settings)**

.. raw:: html

    <div style="text-align: center; margin-bottom: 2em;">
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/fwHe0sp-5gA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>