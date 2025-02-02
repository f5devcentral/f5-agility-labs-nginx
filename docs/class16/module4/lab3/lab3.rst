Route based on language
#######################

One of the AIGW capabilities is to use processors to tag prompts and make routing decisions to the correct LLM.

We are going to configure our first **processor**. The processor will indetify the prompt language and it will tag it so that the **AIGW Core** will route it to a specialized LLM.

In our application we want to fully support the French language. To achive this we have deployed a specialized model ( mistral ) for the Italian language.

1. Copy paste the config new config and push it to the AI Gateway.

   .. code-block:: console

      cat << EOF > /home/ubuntu/aigw/lab3.yaml
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
            
        - name: ollama-mistral
          executor: http    
          config:
            endpoint: "http://$$ollama_public_ip$$:11434/api/chat"
            schema: ollama-mistral
      
      # What do we do with the request, at the moment we just forward it
      profiles:
        - name: default
          inputStages:
            - name: analyze
              steps:
                - name: language-id         
                
          services:
            - name: ollama
            - name: ollama-mistral      
              selector:
                tags:
                  - "language:it"       
      
      # Here we will find all our processor configuration
      processors:
        - name: language-id
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5            
      EOF

      curl --data-binary "@/home/ubuntu/aigw/lab3.yaml" http://localhost:8080/v1/config

2. Go ahead and chat with the **ChatBot** in Italian, **Come va la tua giornata, amico mio, tutto bene?** .