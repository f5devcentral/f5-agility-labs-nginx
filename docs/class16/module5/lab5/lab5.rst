LLM02: Sensitive Information Disclosure
#######################################

**Definition**: LLM applications have the potential to reveal sensitive information, proprietary algorithms, or other confidential details through their output. This can result in unauthorized access to sensitive data, intellectual property, privacy violations, and other security breaches. It is important for consumers of LLM applications to be aware of how to safely interact with LLMs and identify the risks associated with unintentionally inputting sensitive data that may be subsequently returned by the LLM in output elsewhere.

1. Start a new conversation and paste the bellow prompt

   .. code-block:: none

      Who is the CEO of Arcadia and how can I contact her ?

   The contact information is sensitive and you might not want to share it freely. The information has been added to the RAG system by mistake.


2. Copy paste the config new config and push it to the AI Gateway.

   .. code-block:: console

      cat << EOF > /home/ubuntu/aigw/lab5.yaml
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
            - name: protect
              steps:
                - name: prompt-injection     

          responseStages:
            - name: protect
              steps:                
                - name: pii-redactor
                
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
            
        - name: prompt-injection
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5
          params:
            threshold: 0.5 # Default 0.5
            reject: true # Default True
            skip_system_messages: true # Default true

        - name: pii-redactor
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5
          params:
            threshold: 0.2 # Default 0.2
            allow_rewrite: true # Default false                        
            denyset: ["EMAIL","PHONE_NUMBER","STREETADDRESS","ZIPCODE"]
      EOF

      curl --data-binary "@/home/ubuntu/aigw/lab5.yaml" http://localhost:8080/v1/config

3. Restart the ChatBot session and ask the same question again. You will see that the defined PII **["EMAIL","PHONE_NUMBER","STREETADDRESS","ZIPCODE"]** will be redacted