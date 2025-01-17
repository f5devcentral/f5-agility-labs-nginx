.. raw:: html

   <h1 align="center">
   <a href="F5 AIGW Lab"><img width="900" src="./images/darkbanner.png" alt="F5 AIGW Lab"></a>
   </h1>

.. raw:: html

   </p>

Table of Contents
=================

-  `Table of Contents <#table-of-contents>`__
-  `What is generative AI? <#what-is-generative-ai>`__

   -  `What are large language models
      (LLMs)? <#what-are-large-language-models-llms>`__

-  `Overview of AI Gateway <#overview-of-ai-gateway>`__

   -  `What is AI Gateway? <#what-is-ai-gateway>`__
   -  `Core <#core>`__
   -  `Processors <#processors>`__
   -  `What are the use cases for AI
      Gateway? <#what-are-the-use-cases-for-ai-gateway>`__
   -  `Where does AI Gateway fit in the data
      flow? <#where-does-ai-gateway-fit-in-the-data-flow>`__

-  `Lab Outline <#lab-outline>`__

   -  `Use cases and examples <#use-cases-and-examples>`__
   -  `Components of lab <#components-of-lab>`__

-  `LLMs used in this lab <#llms-used-in-this-lab>`__

   -  `Using API keys for external LLMs (OpenAI, Anthropic
      examples) <#using-api-keys-for-external-llms-openai-anthropic-examples>`__

      -  `OpenAI, using environment
         variable <#openai-using-environment-variable>`__
      -  `Anthropic, using environment
         variable <#anthropic-using-environment-variable>`__
      -  `Pointing to a filesystem
         location <#pointing-to-a-filesystem-location>`__

What is generative AI?
======================

Generative AI (Gen AI) is a class of artificial intelligence systems
designed to generate new content, such as text, images, audio, video,
and even code, basd on patterns learned from exisiting data. Traditional
AI, which focused primarily on classicification and prediction tasks,
generative AI creates original output that mimics human creativity.

What are large language models (LLMs)?
--------------------------------------

A Large Language Model (LLM) is a type of artificial intelligence system
that is trained to understand, generate, and manipulate human language
at a large scale. LLMs are built using machine learning techniques,
particularly deep learning, and they are a subset of AI technologies.
Machine Learning (ML) is a subset of AI where machines learn from data
to improve their performance on specific tasks without being explicitly
programmed. Deep learning is a subset of ML that uses neural networks
with many layers (hence “deep”) to model complex patterns in data.

**Architecture** – The backbone of LLMs is the transformer architecture,
which uses attention mechanisms to focus on relevant parts of the input
text.

**Training** – LLMs are trained on enormous corpora of text data (e.g.,
books, websites, and documents) using techniques like unsupervised
learning (predicting missing words or sequences) and fine-tuning
(training on specific tasks with labeled data).

**Inference** – Once trained, LLMs can generate predictions or responses
by continuing a sequence of text based on their learned knowledge.

As AI continues to grow at a very fast rate, the need for AI in business
environment is rapidly increasing. The need for helpful AI tools, like
chatbots or assistants, for customers to interact with, ask questions
has significantly increased the need for AI in business. It also
presents a challenge in properly securing and observing AI traffic in
todays environments.

Overview of AI Gateway
======================

What is AI Gateway?
-------------------

F5 **AI Gateway** is a specialized platform designed to route, protect,
and manage generative AI traffic between clients and Large Language
Model (LLM) backends. It addresses the unique challenges posed by AI
applications, particularly their non-deterministic nature and the need
for bidirectional traffic monitoring.

The main AI Gateway functions are:

Core
----

The core performs the following tasks:

-  Performs Authn/Authz checks, such as validating JWTs and inspecting
   request headers.
-  Parses and performs basic validation on client requests.
-  Applies processors to incoming requests, which may modify or reject
   the request.
-  Selects and routes each request to an appropriate LLM backend,
   transforming requests/responses to match the LLM/client schema.
-  Applies processors to the response from the LLM backend, which may
   modify or reject the response.
-  Optionally, stores an auditable record of every request/response and
   the specific activity of each processor. These records can be
   exported to AWS S3 or S3-compatible storage.
-  Generates and exports observability data via OpenTelemetry
-  Prevents malicious inputs from reaching LLM backends
-  Ensures safe LLM responses to clients
-  Protects against sensitive information leaks
-  Providing comprehensive logging of all requests and responses

Processors
----------

A processor runs separately from the core and can perform one or more of
the following actions on a request or response:

-  **Modify**: A processor may rewrite a request or response. For
   example, by redacting credit card numbers.
-  **Reject**: A processor may reject a request or response, causing the
   core to halt processing of the given request/response.
-  **Annotate**: A processor may add tags or metadata to a
   request/response, providing additional information to the
   administrator. The core can also select the LLM backend based on
   these tags.

| Each processor provides specific protection or transformation
  capabilities to AI Gateway. For example, a processor can detect and
  remove Personally Identifiable Information (PII) from the input or
  output of the AI model.
| F5 AI Gateway enables organizations to confidently deploy AI
  applications anywhere. Easily ensure security, scalability, and
  reliability for your AI implementation. AI Gateway inspects inbound
  prompts and outbound responses to prevent unexpected outcomes or
  critical data leakage. Customizable observation, protection, and
  management of AI interactions help improve the usability of AI
  applications and simplifies compliance.

What are the use cases for AI Gateway?
--------------------------------------

