Module 2 - Accessing the lab environment
========================================

Log into into UDF and start up the lab. Given the resource intensity of
this lab, it can take a few minutes for the lab VMs to start up to
completion.

Once the lab has completed starting up, we will use two different
terminals. One we will use to configure the AI Gateway and the other to
see the logs.

1. For the AI Gateway configuration click **Access** on the **Jumphost**
   component and choose **VSCODE**. From here we will push
   configurations to the **AI Gateway**

   .. image:: images/00.png

   | Check the **“Trust authors …”** check box and click the **“Yes, I trust…”** button.

   .. image:: images/00-1.png

   Click **“Mark Done”**

   .. image:: images/00-2.png

   | Now we will open the terminal that will be used later on.
   
   | Click the upper left button -> **Terminal** -> **New Terminal**

   .. image:: images/00-3.png

2. The AI Gateway is running on the **AI Gateway** component. In order
   to see the logs click **Access** and choose **WEB SHELL**.

   .. image:: images/01.png

   The **AIGW Core** and **AIGW Processors** are running as containers.
   You can verify they are running by paste in the console the following
   command ``docker ps``.

   Here we will be able to watch the **AI Gateway** logs and live
   behavior. Run ``docker logs aigw-aigw-1 -f``, you will be able to
   see all live logs

3. Our interaction with the **AI Chatbot** will be done through the
   **Arcadia Crypto** application. Click **Access** on the **Microk8s**
   component and choose **ARCADIA ONPREM**.

   .. image:: images/02.png

   | Login with the following credentials:

   | **Username:** sorin@nginx.com
   | **Password:** nginx

   .. image:: images/03.png

   | Once logged in click on **Exchange**.

   .. image:: images/04.png

   | On the bottom right side of the page you have the **AI Assistant**
     click on the **+** sign to open the chat.

   .. image:: images/05.png

   | When you need to reset the current **chat** click you can click the
     reset button.

   .. image:: images/06.png



