Module 7 - Rate Limiting
=========================

This module demonstrates how to apply rate limiting for an application exposed through NGINX Ingress Controller. 
Rate limiting helps protect your applications from excessive requests and potential abuse.

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

   cd ~/NGINX-Ingress-Controller-Lab/labs/6.rate-limiting

Deploy Sample Application
--------------------------

Deploy the sample web application:

.. code-block:: bash

   kubectl apply -f 0.webapp.yaml

Deploy Rate Limit Policy
-------------------------

Deploy a rate limit policy that allows only 1 request per second from a single IP address:

.. code-block:: bash

   kubectl apply -f 1.rate-limit.yaml

Publish Application with Rate Limiting
---------------------------------------

Publish the application through NGINX Ingress Controller applying the rate limit policy:

.. code-block:: bash

   kubectl apply -f 2.virtual-server.yaml

Check the newly created ``VirtualServer`` resource:

.. code-block:: bash

   kubectl get virtualservers.k8s.nginx.org -o wide

Output should be similar to:

.. code-block:: console

   NAME     STATE   HOST                 IP         EXTERNALHOSTNAME   PORTS      AGE
   webapp   Valid   webapp.example.com   10.1.1.9                      [80,443]   1s

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
   Creation Timestamp:  2026-02-23T04:47:58Z
   Generation:          1
   Resource Version:    708028
   UID:                 9c5a35dd-ebc9-4e8c-968a-390dd71e07c5
   Spec:
   Host:  webapp.example.com
   Policies:
      Name:  rate-limit-policy
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
   Normal  AddedOrUpdated  40s   nginx-ingress-controller  Configuration for default/webapp was added or updated
   Normal  AddedOrUpdated  40s   nginx-ingress-controller  Configuration for default/webapp was added or updated

Test Application Access
------------------------

Single Request - Success
~~~~~~~~~~~~~~~~~~~~~~~~

Access the application:

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT

Output should be similar to:

.. code-block:: console

   HTTP/1.1 200 OK
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 20:48:16 GMT
   Content-Type: text/plain
   Content-Length: 158
   Connection: keep-alive
   Expires: Thu, 03 Apr 2025 20:48:15 GMT
   Cache-Control: no-cache

   Server address: 192.168.36.102:8080
   Server name: webapp-6db59b8dcc-pkfp8
   Date: 03/Apr/2025:20:48:16 +0000
   URI: /
   Request ID: 73dfb52a3cd42b4a6953ea4f3ac55e94

Rapid Requests - Rate Limited
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Access the application twice in rapid sequence:

.. code-block:: bash

   curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT; curl -i -H "Host: webapp.example.com" http://$NIC_IP:$HTTP_PORT

The first request is served and the second is rate limited with HTTP code 429.

Output should be similar to:

.. code-block:: console

   HTTP/1.1 200 OK
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 20:49:03 GMT
   Content-Type: text/plain
   Content-Length: 158
   Connection: keep-alive
   Expires: Thu, 03 Apr 2025 20:49:02 GMT
   Cache-Control: no-cache

   Server address: 192.168.36.102:8080
   Server name: webapp-6db59b8dcc-pkfp8
   Date: 03/Apr/2025:20:49:03 +0000
   URI: /
   Request ID: 7b431f3052bbdcfd6905c6875469bee3
   HTTP/1.1 429 Too Many Requests
   Server: nginx/1.27.2
   Date: Thu, 03 Apr 2025 20:49:03 GMT
   Content-Type: text/html
   Content-Length: 169
   Connection: keep-alive

   <html>
   <head><title>429 Too Many Requests</title></head>
   <body>
   <center><h1>429 Too Many Requests</h1></center>
   <hr><center>nginx/1.27.2</center>
   </body>
   </html>

Cleanup
-------

Delete the lab resources:

.. code-block:: bash

   kubectl delete -f .
