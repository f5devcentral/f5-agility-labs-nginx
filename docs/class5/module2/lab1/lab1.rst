Installing NGINX App Protect on an existing NGINX Plus instance
###############################################################

.. note:: NGINX Plus repo keys are already copied to the Ubuntu VM. Normally you would need to put them in /etc/ssl/nginx.

#. Add the NGINX App Protect repository to the NAP host.

    .. code-block:: bash

      sudo wget -P /etc/yum.repos.d https://cs.nginx.com/static/files/app-protect-7.repo
      yum clean all

#.  Install the most recent version of the NGINX Plus App Protect package (which includes NGINX Plus because it is a dependency):

    .. code-block:: bash
      
      sudo yum install -y app-protect

#. 