Lab 1: Run a pipeline to build NGINX Plus images
================================================

1. Double-click on the \ **GitHub Desktop** shortcut on the desktop. It
   will open up the \ **GitHub Desktop Client** application. GitHub
   Desktop client is an excellent easy to use tool to manage your code
   on git repositories. \ **GitHub Desktop** is developed by GitHub,
   Inc. but can be used on any git-based project

   .. image:: ../media/image2.png

2. Once GitHub Desktop Client is open, verify in the upper left corner
   that **nginx-plus-dockerfiles** is selected as the **current
   repository**. If it is not, click the drop-down button, and select
   **nginx-plus-dockerfiles**. Once you have the correct repository
   selected, click on **Open in Visual Studio Code** on the right side
   of the application

   .. image:: ../media/image3.png

3. Inside the project folder, you will see many subfolders containing
   Dockerfiles to various builds of NGINX Plus on \ `supported Linux
   distributions <https://docs.nginx.com/nginx/technical-specs/>`__.
   Take some time to inspect the Docker files in different folders found
   in the project

   .. image:: ../media/image4.png

4. Lets take a look a a ``Dockerfile``. For example, look at
   the \ **alpine3.10**  folder, and in here, you will find a the
   ``Dockerfile`` for a NGINX Plus build for `Alpine
   Linux <https://alpinelinux.org>`__ version 3.10. At the top of each
   ``Dockerfile``, there is a line starting with the command ``FROM``.
   The first ``FROM`` command is a critical Docker command that allows
   you to pull dependencies from other images. You typically find the
   next command sets the ``maintainer`` of the image, for reference and
   information. For more details on ``Dockerfile``, check out
   `Dockerfile
   Reference <https://docs.docker.com/engine/reference/builder/>`__.

   .. note:: NGINX Plus now supports the newer ``3.11`` version of Alpine linux.
      Let’s create add the creation of a NGINX Plus build for Alpine Linux
      version 3.11 to our CICD pipeline.

5. Create a new folder called ``alpine3.11`` in this project under the
   ``Dockerfiles`` root folder.

   .. image:: ../media/image6.png

   .. image:: ../media/image19.png

6. Let’s use the **Alpine 3.10** ``Dockerfile`` as a template for our
   new **Alpine 3.11** build. Go ahead and copy the ``Dockerfile`` in
   the ``alpine3.10`` folder and paste it into the empty ``alpine3.11``
   folder. You can use
   ``Right Click over Alpine3.10 > **Dockerfile** > Copy``, then
   ``Right Click over Alpine3.11 Folder > Paste``.

   .. image:: ../media/image5.png

   .. image:: ../media/image20.png

7. In order to build a **Alpine 3.11** image, we need to edit the copied
   ``Dockerfile`` in out ``alpine3.11`` folder, and update the
   ``FROM alpine:3.10`` command to ``FROM alpine:3.11``

   .. image:: ../media/image21.png

   .. image:: ../media/image22.png

8. Once you have edited ``Dockerfile`` and replaced the
   ``FROM alpine:3.10`` command to ``FROM alpine:3.11``, go ahead and
   **save** the file. You can navigate to ``file`` -> ``save`` or you
   can use the shortcut, **CTRL+S**.

  .. note:: Now we have created a Dockerfile for Alpine 3.11 but still need to
     create a new **Stage** in our GitLab CI/CD Pipeline Configuration file,
     `.gitlab-ci.yml <https://gitlab.f5demolab.com/f5-demo-lab/gitlabappster/-/blob/master/.gitlab-ci.yml>`__

9. In order to build a **Alpine 3.11** image, we also need to add a new
   stage to our ``.gitlab-ci.yml`` file for ``alpine3.11``. Open this
   project’s GitLab CI/CD Pipeline Configuration file,
   ``.gitlab-ci.yml`` and find the stage labeled ``alpine3.10`` (use
   Find **Ctrl+F**).

   a. Go ahead and **Copy (Ctrl+C)** this stage, and **Paste (Ctrl+V)**
      it underneath the existing ``alpine3.10`` stage.

   b. Lastly, edit the stage label ``alpine3.10`` to ``alpine3.11``

   .. image:: ../media/image23.png

   .. important:: The correct indentation in a ``yaml`` file must be valid and
      make sure your ``.gitlab-ci.yml`` file looks like the example above.

