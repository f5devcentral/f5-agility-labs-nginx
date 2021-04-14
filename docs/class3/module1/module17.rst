Reading subject alternative from client certificate [http/certs/subject_alternative]
====================================================================================

Mutual TLS is a one of many authentication methods supported by NGINX.  NGINX Javascript enables us to access arbitrary fields in a client certificate to use for business logic like routing a request.

**Step 1:** Use the following commands to start your NGINX container with this lab's files:

.. code-block:: shell

  EXAMPLE='http/certs/subject_alternative'
  docker run --rm --name njs_example  -v $(pwd)/conf/$EXAMPLE.conf:/etc/nginx/nginx.conf:ro -v $(pwd)/njs/:/etc/nginx/njs/:ro -p 80:80 -p 443:443 -d nginx

**Step 2:** Now let's use curl to test our NGINX server:

.. code-block:: shell
  :emphasize-lines: 1,5,8

  openssl x509 -noout -text -in njs/http/certs/ca/intermediate/certs/client.cert.pem | grep 'X509v3 Subject Alternative Name' -A1
  X509v3 Subject Alternative Name:
  IP Address:127.0.0.1, IP Address:0:0:0:0:0:0:0:1, DNS:example.com, DNS:www2.example.com

  curl https://localhost/ --insecure --key njs/http/certs/ca/intermediate/private/client.key.pem --cert njs/http/certs/ca/intermediate/certs/client.cert.pem  --pass secretpassword
  ["7f000001","00000000000000000000000000000001","example.com","www2.example.com"]

  docker stop njs_example

Code Snippets
~~~~~~~~~~~~~

This config enforces Mutual TLS authentication of client requests.  We use njs to extract the "Subject Alternative Name (SAN)" from the certificate presented by the client into the $san variable.

.. code-block:: nginx
  :linenos:
  :caption: nginx.conf

  ...

  http {
    js_path "/etc/nginx/njs/";

    js_import main from http/certs/js/subject_alternative.js;

    js_set $san main.san;

    server {
          listen 443 ssl;

          server_name www.example.com;

          ssl_password_file /etc/nginx/njs/http/certs/ca/password;
          ssl_certificate /etc/nginx/njs/http/certs/ca/intermediate/certs/www.example.com.cert.pem;
          ssl_certificate_key /etc/nginx/njs/http/certs/ca/intermediate/private/www.example.com.key.pem;

          ssl_client_certificate /etc/nginx/njs/http/certs/ca/intermediate/certs/ca-chain.cert.pem;
          ssl_verify_client on;

          location / {
              return 200 $san;
          }
    }
  }




Here we import an existing module that provides processing of x509 certificates. We retrieve the client certificate from the $ssl_client_raw_cert NGINX variable and use the x509.parse_pem_cert() method to parse the raw cert into a data structure we can work with.  To locate the subjectAltName field, we use x509.get_oid_value() to look it up by oid.

.. code-block:: js
  :linenos:
  :caption: subject_alternative.js

    import x509 from 'x509.js';

    function san(r) {
        var pem_cert = r.variables.ssl_client_raw_cert;
        if (!pem_cert) {
            return '{"error": "no client certificate"}';
        }

        var cert = x509.parse_pem_cert(pem_cert);

        // subjectAltName oid 2.5.29.17
        return JSON.stringify(x509.get_oid_value(cert, "2.5.29.17")[0]);
    }

    export default {san};


