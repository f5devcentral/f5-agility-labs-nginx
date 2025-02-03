Accessing the UDF resources
###########################

Once the lab has started bellow are the resources that we will need to access.

1. Our interaction with the **AI Chatbot** will be done through the **Arcadia Crypto** application. Click **Access** on the **Microk8s** component and choose **ARCADIA ONPREM**.

   .. image:: ../pictures/02.png

   | Login with the following credentials:

   | **Username:** sorin@nginx.com
   | **Password:** nginx

   .. image:: ../pictures/03.png

   | Once logged in click on **Exchange**.

   .. image:: ../pictures/04.png

   | On the bottom right side of the page you have the **AI Assistant**
     click on the **+** sign to open the chat.

   .. image:: ../pictures/05.png

   | When you need to reset the current **chat** click you can click the
     reset button.

   .. image:: ../pictures/06.png

2. For the last part of the lab for the AI Gateway configuration will be done through the **Jumphost**, click **Access** and choose **WEB SHELL**.  

   .. image:: ../pictures/07.png


3. The AI Gateway is running on the **AI Gateway** component. In order to see the logs click **Access** and choose **WEB SHELL**.  

   .. image:: ../pictures/08.png

   The **AIGW Core** and **AIGW Processors** are running as containers. You can verify they are running by paste in the console the following command ``docker ps``.  

   Here we will be able to watch the **AI Gateway** logs and live behaviour. Run ``docker logs aigw-aigw-1 -f``, you will be able to see all live logs