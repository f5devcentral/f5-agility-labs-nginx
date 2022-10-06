Step 3 - Link the API GW and Dev Portal
#######################################

It is time to ``link`` the API-GW instance and Dev-Portal instance with NMS.
To do so, we will execute the Nginx Agent installer on both instances.

Link the API-GW instance
========================

#. In UDF, SSH or WEBSSH to ``NGINX Plus APIGW-1``
#. In NMS UI, click on the ``API Cluster Gateway`` row (not the name link) to pop out the right frame with the commands to execute

    .. image:: ../pictures/lab2/api-cluster-curl.png
       :align: center

#. Copy the CURL command, it should looks like this

    .. code-block:: bash

        curl -k https://10.1.1.6/install/nginx-agent > install.sh && sudo sh install.sh -g api-cluster && sudo systemctl start nginx-agent

    .. warning:: check the FQDN is 10.1.1.6 and not the UDF public proxy FQDN

#. On NGINX APIGW-1 SSH session, paste and execute the CURL command. You will see the below outcome at the end of the installation.

    .. code-block:: bash

        ----------------------------------------------------------------------
        NGINX Agent package has been successfully installed.

        Please follow the next steps to start the software:
            sudo systemctl start nginx-agent

        Configuration settings can be adjusted here:
            /etc/nginx-agent/nginx-agent.conf

        ----------------------------------------------------------------------

        Installing nginx-agent package ... done.
        Updating /etc/nginx-agent/agent-dynamic.conf ...
        Setting existing instance_group: api-cluster
        Successfully updated /etc/nginx-agent/agent-dynamic.conf



Link the Dev-Portal instance
============================

#. In UDF, SSH or WEBSSH to ``Dev Portal``
#. Similar to API-GW instance, click on the ``Developer Portal Clusters`` row and copy the CURL command.

    .. warning:: DO NOT CLICK ON ``Developer Portal Internal Clusters``

#. The CURL command should looks like this

    .. code-block:: bash

        curl -k https://10.1.1.6/install/nginx-agent > install.sh && sudo sh install.sh -g devportal-cluster && sudo systemctl start nginx-agent

    .. warning:: check the FQDN is 10.1.1.6 and not the UDF public proxy FQDN

#. On NGINX Dev-Portal SSH session, paste and execute the CURL command. You will see the below outcome at the end of the installation.

    .. code-block:: bash

        ----------------------------------------------------------------------
        NGINX Agent package has been successfully installed.

        Please follow the next steps to start the software:
            sudo systemctl start nginx-agent

        Configuration settings can be adjusted here:
            /etc/nginx-agent/nginx-agent.conf

        ----------------------------------------------------------------------

        Installing nginx-agent package ... done.
        Could not find /etc/nginx-agent/agent-dynamic.conf ... Creating file
        Successfully created /etc/nginx-agent/agent-dynamic.conf
        Updating /etc/nginx-agent/agent-dynamic.conf ...
        Setting instance_group: devportal-cluster
        Successfully updated /etc/nginx-agent/agent-dynamic.conf


Check instances connectivity with NMS
=====================================

#. In ``API Gateway Clusters`` section, click on name ``api-cluster``

    .. image:: ../pictures/lab2/env-overview.png
       :align: center

#. Scroll down and check your API-GW instance is linked and green

    .. image:: ../pictures/lab2/api-gateway.png
       :align: center

#. Switch to the ``Dev-Portal`` by clicking on the cluster top menu

    .. image:: ../pictures/lab2/switch-devportal.png
       :align: center

