
**Deploy the NGINX Plus Ingress Controller**

Now that the Arcadia App is running in the Kubernetes Cluster. We need a solution to publish it externally (using Kubernetes front end IP addresses) and routing the packets to the right pods (main, back, app2, app3)

To do so, I prepared a ``kubectl`` Kubernetes Deployment in YAML.

**Steps:**

    #. You should now see a new namespace ``nginx-ingress`` and a new ingress in the Kubernetes Dashboard on the Jumphost
    #. Check the Ingress ``arcadia-ingress`` (in the ``default`` namespace) by clicking on the 3 dots on the right and ``edit``
    #. Scroll down and check the specs


.. image:: ../pictures/lab4/arcadia-ingress.png
   :align: center

.. code-block:: YAML

apiVersion: extensions/v1
kind: Ingress
metadata:
  name: arcadia-ingress
spec:
  ingressClassName: "nginx"
  rules:
  - host: k8s.arcadia-finance.io
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: main
            port:
              number: 80
      - path: /files
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 80


.. note:: You can see the Ingress is routing the packets to the right service based on the URI.

