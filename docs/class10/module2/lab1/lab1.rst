Step 2 - Create the Infrastructure Environment
##############################################

In this lab, we are the ``Infrastructure team`` and we will deploy the instances in their environments so that the ``API team`` can expose the API on them.

The NMS UI
**********

#. Login to JumpHost Win10 RDP. Login is ``user`` and password is ``user``
#. Open Chrome and click on NMS bookmark
#. Sign in to NMS as ``admin`` and password ``admin``
#. You can change the UI to Dark mode if you prefer it :)

   * Click on the ``profile`` icon on the top right
   * Change toggle to ``Dark Mode``

#. You can notice 2 modules installed and licensed

   * Instance Manager - included and licensed by default
   * API Connectivity Manager (ACM) - installed from the official Nginx repo and licensed

   .. image:: ../pictures/lab1/nms-home.png
      :align: center

Connect to ACM and create the infrastructure environment
********************************************************

#. Click on ``API Connectivity Manager`` and ``Infrastructure``
#. Create a ``Workspace`` and name it ``team-sentence``

   .. image:: ../pictures/lab1/acm-infra-workspace.png
      :align: center

#. Create an ``environment``

   #. Name : sentence-env
   #. Type : Non-Prod
   #. Add an ``API Gateway cluster``

      * Name : api-cluster
      * Hostname : api.sentence.com

   #. Add an ``Developer portal cluster``

      * Name : devportal-cluster
      * Hostname : dev.sentence.com

         .. image:: ../pictures/lab1/acm-infra-env.png
            :align: center

   #. The environment is now created and you can see the commands to execute to ``link`` NGINX instances to your NMS.

      .. image:: ../pictures/lab1/acm-infra-env-created.png
         :align: center
         :scale: 50%

   #. Click on ``Go to sentence-env``

