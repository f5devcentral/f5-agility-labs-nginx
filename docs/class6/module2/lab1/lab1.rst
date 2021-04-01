Step 2 - Install the Controller Agent software on the Nginx instance
####################################################################

In order to "adopt" a Nginx instance in the controller, we need to run the ``agent installer``

Steps:

#. Login to the Nginx Controller ``admin@nginx-udf.internal`` with password ``admin123!``
#. In the menu ``Infrastructure`` > ``Instances``, click ``Create`` and ``Add an existing instance``
   
   .. note:: Your Nginx instance already exists, we just need to adopt it by the controller
   
#. Enter a ``Name`` like ``nginx1``
#. Check the box ``Allow insecure server connections ... using TLS``
#. And copy the curl command in the command box

   .. image:: ../pictures/lab1/create-instance.png
      :align: center

#. SSH or WEBSSH to ``Nginx-1 - API Gw`` instance
#. Paste de curl command and execute it. Enter ``y`` for every confirmation.
#. After few seconds, the command will succeed and the instance will appear in the controller.
#. In the Controller GUI, click ``close`` if you are still in the instance creation page, and look at your first instance adopted by the controller

   .. image:: ../pictures/lab1/adopted-instance.png
      :align: center

   .. warning:: Wait till the status changes from ``Configuring`` to ``runnnig``. If the status is stuck in ``Configuring`` state, force the agent to start in the ``nginx-1`` instance.

      .. code-block:: bash

         sudo service nginx restart
         sudo service controller-agent restart

.. note:: This instance can now be used as a ``Gateway``

