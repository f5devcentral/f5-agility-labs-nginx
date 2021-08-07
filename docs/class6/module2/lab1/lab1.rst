Step 2 - Install the NGINX Controller agent software on the NGINX instance
##########################################################################

In order to link an NGINX Plus instance to NGINX Controller, we need to run the NGINX Controller agent installer.

Steps:

#. Login to the NGINX Controller instance by selecting ``Controller UI`` in UDF Access menu, use ``admin@nginx-udf.internal`` as your email and ``admin123!`` as your password.
#. Select ``Add an existing instance``.

   .. note:: Your NGINX Plus instance already exists, we just need to link it with NGINX Controller.

#. Enter a ``Name``, e.g. ``nginx1``.
#. Check the box ``Allow insecure server connections to NGINX Controller using TLS``.
#. Copy the ``curl`` command in the command box:

   .. image:: ../pictures/lab1/create-instance.png
      :align: center

#. SSH (or WebSSH) to the ``Nginx-1 - API Gw`` instance.
#. Paste the ``curl`` command and execute it. Enter ``y`` at every confirmation prompt.
#. After few seconds, the command will succeed and the instance will appear in NGINX Controller.
#. In NGINX Controller, click ``close`` if you are still in the instance creation page, and look at your first instance linked within NGINX Controller:

   .. image:: ../pictures/lab1/adopted-instance.png
      :align: center

   .. warning:: Wait till the status changes from ``Configuring`` to ``Running``. If the status is stuck in the ``Configuring`` state, force the NGINX Controller agent to restart in the ``Nginx-1`` instance as below:

      .. code-block:: bash

         sudo service nginx restart
         sudo service controller-agent restart

.. note:: This instance can now be used as an NGINX Controller ``gateway``.
