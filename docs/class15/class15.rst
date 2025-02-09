.. image:: ./images/darkbanner.png

Class 15 - Introduction to F5 AI Gateway
===========================================================

**Lab Outline**

* F5 AIGW Configuration walkthrough
* Accessing the lab environment
* Understanding the lab AI assistant workflow
* LLM01 Prompt-injection Attack
* Smart routing with language-id processor
* LLM02 Sensitive information disclosure
* LLM07 System prompt leakage

**Allow for lab start up time**

Log into UDF and start up the lab environment. Given the resource intensity of this lab, it can take a few minutes for the lab VMs to start up to
completion. This will ensure your lab environment is ready for use by the time you reach Module 2.

**Components of lab**

There are three VMs used in this lab.

=============== ====================================================================================================
**Jumphost**    Runs VSCode, which provides a web interface to edit the configuration files for AI Gateway
**AI Gateway**  Runs AI Gateway. You will access logs from this component throughout the lab
**MicroK8s**    Runs Arcadia Cyrpto, a fictitious finance application with an AI chatbot
=============== ====================================================================================================

**NOTE** You can expect requests to the ollama LLM could take some time, so be patient on waiting for the responses.

**NOTE** You can install additional models on that VM using ``ollama CLI tool``.


.. toctree::
   :maxdepth: 1
   :glob:
   
   intro
   externalllm
   module*/module*