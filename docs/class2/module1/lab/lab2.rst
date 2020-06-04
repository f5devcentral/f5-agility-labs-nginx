Lab 2: GitLab CI/CD environment variables
=========================================

Environment variables are a powerful feature provided by Gitlab that is
useful for customizing your jobs in GitLab CI/CD’s pipelines. Using
variables means no hardcoded values and prevents sensitive secrets from
getting exposed in the code or logs. There are two types of variables in
GitLab:

1. `Predefined environment
   variables <https://docs.gitlab.com/ee/ci/variables/#predefined-environment-variables>`__:
   GitLab CI/CD has a \ `default set of predefined
   variables <https://docs.gitlab.com/ee/ci/variables/predefined_variables.html>`__ that
   can be used without any specification needed. You can call issues,
   numbers, usernames, branch names, pipeline and commit IDs, and much
   more.

2. `Custom environment
   variables <https://docs.gitlab.com/ee/ci/variables/#custom-environment-variables>`__:
   When your use case requires a specific custom variable, you
   can \ `set them up quickly from the
   UI <https://docs.gitlab.com/ee/ci/variables/#creating-a-custom-environment-variable>`__ or
   directly in the ``.gitlab-ci.yml`` file and reuse them as you wish.
   There are two variable types:

   -  `Variable
      type <https://docs.gitlab.com/ee/ci/variables/#variable-type>`__:
      The Runner will create an environment variable named the same as
      the variable key and set its value to the variable value.
   -  `File
      type <https://docs.gitlab.com/ee/ci/variables/#file-type>`__: The
      Runner will write the variable value to a temporary file and set
      the path to this file as the value of an environment variable,
      named the same as the variable key

.. attention:: Let’s take a look at variables used in our lab …

1. Navigate to the
   Gitlab \ `nginx-plus-dockerfiles <https://gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles>`__ **repository**
   **>** **Settings** **>** **CI/CD**. Once on that screen,
   expand \ **Variables**. Here you can see we have pre-configured
   variables

   The following variables are the NGINX Plus certificate and key files
   in PEM format, used in our CI/CD pipeline:

   -  ``NGINX_REPO_CRT``
   -  ``NGINX_REPO_KEY``

   We have prepopulated the contents of both variables into the
   ``VALUE`` field, and it is as a string in CICD Pipeline jobs.

   .. note:: We cannot set these values with a \ ``Masked`` type because
      our NGINX PEM files do not meet the Base64 alphabet (RFC4648) format
      `requirement <https://docs.gitlab.com/ee/ci/variables/#masked-variables>`__.
      We want to make sure we do not
      `echo <https://linux.die.net/man/1/echo>`__ that value in any of
      the Pipeline logs

   .. image:: ../images/image13.png

2. Let’s take a look at that variable in action: Open a log output of a
   recent successful pipeline job from the sidebar menu, go to **CICD >
   Jobs** and click on a **status: passed** icon associated with a to a
   image build stage, any stage with name with a linux distro name
   e.g. \ ``ubuntu18.04`` **(not ``clean_up``)**

   .. image:: ../images/image25.png

3. Use the web browser’s FIND (Ctrl + F) function to find ``$NGINX_REPO_CRT``
   and you will find the following output:

   .. code-block:: bash

      echo "NGINX_REPO_CRT" > "etc/ssl/nginx/nginx-repo.crt"  
      echo "NGINX_REPO_KEY" > "etc/ssl/nginx/nginx-repo.key"

   .. image:: ../images/image14.png

4. **FYI and Troubleshooting only:** If the CI Pipeline fails due to
   invalid or expired licenses, we will expect
   the \ **nginx-plus-dockerfiles** pipeline to fail since NGINX Plus
   requires valid licenses to install NGINX Plus. The errors in the
   pipeline job will show this error too.

   **ASK YOUR INSTRUCTOR** for a new NGINX Plus Certificate and Key

   Copy and paste your new valid PEM keys, **nginx-repo.key** and 
   **nginx-repo.crt**, in the value fields and then press the Save
   variables button.

   .. image:: ../images/image15.png

   .. image:: ../images/image26.png

   .. image:: ../images/image27.png
