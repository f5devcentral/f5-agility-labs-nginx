Introduction
============

This lab provides hands-on experience integrating `NGINX Ingress Controller <https://docs.nginx.com/nginx-ingress-controller>`__ 
with F5 BIG-IP in a Kubernetes environment using `F5 IngressLink <https://clouddocs.f5.com/containers/latest/userguide/ingresslink/>`__.

Background
----------

NGINX Ingress Controller provides a robust way to manage ingress traffic in Kubernetes clusters. It leverages the power of NGINX and NGINX Plus 
to deliver advanced load balancing, traffic management, and security features. The controller uses Kubernetes resources like Ingress and custom 
resource definitions (CRDs) such as VirtualServer to configure routing rules and policies.

Key features include:

- **Traffic Management**: Sophisticated routing based on HTTP methods, headers, cookies, and URIs
- **Security**: JWT authentication, access control policies, and WAF protection with `F5 WAF for NGINX <https://docs.nginx.com/waf/>`__
- **Performance**: Rate limiting, traffic splitting, and advanced load balancing
- **Observability**: Detailed logging and monitoring capabilities
- **Native Kubernetes Integration**: Uses standard Kubernetes resources and CRDs

Getting Started
---------------

The lab environment is pre-configured with a BIG-IP and Kubernetes cluster running NGINX Ingress Controller.
F5 IngressLink has also been installed and configured.

Lab Structure
-------------

The lab is organized into modules covering different aspects of NGINX Ingress Controller and F5 IngressLink:

1. **IngressLink Review** - Review and understand the IngressLink configuration
2. **Basic Ingress** - URI-based routing and TLS offload
3. **Advanced Routing** - Layer 7 routing based on HTTP methods and cookies
4. **Authentication** - JWT token validation
5. **Traffic Splitting** - Canary deployments and A/B testing
6. **Access Control** - IP-based allow/deny policies
7. **Rate Limiting** - Protecting applications from excessive requests

Each module includes step-by-step instructions, configuration examples, and testing procedures to validate the implementation.
