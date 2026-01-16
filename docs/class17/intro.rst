Introduction
============

The purpose of this lab is to provide hands-on experience with `NGINX Ingress Controller <https://docs.nginx.com/nginx-ingress-controller>`__ 
and several common use cases within a Kubernetes environment.

NGINX Ingress Controller is a powerful, cloud-native solution that brings enterprise-grade capabilities to Kubernetes ingress traffic management. 
Whether you're a beginner looking to learn or an experienced developer seeking to deepen your understanding of NGINX Ingress Controller in Kubernetes, 
this lab equips you with the necessary resources and insights to publish and secure efficient and scalable applications.

Background
----------

NGINX Ingress Controller provides a robust way to manage ingress traffic in Kubernetes clusters. It leverages the power of NGINX and NGINX Plus 
to deliver advanced load balancing, traffic management, and security features. The controller uses Kubernetes resources like Ingress and custom 
resource definitions (CRDs) such as VirtualServer to configure routing rules and policies.

Key features include:

- **Traffic Management**: Sophisticated routing based on HTTP methods, headers, cookies, and URIs
- **Security**: JWT authentication, access control policies, and WAF protection with NGINX App Protect
- **Performance**: Rate limiting, traffic splitting, and advanced load balancing
- **Observability**: Detailed logging and monitoring capabilities
- **Native Kubernetes Integration**: Uses standard Kubernetes resources and CRDs

Getting Started
---------------

Prerequisites
~~~~~~~~~~~~~

To complete this lab, you will need:

* Running Kubernetes cluster
* kubectl command-line tool
* `jq <https://github.com/jqlang/jq>`__ for JSON parsing
* Valid NGINX Plus license (you can request a trial license `here <https://www.f5.com/trials/nginx-one>`__)
  
  * Three files are needed (sample names from a trial license): ``nginx-one-eval.crt``, ``nginx-one-eval.key``, and ``nginx-one-eval.jwt``

Lab Structure
-------------

The lab is organized into modules covering different aspects of NGINX Ingress Controller:

1. **Deployment** - Installing and configuring NGINX Ingress Controller
2. **Basic Ingress** - URI-based routing and TLS offload
3. **Advanced Routing** - Layer 7 routing based on HTTP methods and cookies
4. **Authentication** - JWT token validation
5. **Traffic Splitting** - Canary deployments and A/B testing
6. **Access Control** - IP-based allow/deny policies
7. **Rate Limiting** - Protecting applications from excessive requests
8. **WAF Protection** - Securing applications with NGINX App Protect

Each module includes step-by-step instructions, configuration examples, and testing procedures to validate the implementation.
