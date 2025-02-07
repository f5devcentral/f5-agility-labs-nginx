.. image:: ./images/darkbanner.png

Class 15 - F5 AppWorld 2025 - Introduction to F5 AI Gateway
===========================================================

**Lab Outline**

* F5 AIGW Configuration walkthrough
* Accessing the lab environment
* Understanding the lab AI assistant workflow
* LLM01 Prompt-injection Attack
* Smart routing with language-id processor
* LLM02 Sensitive information disclosure
* LLM07 System prompt leakage

**Components of lab**

There are two VMs for the lab running a kubernetes cluster.
- Primary VM named **aigw.dev.local** will be running a Linux desktop, with ``Docker,`` ``VSCode``, ``Chrome`` and terminal to interact with ``AIGW``
- A secondary VM named **llm-server01** will be running Ollama (Hostname: **llmodel01**) with different models (ollama, llama3, phi3)

**NOTE** You can expect requests to the ollama LLM could take some time, so be patient on waiting for the responses.

**NOTE** You can install additional models on that VM using ``ollama CLI tool``.


.. toctree::
   :maxdepth: 1
   :glob:
   
   intro
   externalllm
   module*/module*