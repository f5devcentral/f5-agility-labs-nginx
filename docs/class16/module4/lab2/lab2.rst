Inserting AI Gateway in the traffic flow
########################################

Now that we have an understanding of what AI Gateway is and how it works we will need to achive the bellow architecture.

.. image:: ../pictures/Slide4.PNG
   :align: center

1. First we need to modify the Arcadia Crypto App to point to the **AIGW** instead of the Ollama endpoint

   Go to the **UDF Deployment** →  **Components** → Click **Access** on **MicroK8s** → **Webshell**

   Copy paste the bellow command.

   .. code-block:: console

      sed -i "s/$$ollama_public_ip$$:11434/10.1.1.5:4141/g" /home/ubuntu/arcadia_crypto/arcadia.yaml
      kubectl --kubeconfig /home/ubuntu/.kube/config apply -f /home/ubuntu/arcadia_crypto/arcadia.yaml

2. Next we need to prepare the AIGW configuration. At the moment **AI Gateway** is in early access and the configuration will be done through **yaml** files.

   Go to the **UDF Deployment** →  **Components** → Click **Access** on **AI Gateway** → **Webshell**.

   Once we got the linux bash go to **/home/ubuntu/aigw/** directory, all config will be done here.

   .. code-block:: console

      cat << EOF > /home/ubuntu/aigw/initial_config.yaml
      mode: standalone
      adminServer:
        address: :8080
      server:
        address: :4141
      
      # The routes determine on what URL path the AIGW is listening
      routes:
        - path: /api/chat
          policy: arcadia_ai_policy
          timeoutSeconds: 600
          schema: openai
      
      # What policy is applied to the route
      policies:
        - name: arcadia_ai_policy
          profiles:
            - name: default      
      
      # To what LLM endpoint we forward the request to
      services:
        - name: ollama
          executor: http    
          config:
            endpoint: "http://$$ollama_public_ip$$:11434/api/chat"
            schema: ollama-chat  
            
      # What do we do with the request, at the moment we just forward it
      profiles:
        - name: default
          services:
            - name: ollama
      EOF

3. Now that we got our initial config ready bring up the **AI Gateway** with docker compose.

   .. code-block:: console

      docker compose up -d

3. Bring up the logs to see the traffic going through the **AI Gateway* with the bellow command and go chat with the **ChatBot**

   .. code-block:: console

      docker logs aigw-aigw-1 -f