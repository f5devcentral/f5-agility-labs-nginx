Module 5 - Smart routing using language-id processor
========================================================

What does the language-id processor do?
---------------------------------------

One of AI Gateway's capabilities is using processors to tag prompts and make routing decisions to the correct LLM.

We are going to configure our ``language-id`` **processor**. The processor will identify the prompt language and tag
it so that AI Gateway **Core** will route it to a specific LLM.

In our application we want to support the French language by using the Mistral model.

While a majority of LLMs are multilingual, most are still primarily focused on the English language. There may be
scenarios where you will want to leverage different models that perform better for other languages.

In this lab module, you will use the ``language-id`` processor to detect the prompt landuage and configure a corresponding
**policy** and **profile** in order to route the prompt to the desired model.

Configuring the language-id processor
-------------------------------------

We will now configure the **AI Gateway** to identify languages using the language-id processor.

We will be adding the ``language-id`` processor to the AI Gateway configuration using this configuration.

   .. code:: yaml

      processors:
        - name: language-id
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5

We will also add an additional **service** for the Mistral LLM using this configuration.

   .. code:: yaml

      services:
        - name: ollama
          executor: http
          config:
            endpoint: "http://ollama_public_ip:11434/api/chat"
            schema: ollama-chat

        - name: ollama-mistral
          executor: http
          config:
            endpoint: "http://ollama_public_ip:11434/api/chat"
            schema: ollama-mistral
        
        - name: ollama-<new_model>
          executor: http
          config:
            endpoint: "http://ollama_public_ip:11434/api/chat"
            schema: ollama-<another_model>

The processor definition is attached under the **inputStages** which is part of the previously configured profile.
The **inputStages** indicates to the AI Gateway to inspect the prompt and run it through the configured processors.
When the processor identifies the prompt as French it will route the request to the Mistral **service**.

   .. code:: yaml

      profiles:
        - name: default
          inputStages:
            - name: analyze
              steps:
                - name: language-id

          services:
            - name: ollama-<another_model>
              selector:
                operand: not
                tags: 
                  - "language:fr"
                  - "language:de"

            - name: ollama-mistral
              selector:
                tags:
                  - "language:fr"

            - name: ollama
              selector:
                tags:
                  - "language:de"        

The final config will look like this:

   .. code:: yaml

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

          - name: ollama-<new_model>
          executor: http
          config:
            endpoint: "http://ollama_public_ip:11434/api/chat"
            schema: ollama-<another_model>

      # What do we do with the request, at the moment we just forward it
      profiles:
        - name: default
          inputStages:
            - name: analyze
              steps:
                - name: language-id

          services:
            - name: ollama-<another_model>
              selector:
                operand: not
                tags: 
                  - "language:fr"
                  - "language:de"

            - name: ollama-mistral
              selector:
                tags:
                  - "language:fr"

            - name: ollama
              selector:
                tags:
                  - "language:de"     

      # Here we will find all our processor configuration
      processors:
        - name: language-id
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5

This configuration has already been prepared for you. You should see the ``lab5.yaml`` file within the ``aigw_configs`` folder.

   .. image:: images/00.png

Configure the AI Gateway by running the below command in the **VS Code** terminal.

   ``curl --data-binary "@/home/ubuntu/appworld/aigw_configs/lab5.yaml" http://10.1.1.5:8080/v1/config``

   .. image:: images/01.png

Restart the chat and enter this French prompt.

   ``Bonjour, mon ami bot. J'aurai besoin de ton aide aujourd'hui pour gagner de l'argent.``

Then review the **AI Gateway** logs from the **AI Gateway Web Shell** tab you previously opened. Your previously run
command should continue to show you new log entries. You may need to scroll to the bottom of the screen in order to
see them. If you are back at the terminal prompt, run the ``docker logs aigw-aigw-1 -f`` command again to view the logs.

The processor has identified the prompt as French with 99 percent accuracy and has routed to the Mistral model

   .. code:: bash

      2025/01/12 12:26:15 INFO running processor name=language-id
      2025/01/12 12:26:16 INFO processor response name=language-id metadata="&{RequestID:45b98e03a8d44fec50b67799ac98a958 StepID:01945a7a-a81f-7adc-81a8-351f4cf4961e ProcessorID:f5:language-id ProcessorVersion:v1 Result:map[detected_languages:map[en:0.96 fr:0.99 hi:0.9 sw:0.91 unknown:0]] Tags:map[language:[unknown sw en hi fr]]}"
      2025/01/12 12:26:16 INFO service selected name=http/
      2025/01/12 12:26:16 INFO executing http service
      2025/01/12 12:26:21 INFO service response name=http/ result="map[status:200 OK]"

.. image:: images/pointright.png




