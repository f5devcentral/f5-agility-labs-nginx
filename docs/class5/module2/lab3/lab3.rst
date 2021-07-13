Step 5 - Deploy App Protect via CI/CD pipeline
##############################################

In this lab, we will install NGINX Plus and App Protect packages on CentOS with a CI/CD toolchain. NGINX teams created Ansible labs to deploy it easily in a few seconds.

.. note:: The official Ansible NAP role is available here https://github.com/nginxinc/ansible-role-nginx-app-protect and the NGINX Plus role here https://github.com/nginxinc/ansible-role-nginx 


**Uninstall the previous running NAP**

    #.  SSH from Jumpbox commandline ``ssh centos@10.1.1.10`` to the App Protect in CentOS

    #.  Uninstall NAP in order to start from scratch

        .. code-block:: bash

            sudo yum remove -y app-protect*

        .. image:: ../pictures/lab3/yum-remove-app-protect.png
           :align: center
           :scale: 50%

    #.  Uninstall NGINX Plus packages


        .. code-block:: bash

            sudo yum remove -y nginx-plus*

        .. image:: ../pictures/lab3/yum-remove-nginx-plus.png
           :align: center
           :scale: 70%

    #.  Delete/rename the directories from the existing deployment

        .. code-block:: bash

            sudo rm -rf /etc/nginx
            sudo rm -rf /var/log/nginx

**Run the CI/CD pipeline from Jenkins**

Steps:

    #. RDP to the Jumphost with credentials ``user:user``

    #. Open ``Edge Browser`` and open ``Gitlab`` (if not already opened)

    #. Select the repository ``nap-deploy-centos`` and go to ``CI /CD``


        .. image:: ../pictures/lab3/gitlab_pipeline.png
           :align: center
           :scale: 50%

    #. ``Run the Pipeline`` by clicking the green button.

The pipeline is as below:

.. code-block:: yaml

    stages:
        - Requirements
        - Deploy_nap
        - Workaround_dns

    Requirements:
        stage: Requirements
        script:
            - ansible-galaxy install -r requirements.yml --force

    Deploy_nap:
        stage: Deploy_nap
        script:
            - ansible-playbook -i hosts app-protect.yml

    Workaround_dns:
        stage: Workaround_dns
        script:
            - ansible-playbook -i hosts copy-nginx-conf.yml


.. note:: As you can notice, the ``Requirements`` stage installs the ``requirements``. We use the parameter ``--force`` in order to be sure we download and install the latest version of the lab.

.. note:: This pipeline executes 2 Ansible playbooks. 
    
    #. One playbook to install NAP (Nginx Plus included)
    #. The last playbook is just there to fix an issue in UDF for the DNS resolver


.. image:: ../pictures/lab3/gitlab_pipeline_ok.png
   :align: center
   :scale: 40%


When the pipeline is finished executing, perform a browser test within ``Edge Browser`` using the ``Arcadia NAP CentOS`` bookmark


.. note :: Congrats, you deployed ``NGINX Plus`` and ``NAP`` with a CI/CD pipeline. You can check the pipelines in ``GitLab`` if you are interested to see what has been coded behind the scenes. But it is straight forward as the Ansible labs are provided by F5/NGINX.
