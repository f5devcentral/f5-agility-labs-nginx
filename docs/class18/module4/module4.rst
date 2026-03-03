Module 4 - JWT Token Authentication
====================================

This module demonstrates how to enforce JWT authentication at the NGINX Ingress Controller level.

Setup Environment Variables
----------------------------

Confirm environment variables are still set to point to the IngressLink virtual server and define HTTP and HTTPS ports:

.. code-block:: bash

   echo -e "NIC address: $NIC_IP\nHTTP port  : $HTTP_PORT\nHTTPS port : $HTTPS_PORT"

**Output**

.. code-block:: console

   ubuntu@ubuntu:~$ echo -e "NIC address: $NIC_IP\nHTTP port  : $HTTP_PORT\nHTTPS port : $HTTPS_PORT"
   NIC address: 10.1.1.9
   HTTP port  : 80
   HTTPS port : 443

Change to Lab Directory
------------------------

.. code-block:: bash

   cd ~/NGINX-Ingress-Controller-Lab/labs/3.authentication

Deploy Sample Application
--------------------------

Deploy the sample web application:

.. code-block:: bash

   kubectl apply -f 0.webapp.yaml

Deploy JWT Configuration
-------------------------

Deploy the JWK Secret
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl apply -f 1.jwk-secret.yaml

Deploy the JWT Policy
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl apply -f 2.jwt-policy.yaml

Publish Application with JWT Policy
------------------------------------

Publish the application through NGINX Ingress Controller applying the JWT policy:

.. code-block:: bash

   kubectl apply -f 3.virtual-server.yaml

Check the newly created ``VirtualServer`` resource:

.. code-block:: bash

   kubectl get virtualservers.k8s.nginx.org -o wide

Output should be similar to:

.. code-block:: console

   NAME     STATE   HOST                 IP         EXTERNALHOSTNAME   PORTS      AGE
   webapp   Valid   webapp.example.com   10.1.1.9                      [80,443]   50s

Describe the ``webapp`` VirtualServer:

.. code-block:: bash

   kubectl describe virtualservers.k8s.nginx.org webapp

Output should be similar to:

.. code-block:: console

   Name:         webapp
   Namespace:    default
   Labels:       <none>
   Annotations:  <none>
   API Version:  k8s.nginx.org/v1
   Kind:         VirtualServer
   Metadata:
   Creation Timestamp:  2026-02-23T03:23:17Z
   Generation:          1
   Resource Version:    696305
   UID:                 460d2196-1855-4e0e-aee2-057b457fe91c
   Spec:
   Host:  webapp.example.com
   Policies:
      Name:  jwt-policy
   Routes:
      Action:
         Pass:  webapp
      Path:    /
   Upstreams:
      Name:     webapp
      Port:     80
      Service:  webapp-svc
   Status:
   External Endpoints:
      Ip:     10.1.1.9
      Ports:  [80,443]
   Message:  Configuration for default/webapp was added or updated 
   Reason:   AddedOrUpdated
   State:    Valid
   Events:
   Type    Reason          Age   From                      Message
   ----    ------          ----  ----                      -------
   Normal  AddedOrUpdated  93s   nginx-ingress-controller  Configuration for default/webapp was added or updated
   Normal  AddedOrUpdated  93s   nginx-ingress-controller  Configuration for default/webapp was added or updated

Test Application Access
------------------------

Access Without JWT Token
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT

The reply should be similar to:

.. code-block:: console

   HTTP/1.1 401 Unauthorized
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 18:02:15 GMT
   Content-Type: text/html
   Content-Length: 179
   Connection: keep-alive
   WWW-Authenticate: Bearer realm="MyProductAPI"

   <html>
   <head><title>401 Authorization Required</title></head>
   <body>
   <center><h1>401 Authorization Required</h1></center>
   <hr><center>nginx/1.27.2</center>
   </body>
   </html>

Access With Valid JWT Token
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT -H "token: `cat token.jwt`"

The reply should be similar to:

.. code-block:: console

   HTTP/1.1 200 OK
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 18:03:47 GMT
   Content-Type: text/plain
   Content-Length: 158
   Connection: keep-alive
   Expires: Thu, 03 Apr 2025 18:03:46 GMT
   Cache-Control: no-cache

   Server address: 192.168.36.101:8080
   Server name: webapp-6db59b8dcc-ltt6p
   Date: 03/Apr/2025:18:03:47 +0000
   URI: /
   Request ID: 647bb23b4b46630207ec55267584d403

Cleanup
-------

Delete the lab resources:

.. code-block:: bash

   kubectl delete -f .
