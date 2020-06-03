Configuration Synchronization
-----------------------------------------

To be synchronized, shared memory zones must be identically named across NGINX Plus cluster members.
One way to ensure common shared memory zones exist across the cluster is to synchronize the configuration.
NGINX provides a package/script for this task.

.. image:: /_static/nginx-sync-sh.png
   :width: 500pt

.. NOTE:: The lab UDF image was already configured for ssh access (via keys) to all cluster members from the NGINX Plus Master.

**Create the configuration file ``/etc/nginx-sync.conf``.**

.. note:: Execute these steps on the NGINX Plus Master instance.

.. code:: shell

    sudo bash -c 'cat > /etc/nginx-sync.conf' <<EOF
    NODES="plus2.nginx-udf.internal plus3.nginx-udf.internal"
    CONFPATHS="/etc/nginx/nginx.conf /etc/nginx/conf.d"
    EXCLUDE="default.conf"
    EOF

The script will push configuration in ``CONFPATHS`` to the ``NODES``, omitting configuration files named in ``EXCLUDE``.

**Install and Run nginx-sync.sh.**

.. code:: shell

    sudo yum install -y nginx-sync && \
    sudo nginx-sync.sh

Answer the ECDSA key fingerprint prompts if necessary. 
Verify the configuration has been synchronized and is running with curl or the browser on the Windows Jump Host.
For example:

.. code:: shell

    curl http://plus2.nginx-udf.internal

This request should resolve to the server block with ``default_server`` (the f5App).

