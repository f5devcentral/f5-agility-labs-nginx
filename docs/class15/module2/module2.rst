Module 2 - Accessing the lab environment
========================================

If you have not already, log into UDF and start up the lab environment. Given the resource intensity of
this lab, it can take a few minutes for the lab VMs to start up to completion.

Once the lab has completed starting up, we will open the various interfaces you need for this lab.

Open VS Code on the Jumphost
----------------------------

For the AI Gateway configuration you will be using VS Code hosted on the Jumphost.

Click **Access** on the **Jumphost** component and choose **VSCODE**.

   .. image:: images/00.png

Check the **“Trust the authors …”** check box and click the **“Yes, I trust the authors”** button.

   .. image:: images/00-1.png

Click **“Mark Done”**

   .. image:: images/00-2.png

Now we will open the terminal that will be used later on.
   
Click the upper left button -> **Terminal** -> **New Terminal**

   .. image:: images/00-3.png

You should now see a lower window within VS Code with a Terminal tab with a prompt.

   .. image:: images/07.png

Open the shell on AI Gateway
----------------------------

AI Gateway is running on the **AI Gateway** component and we will want to view the logs throughout the lab.
We will access the logs from its shell. Click **Access** and choose **WEB SHELL**.

   .. image:: images/01.png

You will have a new tab and see a terminal prompt.

   .. image:: images/08.png

The **AIGW Core** and **AIGW Processors** are running as containers. You can verify they are running by running the following command ``docker ps``.

   .. image:: images/09.png

Here we will be able to watch the **AI Gateway** logs and live behavior. Run the command ``docker logs aigw-aigw-1 -f`` to see all live logs.

   .. image:: images/10.png

Open Arcadia Crypto's AI chatbot
--------------------------------

You will be interacting with an **AI chatbot** for a fictitious finance application called **Arcadia Crypto**.
Click **Access** on the **Microk8s** component and click **ARCADIA ONPREM**.

   .. image:: images/02.png

Login with the following credentials:

   | **Username:** sorin@nginx.com
   | **Password:** nginx

   .. image:: images/03.png

Once logged in click on **Exchange**.

   .. image:: images/04.png

On the bottom right side of the page you have the **AI Assistant**. Click on the **+** sign to open the chat.

   .. image:: images/05.png

Note that whenever you need to reset the current **chat**, you can click the **Reset** button.

   .. image:: images/06.png



