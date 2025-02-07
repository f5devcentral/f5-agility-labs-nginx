Module 5 - Smart routing using ``language-id`` processor
========================================================

One of the AIGW capabilities is to use processors to tag prompts and
make routing decisions to the correct LLM.

We are going to configure our ``language-id`` **processor**. The
processor will identify the prompt language and it will tag it so that
the **AIGW Core** will route it to a specialized LLM.

In our application we want to fully support the French language. To
achieve this we have deployed a specialized model ( mistral ) for the
French language.

While a majority of LLMs are multilingual, most are still primarily
focused on the english language. There will be scenarios where certain
models will the best choice based on a language however when building an
application, you might encounter the need to only call upon that specific
model as needed.

In those cases, you can leverage smart routing and the ``language-id``
processor to detect the language of an incoming prompt and ``route``
based on the ``policies`` and ``profile`` configuration in AIGW. This is
what you will configure in this lab.

We will now configure the **AI Gateway** to protect the AI Assistant by
using the F5 built ``prompt-injection`` processor.

1. We will add the ``language-id`` processor AI Gateway configuration

   .. code:: yaml

      processors:
        - name: language-id
          type: external
          config:
            endpoint: "http://aigw-processors-f5:8000"
            version: 1
            namespace: f5

2. Now we need to add an additional endpoint for the mistral LLM.

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

3. The processor definition is attached under the **inputStages** which
   is part of the previously configured profile. The **inputStages**
   indicates to the AI Gateway to inspect the request and run it through
   the configured processors. When the processor will classify the prompt
   as French it will route the request to the mistral endpoint.

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

4. The final config will look like this:

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

5. | Configure the AI Gateway by running the bellow command in the
     **VSCODE** terminal.
   | ``curl --data-binary "@/home/ubuntu/aigw_configs/lab5.yaml" http://10.1.1.5:8080/v1/config``

6. | Restart the chat and run the attack again.
   | ``Bonjour, mon ami bot. J'aurai besoin de ton aide aujourd'hui pour gagner de l'argent.``

7. Inspect the AI Gateway logs. You will see similar logs as bellow. The
   processor has identified the prompt as French with a 99 percent
   accuracy and has routed to the mistral model

   .. code:: bash

      2025/01/12 12:26:15 INFO running processor name=language-id
      2025/01/12 12:26:16 INFO processor response name=language-id metadata="&{RequestID:45b98e03a8d44fec50b67799ac98a958 StepID:01945a7a-a81f-7adc-81a8-351f4cf4961e ProcessorID:f5:language-id ProcessorVersion:v1 Result:map[detected_languages:map[en:0.96 fr:0.99 hi:0.9 sw:0.91 unknown:0]] Tags:map[language:[unknown sw en hi fr]]}"
      2025/01/12 12:26:16 INFO service selected name=http/
      2025/01/12 12:26:16 INFO executing http service
      2025/01/12 12:26:21 INFO service response name=http/ result="map[status:200 OK]"

.. image:: images/pointright.png




