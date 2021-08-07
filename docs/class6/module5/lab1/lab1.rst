Step 10 - Deploy an API Developer Portal
########################################

So far, we have only focused on deploying and securing our API Gateway. In the API Management world, there is yet another important topic for both API developers and API consumers, the ``API Developer Portal (DevPortal)``.
An API DevPortal includes documentation on how to use any given API (e.g. sample requests/responses for each available endpoint).

In this lab, we will deploy a dedicated NGINX Plus instance as an API DevPortal.

.. note:: The API DevPortal can be deployed in an existing API Gateway instance, or a dedicated instance.

The goal is to offer to both ``API developers`` and ``API consumers`` documentation on how to use the API Sentence app.

|

Install the NGINX Controller agent on the second NGINX Plus instance
********************************************************************
#. In NGINX Controller -> Select ``Home`` -> ``Infrastructure`` -> ``Instances``
#. Click ``Create`` -> ``Add an existing instance``. Use the following values:
#. Enter a ``Name``, e.g. ``devportal``.
#. Check the box ``Allow insecure server connections to NGINX Controller using TLS``.
#. Copy the ``curl commmand`` in the command box:

   .. code-block:: bash

      curl -k -sS -L https://10.1.20.4/install/controller-agent > install.sh && \
      API_KEY='8c8adf4b5966f517203e578d51b16059' sh ./install.sh -i devportal

#. SSH (or WebSSH) to the ``Nginx-2 - DevPortal`` instance. This instance is an NGINX Plus instance, but it's not yet linked to NGINX Controller.
#. Paste the ``curl`` command and execute it. Enter ``y`` at every confirmation prompt.
#. After few seconds, the command will succeed and the instance will appear in NGINX Controller.

   .. image:: ../pictures/lab1/instances.png
      :align: center

.. warning:: Wait till the status changes from ``Configuring`` to ``Running``. If the status is stuck in the ``Configuring`` state, force the NGINX Controller agent to restart in the ``Nginx-2`` as below:

   .. code-block:: bash

      sudo service nginx restart
      sudo service controller-agent restart

|

Create the NGINX DevPortal Gateway
**********************************

As a reminder, an instance cannot be used alone. It needs to be part of a NGINX Controller ``Gateway``.


#. In NGINX Controller -> Select ``Home`` -> ``Services`` -> ``Gateways`` -> ``Create``. Use the following values:

    * Name: ``devportal-gw``
    * Environment: ``env_prod``
    * Placement: ``<your devportal instance>``
    * Hostnames: ``http://devportal.local``

#. Click ``Submit``