10. Once you have edited ``.gitlab-ci.yml`` and created the new
    ``alpine3.11`` stage, go ahead and **save** the file. You can
    navigate to ``file`` -> ``save`` or you can use the shortcut,
    **CTRL+S**.

11. Open or switch back to GitHub Desktop Client, and you will now see
    the changes made.

    .. attention:: The GitHub Desktop Client has automatically tracked the changes that
       were made to the project folder, and is highlighting those exact changes,
       "2 changed file: `.gitlab-ci.yml` and `Dockerfiles\alpine3.11\Dockerfile`"

12. We are now going to push these changes to our repository on GitLab.
    In the lower-left of the GitHub, Desktop Client provide a **Commit
    title** and **note** before we can commit to master.

    You can see two boxes. Go ahead and type in the **title** field:
    ``"Alpine 3.11"``. 

    Additionally, you can provide notes as well, type in the **notes**
    field: ``"NGINX Plus for Alpine 3.11"``

    Once you fill in both boxes, click on **Commit to Master** and on
    the next screen, press **“Push to Origin”** to push the new code
    commit to our git repository on Gitlab.

    .. image:: ../media/image7.png

    .. image:: ../media/image8.png

13. Open up the \ **nginx-plus-dockerfiles** repository on
    Gitlab, \ `https://gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles <https://gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles>`__ or
    using the \ **“nginx-plus-dockerfiles”** shortcut provided. This
    will take us to the repository where we just pushed our modified
    Docker file to

    .. image:: ../media/image9.png

14. On this **nginx-plus-dockerfiles** repository page, you will see the
    pipeline status icon next to the latest \ **Commit SHA**. When the
    pipeline currently in progress, you will see an \ **orange icon** 
    (waiting to start) or \ **blue circle** (running). Hopefully, we
    don’t see a \ **red icon**, which indicates the pipeline has failed.
    We can click on the pipeline status icon to view the pipeline
    progress

    .. image:: ../media/image10.png

    The next screen shows a high-level view of the pipeline triggered
    for this commit. We can click on the pipeline status icon on this
    screen to view the pipeline progress in greater detail.

    .. image:: ../media/image11.png

15. After clicking on the pipeline status icon, we can view the full
    pipeline. As you can see, we can now see our
    pipeline: \ **BUILD** and **CLEANUP.** This pipeline was
    automatically triggered after we submitted our changes to Dockerfile
    (when we clicked \ **‘push origin.’**) and we can see at a high
    level the stages in the pipeline progressing and the final result

    If all stages were successful, then we should have updated our
    Docker images up to our Docker container registry on this
    repository.

    .. image:: ../media/image12.png

.. attention::
   Stop: This is a good time to inspect the **GitLab CI/CD Pipeline file**, `.gitlab-ci.yml <https://gitlab.f5demolab.com/f5-demo-lab/nginx-plus-dockerfiles/-/blob/master/.gitlab-ci.yml>`__,
   while waiting for the pipeline to complete.

   #. Look at stage definitions near the top of the file, labled ``stages``,
      and see there are two stages defined, ``build`` and ``cleanup``, these stages
      run in order, **sequentially**, but the stages Continous Integration Jobs (``$CI_JOB_NAME``)
      e.g. \ ``alpine3.9``, ``alpine3.10``, ``alpine3.11``, etc., within those stages run in **parallel**.

   #. Look at the **CI_JOB_NAME**, ``alpine3.9``, and here like other jobs, we have set
      a varible ``$NAME`` with ``nginx-plus-$CI_JOB_NAME-$CI_PIPELINE_ID``: This uses the Job name (``alpine3.9``)
      and the unique Pipeline ID of this run as the docker image name. Having
      a unique image name that references a build job allows us to roll back or deploy a previously
      know good build

16. A Docker Container Registry is integrated into GitLab, and every
    project can have its own space to store its Docker images. We can
    see our image in the **Package** **>** **Container Registry**. On
    the Container Registry page, expand the title, and you will see a
    list of Docker images ready for use

    Here you should see your new **alpine3.11** image

    .. image:: ../media/image24.png
