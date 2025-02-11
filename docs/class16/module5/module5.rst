##########################################
Protecting the ChatBot with **AI Gateway**
##########################################

So far we have protected the application and and the same time covered some of the **OWASP Top 10 GenAI** attacks:

* **LLM10: Unbounded Consumption** refers to vulnerabilities allowing excessive and uncontrolled inferences in LLM applications, leading to denial of service, economic losses, model theft, and service degradation through resource exploitation and unauthorized usage.  

Now we need to deal with the rest:

* **LLM01: Prompt Injection** occurs when user prompts alter the LLM's behavior in unintended ways through direct or indirect inputs, potentially causing the model to violate guidelines, generate harmful content, enable unauthorized access, or influence critical decisions, even when the manipulated content is imperceptible to humans.  
* **LLM02: Sensitive Information Disclosure** happens when LLMs expose confidential data, including personal information, financial details, health records, proprietary algorithms, and security credentials through their outputs, potentially leading to unauthorized data access, privacy violations, and intellectual property breaches.  
* **LLM06: Excessive Agency** occurs when an LLM-based system is granted too much capability to call functions or interface with other systems, leading to damaging actions from unexpected, ambiguous, or manipulated outputs due to excessive functionality, permissions, or autonomy.  
* **LLM07: System Prompt Leakage** involves the risk of exposing system prompts or instructions that guide the model's behavior, potentially containing sensitive information that was not intended to be discovered and can be used to facilitate other attacks.

In order to achive this we will introduce our new platform **AI Gateway**.







**Module 5 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

