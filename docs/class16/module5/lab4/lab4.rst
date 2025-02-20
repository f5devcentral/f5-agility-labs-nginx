LLM02: Sensitive Information Disclosure
=======================================

**Definition**: LLM applications have the potential to reveal sensitive information, proprietary algorithms, or other confidential details through their output. This can result in unauthorized access to sensitive data, intellectual property, privacy violations, and other security breaches. It is important for consumers of LLM applications to be aware of how to safely interact with LLMs and identify the risks associated with unintentionally inputting sensitive data that may be subsequently returned by the LLM in output elsewhere.

Attack
------

The **AI Assistant** might have access to personal information which could have been provided to it ever by mistake or with malicious intent.  

This attack vector can expose **PII** data which is not allowed.

Start a new conversation and paste the bellow prompt

.. code-block:: none

  Who is the CEO of Arcadia and how can I contact her ?

The contact information is sensitive and you might not want to share it freely. The information has been added to the RAG system by mistake.

.. image:: ../pictures/06.gif
  :align: center      
  :class: bordered-gif


Protect
-------

We will now configure the **AI Gateway** to protect the AI Assistant by using the F5 built ``pii-redactor`` processor.

1. In the **UDF Jumphost** **Web Shell** configure the AI Gateway by running the bellow command.

   .. code-block:: console

      curl --data-binary "@/home/ubuntu/configs/aigw_lab4.yaml" http://10.1.1.5:8080/v1/config

   .. image:: ../pictures/07.gif
      :align: center      
      :class: bordered-gif


2. Restart the chat and run the attack again.

   .. code-block:: none

      Who is the CEO of Arcadia and how can I contact her ?

   You will see that this time **AI Gateway** is redacting the **PII** data.

   Inspect the AI Gateway logs. You will see similar logs as bellow. The processor identified the PII data and redacted it.

   .. code:: bash

      2025/01/12 12:51:08 INFO executing http service
      2025/01/12 12:51:10 INFO service response name=http/ result="map[status:200 OK]"
      2025/01/12 12:51:10 INFO running processor name=pii-redactor
      2025/01/12 12:51:11 INFO processor response name=pii-redactor metadata="&{RequestID:b563b1e79782ab7b9baa65a4036a2de6 StepID:01945a91-7046-7501-be13-cc5dd75eefe8 ProcessorID:f5:pii-redactor ProcessorVersion:v1 Result:map[response_predictions:[map[end:44 entity_group:FIRSTNAME score:0.7522637248039246 start:38 word: Sarah] map[end:143 entity_group:PHONE_NUMBER score:0.9938915371894836 start:125 word: +1 (415) 555-0123] map[end:179 entity_group:EMAIL score:0.999950647354126 start:150 word: sarah.chen@arcadiacrypto.com] map[end:205 entity_group:STREETADDRESS score:0.8643882870674133 start:188 word: 123 Tech Street,] map[end:209 entity_group:STATE score:0.771484375 start:205 word: San] map[end:220 entity_group:STATE score:0.8082789182662964 start:209 word: Francisco,] map[end:229 entity_group:ZIPCODE score:0.9972609281539917 start:223 word: 94105]]] Tags:map[]}"

   .. image:: ../pictures/08.gif
      :align: center      
      :class: bordered-gif       