AI Gateway
##########

F5 **AI Gateway** is a specialized platform designed to route, protect, and manage generative AI traffic between clients and Large Language Model (LLM) backends. It addresses the unique challenges posed by AI applications, particularly their non-deterministic nature and the need for bidirectional traffic monitoring.

The main AI Gateway functions are:

* Implementing traffic steering policies
* Inspects and filters client requests and LLM responses
* Prevents malicious inputs from reaching LLM backends
* Ensures safe LLM responses to clients
* Protects against sensitive information leaks
* Providing comprehensive logging of all requests and responses
* Generating observability data through OpenTelemetry

Core
""""

The AI Gateway core handles HTTP(S) requests destined for an LLM backend. It performs the following tasks:

* Performs Authn/Authz checks, such as validating JWTs and inspecting request headers.
* Parses and performs basic validation on client requests.
* Applies processors to incoming requests, which may modify or reject the request.
* Selects and routes each request to an appropriate LLM backend, transforming requests/responses to match the LLM/client schema.
* Applies processors to the response from the LLM backend, which may modify or reject the response.
* Optionally, stores an auditable record of every request/response and the specific activity of each processor. These records can be exported to AWS S3 or S3-compatible storage.
* Generates and exports observability data via OpenTelemetry.
* Provides a configuration interface (via API and a config file).

Processors
""""""""""

A processor runs separately from the core and can perform one or more of the following actions on a request or response:

* **Modify**: A processor may rewrite a request or response. For example, by redacting credit card numbers.
* **Reject**: A processor may reject a request or response, causing the core to halt processing of the given request/response.
* **Annotate**: A processor may add tags or metadata to a request/response, providing additional information to the administrator. The core can also select the LLM backend based on these tags.

Each processor provides specific protection or transformation capabilities to AI Gateway. For example, a processor can detect and remove Personally Identifiable Information (PII) from the input or output of the AI model.