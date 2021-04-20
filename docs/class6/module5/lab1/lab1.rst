Step 10 - Deploy a DevPortal Instance
####################################

So far, we focused on API Gateway only. In API Management, there is a important topic for API Dev and API consumer : the ``Developper Portal``

In this lab, we will deploy a Nginx Plus instance as a DevPortal and push to this instance the Developper Portal with the API Sentence documentation.

The goal is to offer to ``consumers`` the documentation on how to use the API Sentence app.

|

Install the controller agent on the second Nginx Plus instance
**************************************************************

#. On one side, SSH or WebSSH to ``Nginx-2 - DevPortal``. This instance is a Nginx Plus instance, but not yet adopted by the controller.
#. On the other side, connect to the Controller UI, and go to ``Infrastructure`` > ``Instances``
#. Click ``Create``, ``Add an existing instance``, name ``devportal`` and check the box ``Allow unsecure server connections ...``
#. Copy the ``curl commmand`` and enter ``y`` for each confirmation

   .. code-block:: bash

      curl -k -sS -L https://10.1.20.4/install/controller-agent > install.sh && \
      API_KEY='8c8adf4b5966f517203e578d51b16059' sh ./install.sh -i devportal

    
#. In the SSH (or WebSSH), paste the curl command and enter ``y`` for each confirmation
#. After few seconds, the instance will appear in the Controller UI

   .. image:: ../pictures/lab1/instances.png
      :align: center

.. warning:: If the instance is stuck in ``Configuring`` state, restart the ``nginx`` and nginx ``controller agent`` services as below
   
   .. code-block:: bash
      
      sudo service nginx restart
      sudo service controller-agent restart

|

Create the DevPortal Gateway
****************************

As a reminder, an instance can not be used alone. It needs to be part of a ``gateway``

#. In the controller UI, create a new ``Gateway`` (Services > Gateway menu)
    #. Name : ``devportal-gw``
    #. Environement : ``env_prod``
    #. Click ``Next``
    #. Placement : select the ``devportal`` instance, and click ``Done`` and ``Next`` 
    #. Hostnames : create a new hostname ``http://devportal.local``, and click ``Done`` and ``Next`` 
    #. Click ``Submit``
