Inserting AI Gateway in the traffic flow
########################################

Now that we have an understanding of what AI Gateway is and how it works we will need to achive the bellow architecture.

.. image:: ../pictures/Slide4.PNG
   :align: center

1. First we need to modify the Arcadia Crypto App to point to the **AIGW** instead of the Ollama endpoint

   Go to the **UDF Deployment** →  **Components** → Click **Access** on **Jumphost** → **Webshell**

   Copy paste the bellow command.

   .. code-block:: console

      sed -E -i 's/([0-9]{1,3}.){3}[0-9]{1,3}:11434/10.1.1.5:4141/g' /home/ubuntu/configs/arcadia.yaml
      kubectl --kubeconfig /home/ubuntu/.kube/config apply -f /home/ubuntu/configs/arcadia.yaml

   .. image:: ../pictures/01.gif
      :align: center      
      :class: bordered-gif  


   Next we need to push the AIGW configuration. At the moment **AI Gateway** is in early access and the configuration will be done through **yaml** files.
      
   .. code-block:: console

      curl --data-binary "@/home/ubuntu/configs/aigw_lab2.yaml" http://10.1.1.5:8080/v1/config



2. Go to the **UDF Deployment** →  **Components** → Click **Access** on **AI Gateway** → **Webshell**

   Bring up the logs to see the traffic going through the **AI Gateway** with the bellow command and go chat with the **ChatBot**

   .. code-block:: console

      docker logs aigw-aigw-1 -f

   .. image:: ../pictures/02.gif
      :align: center      
      :class: bordered-gif      