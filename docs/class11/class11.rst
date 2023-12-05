F5 NGINX Plus Ingress Controller as an API Gateway for Kubernetes
=================================================================

Prerequisites:

- Kubernetes concepts: ingress, daemonset, service, etc.
- API concepts: REST API methods (GET, POST), HTTP headers (Authorization).

This is an intermediate level lab that adds API Gateway functionality to a Kubernetes NGINX Plus Ingress.

- Proxy TLS and route HTTP requests to API services based on host header and path
- API Schema Enforcement - Use OpenAPI Spec to define your API's schema and enforce the schema with an NGINX App Protect Policy
- API Authorization - Validate signed JSON Web Tokens for authorization
- API Rate-limiting - Rate-Limit API endpoints per client session to ensure fair use of the API

.. toctree::
   :maxdepth: 1
   :glob:

   module*/module*

