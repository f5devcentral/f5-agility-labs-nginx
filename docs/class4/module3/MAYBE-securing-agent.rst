Encrypt NGINX Agent Communication

Follow the steps in this guide to encrypt communication between the NGINX Agent and NGINX Instance Manager with TLS.

This documentation applies to NGINX Instance Manager 2.0.0 and later.

Before You Begin 
To enable mTLS, you must have TLS enabled and supply a key, cert, and a CA cert on both the client and server. See the Secure Traffic with Certificates topic for instructions on how to generate keys and set them in the specific values in the NGINX Agent configuration.
Enabling mTLS 
See the examples below for how to set these values using a configuration file, CLI flags, or environment variables.

Enabling mTLS via Config Values 

You can edit the /etc/nginx-agent/nginx-agent.conf file to enable mTLS for the NGINX Agent. Make the following changes:

tls:
  enable: true
  cert: "path-to-cert"
  key: "path-to-key"
  ca: "path-to-ca-cert"
  skip_verify: false
Enabling mTLS with CLI Flags 

To enable mTLS for the NGINX Agent from the command line, run the following command:

nginx-agent --tls-cert "path-to-cert" --tls-key "path-to-key" --tls-ca "path-to-ca-cert" --tls-enable
Enabling mTLS with Environment Variables 

To enable mTLS for the NGINX Agent using environment variables, run the following commands:

NMS_TLS_CA="my-env-ca"
NMS_TLS_KEY="my-env-key"
NMS_TLS_CERT="my-env-cert"
NMS_TLS_ENABLE=true

Enabling Server-Side TLS 
To enable server-side TLS you must have TLS enabled. See the following examples for how to set these values using a configuration file, CLI flags, or environment variables.

Enabling Server-Side TLS via Config Values 

You can edit the /etc/nginx-agent/nginx-agent.conf file to enable server-side TLS. Make the following changes:

tls:
  enable: true
  skip_verify: false
Enabling Server Side TLS with CLI Flags 

To enable server-side TLS from the command line, run the following command:

nginx-agent --tls-enable
Enabling Server-Side TLS with Environment Variables 

To enable server-side TLS using environment variables, run the following commands:

NMS_TLS_ENABLE=true

Enable Server-Side TLS With Self-Signed Certificate 
Warning:
These steps are not recommended for production environments.
To enable server-side TLS with a self-signed certificate, you must have TLS enabled and set skip_verify to true, which disables hostname validation. Setting skip_verify can be done done only by updating the configuration file. See the following example:

tls:
  enable: true
  skip_verify: true
Insecure Mode (Not Recommended) 
To enable insecure mode, you simply need to set tls:enable to false. Setting this value to false can be done only by updating the configuration file or with environment variables. See the following examples:

Enabling Insecure Mode via Config Values** 

You can edit the /etc/nginx-agent/nginx-agent.conf file to enable insecure mode. Make the following changes:

tls:
  enable: false
Enabling Insecure Mode with Environment Variables** 

To enable insecure mode using environment variables, run the following commands:

NMS_TLS_ENABLE=false
