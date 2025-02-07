Using external LLMs with this lab
=================================

This lab uses Ollama which is free and provides different LLMs for basic
testing and PoC’ing.

If you would like to use an external LLM service such as OpenAI or
Anthropic, you will need to obtain your own API key and follow the
instructions below.

Using API keys for external LLMs (OpenAI, Anthropic examples)
-------------------------------------------------------------

First, obtain an API key from your external LLM service. The following
links have guidance for the respective services:

- `OpenAI <https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key>`__
- `Anthropic <https://docs.anthropic.com/en/api/getting-started>`__

When configuring AIGW, you can set OS environment variables and then
refer to them within the ``services`` definition in the ``aigw.yaml``.
The following examples will show this configuration.

OpenAI, using environment variable
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

