Using the UDF jump host
#####################################################################

This lab has a jump host with a number of tools provided. There are a number of ways to accomplish each task, use whichever tool you prefer.

**Login to the jump host**

Find the VM on the right hand side of the UDF Systems called Win10 and click details.

.. image:: ../pictures/udf-jumphost.png
   :alt: jumphost resolutions
   :align: center
   :scale: 50%

We recomend a resolution slightly smaller than your desktop. If you want full screen, just click the ``RDP`` button itself

.. note:: The default username is ``Administrator``. You must change it to ``user`` with the password ``user``

The jump host can have a little lag, though it generally will make finding all the lab resources easier. You can try the direct link to most resources under the VM you are using. For example, the ELK web dashboard is availble by clicking the ``Access`` link to the right of it.

.. image:: ../pictures/udf-elk-link.png
   :alt: ELK Link
   :align: center
   :scale: 80%

If you have a public key for SSH, we highly recomend adding it to UDF. Instructions for that are here (find: SSH Access): `UDF Guide
<https://help.udf.f5.com/en/articles/3832340-f5-training-course-interface#:~:text=access%20and%20when.-,SSH%20Access,-Many%20courses%20leverage>`_.

Once you add it, you can use the direct SSH access to each VM. Note that vscode does not work remotely, you must use the jump host.

.. image:: ../pictures/udf-ssh-access.png
   :alt: Windows Terminal
   :align: center
   :scale: 80%

Once on the jump host, you can quickly access the VMs from either vscode or Windows Terminal by right clicking the icon on the taskbar.

.. image:: ../pictures/udf-windows-terminal.png
   :alt: Windows Terminal
   :align: center
   :scale: 80%

.. image:: ../pictures/udf-vscode.png
   :alt: vscode
   :align: center
   :scale: 80%