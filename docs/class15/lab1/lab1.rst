.. image:: ../images/darkbanner.png

Lab 1 - F5 AI Gateway configuration walkthrough
===============================================

A deeper look into configuring the AI Gateway components
--------------------------------------------------------

In the introduction, we reviewed F5 AI Gateway's two main components, **Core** and **Processors**.

There are several key configuration components to understand as well:

+------------------+------------------------------------------------------+
| Component        | Description                                          |
+==================+======================================================+
| ``routes``       | the applications exposed by AIGW and made accessible   |
|                  | to Gen AI apps and users                             |
+------------------+------------------------------------------------------+
| ``services``     | the LLM models AIGW will route requests to           |
+------------------+------------------------------------------------------+
| ``policies``     | a set of reusable rules that are evaluated at        |
|                  | runtime on a per-request basis, picking the best     |
|                  | processing profile for the request                   |
+------------------+------------------------------------------------------+
| ``profiles``     | applies processors to incoming and response requests |
+------------------+------------------------------------------------------+
| ``processors``   | the AI middleware that provide enhancements,         |
|                  | protections and performance improvements for AI       |
|                  | applications                                         |
+------------------+------------------------------------------------------+

Component diagram
-----------------

.. mermaid::

  flowchart LR
  A[Upstream Proxy] --> AIGW[AIGW Core]
    subgraph AIGW[AIGW Core]
      direction LR
      Routes@{shape: procs}
      -->
      Policies@{shape: procs}
      -->
      Profiles@{shape: procs}
      -->Services@{shape: procs}
    end
    subgraph Processors[AIGW Processors]
      direction LR
      Processes@{shape: procs}
    end
    Profiles --> Processors
    Services --> OpenAI
    Services --> Anthropic
    Services --> Ollama
    Services --> OtherLLM[Other external LLMs]


The **AIGW core** component acts as an HTTP router for incoming AI
requests. The core is configured by defining ``routes`` that will accept
incoming requests that have been processed by the upstream proxy. It
will evaluate against the associated ``policies`` which has ``profiles``
that define whether to send the request to a ``processor`` and then on
to the LLMs using the ``services`` that AIGW has been configured with.

| The **AIGW processors** are the AI middleware that provide
  protections, enhancements and improvements to incoming AI specific
  requests. There are several different F5 processors available,
  including for the `OWASP Top 10 for LLM and GenAI
  Apps <https://genai.owasp.org/llm-top-10/>`__.
| Once the ``processor`` has inspected the prompt and taken necessary
  actions, it sends the request (or response) back to the **core** for
  routing of requests.

**NOTE**: AIGW will support 9 of the 10 OWASP Top 10 protections.

Breaking down a sample AIGW configuration file
----------------------------------------------

AI Gateway’s configuration can be found in ``aigw.yaml``. It consists of
a number of sections described below.

General
~~~~~~~

The general settings section allows you configure a port to listen for
incoming requests as well as the ``adminServer`` port.

.. code:: yaml

   mode: standalone
   server:
     address: :4141
   adminServer:
     address: :8080

The additional configurable components for this section:


=================== =====================================================================================================
**Setting**         **Description**
=================== =====================================================================================================
**mode**            Options include ``standalone`` or ``upstream``. In ``upstream`` mode, AI gateway expects a proxy to 
                    forward requests to AI Gateway.
**server:**         This section defines the settings for the AI Gateway core server.
**- address**       The address and port where AI Gateway core listens for incoming requests.
**- tls**           Enable TLS authentication and configure TLS cert and key paths.
**- mtls**          Enable for mTLS authentication and provide the required ``clientCertPath``.
**adminServer:**    This section defines the AI gateway's admin server.
**- address**       The address and port where the admin server listens for incoming requests.
=================== =====================================================================================================

Here is an example of setting up mTLS with AIGW core:

.. code:: yaml

   mode: standalone
   server:
     address: :8443
     tls:
       enabled: true
       serverCertPath: .certs/server.crt
       serverKeyPath: .certs/server.key
     mtls:
       enabled: true
       clientCertPath: .certs/ca.crt
   adminServer:
     address: localhost:8080

Routes
~~~~~~

``Routes`` define the endpoints that F5 AI gateway listens for and the
policy that applies to each route. ``routes`` have the following
settings:

.. code:: yaml

   routes:
     - path: /insecure
       policy: insecure
       schema: openai

The ``routes`` components that can be configured:

+-------------------+-----------------------------------------------------------------------------------------------------+
| **Setting**       | **Description**                                                                                     |
+-------------------+-----------------------------------------------------------------------------------------------------+
| **path**          | The URI of the endpoint where a service is offered. The ``path`` is user-defined and must be unique |
|                   | from other routes.                                                                                  |
+-------------------+-----------------------------------------------------------------------------------------------------+
| **policy**        | The policy that applies to the requests for this route.                                             |
+-------------------+-----------------------------------------------------------------------------------------------------+
| **schema**        | The input and output schema for the route. If the schema is not specified, raw text is expected.    |
|                   | Options are: raw, openai, anthropic, custom HTTP.                                                   |
+-------------------+-----------------------------------------------------------------------------------------------------+
| **timeoutSeconds**| The number of seconds before requests to this route will timeout.                                   |
+-------------------+-----------------------------------------------------------------------------------------------------+


Policies
~~~~~~~~

``Policies`` are a set of reusable rules that pick the best processing
profile for a given request. These are evaluated at runtime and
dynamically apply a processing profile for each request that is received
by F5 AIGW.

