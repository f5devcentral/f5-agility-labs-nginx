Understanding the AI Assistant application flow
===============================================

![](/lab3/images/00.png)

Let’s start by explaining the different functions. We will focus only on the most relevant parts of the flow.

**Front End Application**

This is the **AI Assistant** chatbot where you are interacting.


**AI Orchestrator**

The AI Orchestrator acts as the central hub of the entire AI system, managing the flow of information between various components. Here's a detailed look at its functions:

* **Request Handling**: It receives and processes user queries, preparing them for further processing.
* **LLM Interaction**: The Orchestrator sends the constructed prompt to Ollama (the LLM) and receives its responses.
* **Response Formatting**: It processes the LLM's output, potentially formatting or filtering it before sending it back to the user.
* **State Management**: The Orchestrator  maintains the state of the conversation, ensuring continuity across multiple user interactions.
* **Error Handling**: It manages any errors or exceptions that occur during the process, ensuring graceful failure modes.

**Ollama ( Inference Services )**

Ollama is an advanced AI tool that facilitates the local execution of large language models (LLMs), such as Llama 2, Mistral, and in our case LLama 3.1 8B.
The key Features of Ollama:

* **Local Execution**: Users can run powerful language models directly on their machines, enhancing privacy and control over data.
* **Model Customization**: Ollama supports the creation and customization of models, allowing users to tailor them for specific applications, such as chatbots or summarization tools.
* **User-Friendly Setup**: The tool provides an intuitive interface for easy installation and configuration, currently supporting macOS and Linux, with Windows support planned for the future.
* **Diverse Model Support**: Ollama supports various models, including Llama 2, uncensored Llama, Code Llama, and others, making it versatile for different natural language processing tasks.
* **Open Source**: Ollama is an open-source platform, which means its source code is publicly available, allowing for community contributions and transparency.

The traffic is passing from the **Front End Application** to the **AI Orchestrator** where the conversation chat is maintained. The **AI Orchestrator** will pass the chat to  **Ollama ( Inference Services )** through the **AI Gateway** which will perform the security inspection both on the request and the response.


## Understanding the **AI Gateway** initial config

1. First we define what is the endpoint of the **inference service** that hosts the LLM. This is configured under **services**.

   ```yaml
   services:
    - name: ollama
        executor: http
        config:
        endpoint: "http://ollama_public_ip:11434/api/chat"
        schema: ollama-chat 
   ```

2. Second we need to define a **profile** that points to the service.

   ```yaml
   profiles:
    - name: default
        services:
        - name: ollama
   ```

3. Next we define a **policy** and attack the profile to it.

   ```yaml
   policies:
    - name: arcadia_ai_policy
        profiles:
        - name: default
   ```

4. Last we combine everything by defining a **route** which is the entry point that the AI Gateway is listening with the policy.   

   ```yaml
   routes:
    - path: /api/chat
        policy: arcadia_ai_policy
        timeoutSeconds: 600
        schema: openai
   ```

5. The final config will look as following which is currently applied to the AI Gateway:

   ```yaml
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
        endpoint: "http://ollama_public_ip:11434/api/chat"
        schema: ollama-chat

    # What do we do with the request, at the moment we just forward it
    profiles:
    - name: default
        services:
        - name: ollama
   ```           

6. Go ahead and ask the **AI Assistant** a question. And review the **AI Gateway** logs.

   ```
   2025/01/12 13:58:19 INFO service selected name=http/
   2025/01/12 13:58:19 INFO executing http service
   2025/01/12 13:58:24 INFO service response name=http/ result="map[status:200 OK]"
   ```


   
You can now proceed to the next part.    
