##########################
Protecting the Application
##########################

Know that we know how the ChatBot works we need to understand what are the attack vectors our application is vulnerable to.

Let's go brifely over the attacks defined in **OWASP Top 10 GenAi**:

* **LLM01: Prompt Injection** occurs when user prompts alter the LLM's behavior in unintended ways through direct or indirect inputs, potentially causing the model to violate guidelines, generate harmful content, enable unauthorized access, or influence critical decisions, even when the manipulated content is imperceptible to humans.  
* **LLM02: Sensitive Information Disclosure** happens when LLMs expose confidential data, including personal information, financial details, health records, proprietary algorithms, and security credentials through their outputs, potentially leading to unauthorized data access, privacy violations, and intellectual property breaches.  
* **LLM03: Supply Chain** vulnerabilities arise from dependencies on external components, training data, models, and deployment platforms, where risks include outdated components, licensing issues, vulnerable pre-trained models, and weak model provenance, potentially compromising the integrity and security of LLM applications.  
* **LLM04: Data and Model Poisoning** occurs when pre-training, fine-tuning, or embedding data is manipulated to introduce vulnerabilities, backdoors, or biases, compromising model security, performance, and ethical behavior, leading to harmful outputs or impaired capabilities.  
* **LLM05: Improper Output Handling** refers to insufficient validation, sanitization, and handling of LLM-generated outputs before they are passed downstream, potentially resulting in XSS, CSRF, SSRF, privilege escalation, or remote code execution in backend systems.  
* **LLM06: Excessive Agency** occurs when an LLM-based system is granted too much capability to call functions or interface with other systems, leading to damaging actions from unexpected, ambiguous, or manipulated outputs due to excessive functionality, permissions, or autonomy.  
* **LLM07: System Prompt Leakage** involves the risk of exposing system prompts or instructions that guide the model's behavior, potentially containing sensitive information that was not intended to be discovered and can be used to facilitate other attacks.
* **LLM08: Vector and Embedding Weaknesses** present security risks in systems using Retrieval Augmented Generation (RAG), where vulnerabilities in vector generation, storage, or retrieval can be exploited to inject harmful content, manipulate model outputs, or access sensitive information.  
* **LLM09: Misinformation** occurs when LLMs produce false or misleading information that appears credible, potentially leading to security breaches, reputational damage, and legal liability, often caused by hallucinations, biases, or incomplete information.  
* **LLM10: Unbounded Consumption** refers to vulnerabilities allowing excessive and uncontrolled inferences in LLM applications, leading to denial of service, economic losses, model theft, and service degradation through resource exploitation and unauthorized usage.  








**Module 3 - All sections**

.. toctree::
   :maxdepth: 1
   :glob:

   lab*/lab*