.. code:: yaml

   policies:
     - name: insecure
       profiles:
         - name: insecure

     - name: secure
         - name: secure

     - name: language
       profiles:
         - name: language

Profiles
~~~~~~~~

``Profiles`` configuration component defines a set of ``processors`` and
``services`` that apply to the **input** and the **output** of the AI
model based on a set of rules using the ``inputStages`` and
``responseStages`` definitions.

.. code:: yaml

   profiles:
     - name: phi3
       limits: []
       services:
         - name: ollama/phi

     - name: secure
       limits: []
       inputStages:
         - name: protect
           steps:
             - name: prompt-injection
       services:
         - name: ollama/llama3

     - name: language
       limits: []
       inputStages:
         - name: analyze
           steps:
             - name: language-id
       responseStages:
         - name: watermark
           steps:
             - name: watermark

Processors
~~~~~~~~~~

``Processors`` are the available processors that have been enabled to be
used by AIGW. They are applied to incoming and response requests using
``profiles``. Different processors can be used for different use cases.
For example, a processors can look for **prompt injection** attacks
while others can inspect requests for **pii** data. You can also apply
multiple processors to any given request or response.

.. code:: yaml

   processors:
     - name: language-id
       type: external
       config:
         endpoint: "http://aigw-processors-f5:8000"
         namespace: "f5"
         version: 1

     - name: system-prompt
       type: external
       config:
         endpoint: "http://aigw-processors-f5:8000"
         namespace: "f5"
         version: 1

     - name: watermark
       type: external
       config:
         endpoint: "http://aigw-processors-f5:8000"
         namespace: "f5"
         version: 1

     - name: pii-redactor
       type: external
       config:
         endpoint: "http://aigw-processors-f5:8000"
         namespace: "f5"
         version: 1

     - name: prompt-injection
       type: external
       config:
         endpoint: "http://aigw-processors-f5:8000"
         namespace: "f5"
         version: 1
       params:
         allow_rejection: true


By default, when you apply multiple processors to a request, they will
run sequentially, one after another. Alternatively, you can configure
``processors`` to run in parallel using the ``concurrency`` option in
the ``profiles`` section in ``aigw.yaml``.

**NOTE:** When running ``processors`` with ``concurrency`` enabled, the
processors cannot modify the content of the input or output. They can
only add metadata and tags to the content.

Processors running in parallel example:
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code:: yaml

   profiles:
     - name: parallel-example
       concurrency: parallel
       inputStages:
         - name: protect
           steps:
             - name: language-id
             - name: system-prompt

Services overview
~~~~~~~~~~~~~~~~~

``Services`` are configured upstream LLM services that AIGW has been
configured to route traffic to.

.. code:: yaml

   services:
     - name: ollama/phi
       type: phi3
       executor: ollama
       config:
         endpoint: "http://llmmodel01:11434/api/generate"

     - name: ollama/llama3
       type: llama3
       executor: ollama
       config:
         endpoint: "http://llmmodel01:11434/api/generate"
       executor: ollama

     - name: ollama/llama32
       type: llama3
       executor: ollama
       config:
         endpoint: "http://llmmodel01:11434/api/generate"
       executor: ollama

| The different components of ``services`` in F5 AIGW configuration:

+------------------------+-------------------------------------------------------------------------------------------------+
| **Setting**            | **Description**                                                                                 |
+------------------------+-------------------------------------------------------------------------------------------------+
| **name**               | The name of the service. User-defined and must be unique.                                       |
+------------------------+-------------------------------------------------------------------------------------------------+
| **type**               | Indicates the type of model that the service provides. For example, for ``openAI/azure``,       |
|                        | ``ollama/llama3``.                                                                              |
+------------------------+-------------------------------------------------------------------------------------------------+
| **executor**           | Indicates which executor to use to process the request. Options are: ``openai``, ``anthropic``, |
|                        | or ``ollama``.                                                                                  |
+------------------------+-------------------------------------------------------------------------------------------------+
| **config:**            | The configuration of the executor, allowing additional key-value pairs to be passed to the      |
|                        | executor.                                                                                       |
+------------------------+-------------------------------------------------------------------------------------------------+
| **- endpoint**         | The endpoint URL of the service.                                                                |
+------------------------+-------------------------------------------------------------------------------------------------+
| **- apiVersion**       | For azure type services, obtained from Azure AI studio. The version of ``OpenAI API`` to use.   |
+------------------------+-------------------------------------------------------------------------------------------------+
| **- anthropicVersion** | For anthropic type services, the version of the ``Anthropic API`` to use.                       |
+------------------------+-------------------------------------------------------------------------------------------------+
| **- secrets**          | Defines the source and names of the secrets needed by the service (API Keys).                   |
+------------------------+-------------------------------------------------------------------------------------------------+


External LLM services
~~~~~~~~~~~~~~~~~~~~~

F5 AIGW also supports other cloud LLM services, including Anthropic,
OpenAI (public and azure). You will need to provide your own API key in
order to use the cloud service with AIGW. Here is an example of how to
configure OpenAI GPT-4o service:

.. code:: yaml

   services:
     - name: openai/public
       type: gpt-4o
       executor: openai
       config:
         endpoint: "https://api.openai.com/v1/chat/completions"
         secrets:
           - source: EnvVar
             targets:
               apiKey: OPENAI_API_KEY


| `Click here for lab 2 <../lab2/lab2.html>`__

.. image:: ../images/Designer.jpeg
