Step 5 - Deploy App Protect via CI/CD pipeline
##############################################

In this lab, we will install NGINX Plus and App Protect packages on CentOS with a CI/CD pipeline. F5 maintains the NGINX Ansible playbooks on Galaxy which allows customers to easily setup App Protect.

.. note:: The official Ansible NAP role is available here https://github.com/nginxinc/ansible-role-nginx-app-protect and the NGINX Plus role here https://github.com/nginxinc/ansible-role-nginx 


**Uninstall the previous running NAP**

    #.  SSH to the CentOS-VM

    #.  Remove the existing installation NAP in order to start from scratch. App Protect depends on NGINX Plus, so simply removing it will also remove everything we need.


        .. code-block:: bash

            /home/centos/lab-files/remove-app-protect-cleanup.sh

        .. image:: ../pictures/lab3/remove-nap.png
           :align: center
           :scale: 70%
           :alt: nap


        **Run the CI/CD pipeline from Jenkins**

        Steps:

    #. RDP to the Jumphost with credentials ``user:user``

    #. Open Firefox and open ``Gitlab`` (if not already opened)

    #. Select the repository ``nap-deploy-centos`` and go to ``CI /CD``


    .. image:: ../pictures/lab3/gitlab_pipeline.png
        :align: center
        :scale: 50%
        :alt: gitlab

    #. ``Run the Pipeline`` by clicking the green button. The installation can take up to 10 minutes as the install is very I/O intensive.

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
            - ansible-playbook -i hosts ./ansible/nap32.yml

    Workaround_dns:
        stage: Workaround_dns
        script:
            - ansible-playbook -i hosts copy-nginx-conf.yml


.. note:: As you can notice, the ``Requirements`` stage installs the ``requirements``. We use the parameter ``--force`` in order to be sure we download and install the latest version of the lab.

.. note:: This pipeline executes 2 Ansible playbooks. 
    
    #. One playbook to install NAP (which also installs NGINX Plus)
    #. The last playbook is just there to fix an issue in UDF for the DNS resolver


.. image:: ../pictures/lab3/gitlab_pipeline_ok.png
   :align: center
   :scale: 40%
   :alt: pipeline


When the pipeline is finished executing, perform a browser test within Firefox using the ``Arcadia NAP CentOS`` bookmark


.. note :: Congrats, you have deployed ``NGINX Plus`` and ``NAP`` with a CI/CD pipeline. You can check the pipelines in ``GitLab`` if you are interested to see what has been coded behind the scenes.