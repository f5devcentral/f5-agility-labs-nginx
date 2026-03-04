Module 6 - Access Control
==========================

This module demonstrates how to apply access control policies to deny and allow traffic from specific subnets.

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

   cd ~/NGINX-Ingress-Controller-Lab/labs/5.access-control

Deploy Sample Application
--------------------------

Deploy the sample web application:

.. code-block:: bash

   kubectl apply -f 0.webapp.yaml

Deploy Access Control Policy - Deny
------------------------------------

Deploy an access control policy that denies requests from clients with an IP that belongs to the subnet ``10.0.0.0/8``:

.. code-block:: bash

   kubectl apply -f 1.access-control-policy-deny.yaml

Publish Application with Access Control
----------------------------------------

Publish the application through NGINX Ingress Controller applying the access control policy:

.. code-block:: bash

   kubectl apply -f 2.virtual-server.yaml

Check the newly created ``VirtualServer`` resource:

.. code-block:: bash

   kubectl get virtualservers.k8s.nginx.org -o wide

Output should be similar to:

.. code-block:: console

   NAME     STATE   HOST                 IP         EXTERNALHOSTNAME   PORTS      AGE
   webapp   Valid   webapp.example.com   10.1.1.9                      [80,443]   11s

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
   Creation Timestamp:  2026-02-23T04:24:01Z
   Generation:          1
   Resource Version:    704652
   UID:                 b218593d-eab5-4da3-804e-4e3821c747f4
   Spec:
   Host:  webapp.example.com
   Policies:
      Name:  webapp-policy
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
   Normal  AddedOrUpdated  76s   nginx-ingress-controller  Configuration for default/webapp was added or updated
   Normal  AddedOrUpdated  76s   nginx-ingress-controller  Configuration for default/webapp was added or updated   

Test Access - Denied
---------------------

Access the application:

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT

NGINX Ingress Controller blocks the request if the client IP belongs to subnet ``10.0.0.0/8``:

.. code-block:: console

   HTTP/1.1 403 Forbidden
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 20:45:33 GMT
   Content-Type: text/html
   Content-Length: 153
   Connection: keep-alive

   <html>
   <head><title>403 Forbidden</title></head>
   <body>
   <center><h1>403 Forbidden</h1></center>
   <hr><center>nginx/1.27.2</center>
   </body>
   </html>

Update Access Control Policy - Allow
-------------------------------------

Update the access control policy to allow traffic:

.. code-block:: bash

   kubectl delete -f 1.access-control-policy-deny.yaml
   kubectl apply -f 3.access-control-policy-allow.yaml

Test Access - Allowed
----------------------

Access the application:

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT

NGINX Ingress Controller allows traffic from subnet ``10.0.0.0/8``:

.. code-block:: console

   HTTP/1.1 200 OK
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 20:46:29 GMT
   Content-Type: text/plain
   Content-Length: 157
   Connection: keep-alive
   Expires: Thu, 03 Apr 2025 20:46:28 GMT
   Cache-Control: no-cache

   Server address: 192.168.36.99:8080
   Server name: webapp-6db59b8dcc-nchgr
   Date: 03/Apr/2025:20:46:29 +0000
   URI: /
   Request ID: db6e3caf0b45c7e364f01961b40a3dd9

Cleanup
-------

Delete the lab resources:

.. code-block:: bash

   kubectl delete -f .

.. note::
   
   You should get one expected error when trying to delete ``3.access-control-policy-allow.yaml``.
