Class 6 - AI Gateway
#####################

Lab Maintainers:

  Sorin Boiangiu <s.boiangiu@f5.com>   

|

For this lab, we will use the **Arcadia Crypto** application which has been added new AI components in order to support a helper **Chatbot**.

This application is a modern application simulating a crypto trading platform app where you can buy and sell crypto currency.

The following components are used within the application:

* **Frontend** - serves the non dynamic content for like html, js, css and images
* **Login** - in in charge of dealing with anything related to the login user functionality
* **Users** - all user data interaction is done through this microservice only
* **Stocks** - connects to external resources to get the latest crypto data and serves it to the application clients
* **Stocks Transaction** - Deal with all related to buying or selling crypto currencies. It interact with other microservices like Users and Stocks
* **Database** - Database were all information is stored

AI Components

* **LLM Orchestrator** - is in charge of getting the user prompt, storing the conversation and orchastrating all other AI components
* **RAG** - contains Arcadia Crypto specific knowledge which isn't available to the LLM 
* **Ollama** - is hosting the LLM. In our case we are using LLama 3.1 8B with Q4 quantization


During this class we will explore how application using LLMs are developed and how to protect them.


.. note:: Before you procced to the lab it is mandatory to enter the email that you have joined the UDF with in order to populate any dynamic content. If all good the button will turn green.

.. raw:: html
    
    <script>getStudentData('f5xcemeaaigwworkshop');</script>


.. toctree::
   :maxdepth: 2
   :glob:

   module*/module*