Accessing the UDF resources
###########################

Once the lab has started bellow are the resources that we will need to access.

1. Within the UDF lab we have our application hosted. In order to be able to follow the lab we must get the **dynamic hostname** off the application that we need to protect.  

   Click **Access** on the **Microk8s** component and choose **Arcadia OnPrem**.

   Copy and save in notepad the **Hostname** of the Arcadia application that we will protect.

   .. image:: ../pictures/02.gif
      :align: center      
      :class: bordered-gif
      

2. For the last part of the lab for the AI Gateway configuration will be done through the **Jumphost**, click **Access** and choose **WEB SHELL**.  

   .. image:: ../pictures/03.gif
      :align: center      
      :class: bordered-gif


3. The AI Gateway is running on the **AI Gateway** component. In order to see the logs click **Access** and choose **WEB SHELL**.  
   
   The **AIGW Core** and **AIGW Processors** are running as containers. You can verify they are running by paste in the console the following command ``docker ps``.  

   Here we will be able to watch the **AI Gateway** logs and live behaviour. Run ``docker logs aigw-aigw-1 -f``, you will be able to see all live logs

   .. image:: ../pictures/04.gif
      :align: center      
      :class: bordered-gif   