Module 2: Deploying `NGINX Plus <https://www.nginx.com/products/nginx/>`__ web server with CI/CD
===============================================================================================

This lab exercise will guide us through deploying an NGINX Plus Web
server through a CI/CD Pipeline, a best practices for DevOps teams to
implement, for delivering code changes more frequently and reliably.

We will be making simple changes to our web application and rapidly push
the new code to live environments. For this use case, we will again be
building and pushing Docker containers as our deployment artifact.

CI/CD flowchart
--------------

**The diagram below depicts the workflow from code to deployment.** Our
CI/CD Pipeline docker image to the container registry but could easily be
extended to deploy a container with a new application code to a live
environment. We will see in this exercise that the push to Staging
environment is automatic while the push to our production environment
requires a human trigger

.. image:: ./images/image1.png

.. Important:: Run all lab activites from the Windows JumpHost

.. toctree::
   :maxdepth: 1
   :glob:

   lab/lab*