AIGW acts as a hub for integration and streamlining of AI applications
with AI services (OpenAI, Anthropic, Mistral, Ollama, etc.). Now that we
have an understanding of what AI Gateway is and how it works we will
need to achive the bellow architecture.

General use cases:

-  Prompt injections: Detect and block any prompt injections or
   jailbreaks

   -  Prompt management
   -  Prompt templates
   -  RBAC for LLM providers (only access certain LLMS)
   -  Prompt leakage: block before it gets to LLM

-  Prompt-based routing

   -  Cost effective routing
   -  Best-fit model routing

-  Model hallucination prevention
-  Load balancing (failover, circuit breaking)
-  Rate limiting
-  AuthN/AuthZ
-  Centrally manage credentials (such as API keys to AI services)
-  PII Leakage / Data leakage: Accidental leakage of personal
   information from LLM (i.e. financial, health care information)

   -  Email address
   -  Social Security Number (SSN)
   -  Date of birth
   -  Credit card numbers
   -  Data exfiltration

Where does AI Gateway fit in the data flow?
-------------------------------------------

| |AIGW archi|
| F5 AI Gateway should be architected behind a proxy (i.e. BIG-IP,
  NGINX). This proxy can then manage Layer 7 traffic and provide WAF
  protections before traffic reached AIGW. Once traffic reaches AIGW, it
  is handling the AI specific traffic and focuses on analyzing the
  prompt and taking required action based on AIGW’s configuration.

Lab Outline
===========

Use cases and examples
----------------------

1. `Lab 1 F5 AIGW Configuration walkthrough <lab1/lab1.rst>`__
2. `Lab 2 Accessing the lab environment <lab2/lab2.rst>`__
3. `Lab 3 Understanding the lab AI assistant workflow <lab3/lab3.rst>`__
4. `Lab 4 LLM01 Prompt-injection Attack <lab4/lab4.rst>`__
5. `Lab 5 Smart routing with language-id processor </lab5/lab5.rst>`__
6. `Lab 6.LLM02 Sensitive information disclosure <lab6/lab6.rst>`__
7. `Lab 7 LLM07 System prompt leakage <lab7/lab7.rst>`__

Components of lab
-----------------

| There are two VMs for the lab running a kubernetes cluster. - Primary
  VM named **aigw.dev.local** will be running a Linux desktop, with
  ``Docker,`` ``VSCode``, ``Chrome`` and terminal to interact with
  ``AIGW`` - A secondary VM named **llm-server01** will be running
  Ollama (Hostname: **llmodel01**) with different models (ollama,
  llama3, phi3)
| - **NOTE**: You can expect requests to the ollama LLM could take some
  time, so be patient on waiting for the responses. - **NOTE**: You can
  install additional models on that VM using ``ollama CLI tool``:

LLMs used in this lab
=====================

This lab uses Ollama which is free and provides different LLMs for basic
testing and PoC’ing.

If you would like to use an external LLM service such as OpenAI or
Anthropic, you will need to obtain your own API key and follow the
instructions below.

Using API keys for external LLMs (OpenAI, Anthropic examples)
-------------------------------------------------------------

First, obtain an API key from your external LLM service. The follow
links have guidance for the respective services: -
`OpenAI <https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key>`__
- `Anthropic <https://docs.anthropic.com/en/api/getting-started>`__

When configuring AIGW, you can set OS environment variables and then
refer to them within the ``services`` definition in the ``aigw.yaml``.
The following examples will show this configuration.

OpenAI, using environment variable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example terminal command for setting an environment variable
``OPENAI_PUBLIC_API_KEY`` with your OpenAI API key.

.. code:: shell

   export OPENAI_PUBLIC_API_KEY=<your_api_key_from_openai>

Here is how you can refer to it in the ``services`` definition for
``openai/public`` under ``apiKeyEnv``.

.. code:: yaml

   services:
     - name: openai/public
       type: gpt-4o
       executor: openai
       config:
         endpoint: "https://api.openai.com/v1/chat/completions"
         apiKeyEnv: OPENAI_PUBLIC_API_KEY

Anthropic, using environment variable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example terminal command for setting an environment variable
``ANTHROPIC_PUBLIC_API_KEY`` with your Anthropic API key.

.. code:: shell

   export ANTHROPIC_PUBLIC_API_KEY=<your_api_key_from_anthropic>

Then, refer to it in the ``services`` definition for
``anthropic/sonnet`` under ``apiKeyEnv``.

.. code:: yaml

   services:
     - name: anthropic/sonnet
       type: claude-3-5-sonnet-20240620
       executor: anthropic
       config:
         anthropicVersion: 2023-06-01
         apiKeyEnv: ANTHROPIC_PUBLIC_API_KEY

Pointing to a filesystem location
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can also point to a location on the filesystem instead of using an
environment variable.

.. code:: shell

   mkdir /etc/secret
   echo "your_api_key_from_openai" > /etc/secret/openai

Then, refer to this path and file using a ``secrets`` definition under
``config`` as shown below.

.. code:: yaml

   services:
     - name: openai/public
       type: gpt-4o
       executor: openai
       config:
         endpoint: "https://api.openai.com/v1/chat/completions"
         secrets:
           - source: File
             meta:
               path: /etc/secret
             targets:
               apiKey: openai

`Click here to proceed to Lab 1. <./lab1/lab1.rst>`__

.. |AIGW archi| image:: ./images/aigw-arch.jpeg
.. <p align="center">
..   <img src="./images/darkbanner.png" alt="Your AI world" style="width:90%; max-height:500px;">
.. </p>     
