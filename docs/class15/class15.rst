.. image:: ./images/darkbanner.png

Class 15 - Introduction to F5 AI Gateway
===========================================================

**Lab Outline**

* F5 AIGW Configuration walkthrough
* Accessing the lab environment
* Understanding the lab AI assistant workflow
* LLM01: Prompt-injection Attack
* Smart routing with language-id processor
* LLM02: Sensitive information disclosure
* LLM07: System prompt leakage

**This Lab may take 5-10 minutes to boot up. Allow for start up time**

Log into UDF and start up the lab environment. Given all of the components of this lab, it can take 5-10 minutes for the
entire environment to complete startup. Booting up your lab right away will ensure the environment is ready for use by
the time you reach Module 2.

**Components of lab**

There are three VMs used in this lab as well as an AWS environment provisioned with your lab.

=============== ====================================================================================================
**Jumphost**    Runs VSCode, which provides a web interface to edit the configuration files for AI Gateway
**AI Gateway**  Runs AI Gateway. You will access logs from this component throughout the lab
**MicroK8s**    Runs Arcadia Cyrpto, a fictitious finance application with an AI chatbot
=============== ====================================================================================================

**AWS Environment**

This lab also uses Ollama for inference of various models. An Ollama instance is created for your lab instance and
runs separately in AWS. You will note that your lab configurations have a public IP address when referring to the Ollama
instance. This is generated when your lab starts and removed when your lab ends. Do not change this IP address.

**OWASP Top 10 for LLM Applications and Generative AI**

Open Worldwide Application Security Project is a nonprofit foundation that works to improve the security of software. Their
programs include a number of projects which include "Top 10" lists that describe areas of concern when it comes to
application security. LLM Applications and Generative AI has a Top 10 project which can be found `here`_.

.. _here: https://genai.owasp.org/

You will find that AI Gateway, and this lab in particular, will refer to specific items on the LLM and Gen AI Top 10 list.
This helps practitioners quickly align protections to the top security threats for these types of applications.


.. toctree::
   :maxdepth: 1
   :glob:
   
   intro
   externalllm
   module*/module*