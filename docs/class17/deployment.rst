Lab Deployment
==============

This section covers the installation and configuration of NGINX Ingress Controller with NGINX App Protect WAF.

See the :doc:`intro` for prerequisites.

Installing
----------

Step 1: Create NGINX Ingress Controller namespace
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl create namespace nginx-ingress

Step 2: Create Kubernetes secret to pull images
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Create a Kubernetes secret to pull images from NGINX private registry:

.. code-block:: bash

   kubectl create secret docker-registry regcred \
     --docker-server=private-registry.nginx.com \
     --docker-username=`cat <nginx-one-eval.jwt>` \
     --docker-password=none \
     -n nginx-ingress

.. note::
   Replace ``<nginx-one-eval.jwt>`` with the path and filename of your ``nginx-one-eval.jwt`` file

Step 3: Create Kubernetes secret holding the NGINX Plus license
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl create secret generic license-token \
     --from-file=license.jwt=<nginx-one-eval.jwt> \
     --type=nginx.com/license \
     -n nginx-ingress

.. note::
   Replace ``<nginx-one-eval.jwt>`` with the path and filename of your ``nginx-one-eval.jwt`` file

Step 4: List available NGINX Ingress Controller images
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

List available NGINX Ingress Controller docker images that include NGINX App Protect WAF:

.. code-block:: bash

   curl -s https://private-registry.nginx.com/v2/nginx-ic-nap/nginx-plus-ingress/tags/list \
     --key <nginx-one-eval.key> \
     --cert <nginx-one-eval.crt> | jq

.. note::
   Replace ``<nginx-one-eval.key>`` and ``<nginx-one-eval.crt>`` with the path and filename of your certificate files

Pick the latest version (``5.3.1`` at the time of writing)

Step 5: Apply NGINX Ingress Controller custom resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Make sure the URI below references the latest available ``5.x`` NGINX Ingress Controller version:

.. code-block:: bash

   kubectl apply -f https://raw.githubusercontent.com/nginx/kubernetes-ingress/v5.3.1/deploy/crds.yaml
   kubectl apply -f https://raw.githubusercontent.com/nginx/kubernetes-ingress/v5.3.1/deploy/crds-nap-waf.yaml

Step 6: Install NGINX Ingress Controller with Helm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install NGINX Ingress Controller with NGINX App Protect through its Helm chart. Set ``nginx.image.tag`` to the 
latest ``5.x`` available NGINX Ingress Controller version:

.. code-block:: bash

   helm install nic oci://ghcr.io/nginx/charts/nginx-ingress \
     --version 2.4.1 \
     --set controller.image.repository=private-registry.nginx.com/nginx-ic-nap/nginx-plus-ingress \
     --set controller.image.tag=5.3.1 \
     --set controller.nginxplus=true \
     --set controller.appprotect.enable=true \
     --set controller.serviceAccount.imagePullSecretName=regcred \
     --set controller.mgmt.licenseTokenSecretName=license-token \
     --set controller.service.type=NodePort \
     -n nginx-ingress

Step 7: Check NGINX Ingress Controller pod status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl get pods -n nginx-ingress

Pod should be in the ``Running`` state:

.. code-block:: console

   NAME                                            READY   STATUS    RESTARTS   AGE
   nic-nginx-ingress-controller-7cfbdd849-7fgkm   1/1     Running   0          41s

Step 8: Check NGINX Ingress Controller logs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl logs -l app.kubernetes.io/instance=nic -n nginx-ingress -c nginx-ingress

Output should be similar to:

.. code-block:: console

   I20251219 10:25:11.139559   1 main.go:112] Event(v1.ObjectReference{Kind:"ConfigMap", Namespace:"nginx-ingress", Name:"nic-nginx-ingress-mgmt", UID:"1697f124-121f-45a9-94dc-eba19f015177", APIVersion:"v1", ResourceVersion:"82730472", FieldPath:""}): type: 'Normal' reason: 'Updated' MGMT ConfigMap nginx-ingress/nic-nginx-ingress-mgmt updated without error
   2025/12/19 10:25:11 [notice] 16#16: signal 17 (SIGCHLD) received from 21
   2025/12/19 10:25:11 [notice] 16#16: worker process 21 exited with code 0
   2025/12/19 10:25:11 [notice] 16#16: signal 29 (SIGIO) received
   2025/12/19 10:25:11 [notice] 20#20: APP_PROTECT { "event": "waf_disconnected", "enforcer_thread_id": 0, "worker_pid": 20, "mode": "operational", "mode_changed": false}
   2025/12/19 10:25:11 [notice] 20#20: exit
   2025/12/19 10:25:14 [notice] 16#16: signal 17 (SIGCHLD) received from 20
   2025/12/19 10:25:14 [notice] 16#16: worker process 20 exited with code 0
   2025/12/19 10:25:14 [notice] 16#16: signal 29 (SIGIO) received

Step 9: Check Kubernetes service status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl get svc -n nginx-ingress

NGINX Ingress Controller should be listening on TCP ports 80 and 443:

.. code-block:: console

   NAME                           TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
   nic-nginx-ingress-controller   NodePort   10.98.224.140   <none>        80:31135/TCP,443:32740/TCP   83s

Step 10: Check the ingressclass
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl get ingressclass

The ``nginx`` ingressclass should be available:

.. code-block:: console

   NAME    CONTROLLER                     PARAMETERS   AGE
   nginx   nginx.org/ingress-controller   <none>       6m14s

Uninstalling
------------

Uninstall NGINX Ingress Controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Uninstall NGINX Ingress Controller through its Helm chart:

.. code-block:: bash

   helm uninstall nic -n nginx-ingress

Delete the namespace
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl delete namespace nginx-ingress

Delete custom resources
~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   kubectl delete -f https://raw.githubusercontent.com/nginx/kubernetes-ingress/v5.3.1/deploy/crds.yaml
   kubectl delete -f https://raw.githubusercontent.com/nginx/kubernetes-ingress/v5.3.1/deploy/crds-nap-waf.yaml
