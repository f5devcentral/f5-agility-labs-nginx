Lab 1: Make new code commit, push changes and deploy to Staging and Production
==============================================================================

In this example, we will make a simple change in updating the phone
image on the homepage. We will then commit our changes and push the new
code to our Gitlab repository; this will automatically trigger a CI/CD
pipeline.

A successful build will result in storing the Docker container artifact
in a private Container Registry; this is the new stable build of NGINX
Plus containing the new web application code.

The last phase of the CI/CD Pipeline will deploy the new container to our
Staging Server automatically but wait for a human trigger to deploy the
containers to Production. Note that we will deploy four instances (four
containers) to Production to illustrate NGINX Plus as a Load Balancer in
the next exercise

1.  Open the GitHub Desktop client and make sure the current repository
    selected is ``gitlabappster``

    From the same screen now click the **“Open in Visual Studio Code”**
    button to start editing our appster web application code

    .. image:: ../images/image2.png

    Now that Visual Studio Code is open, expand the tree under
    ``gitlabappster`` -> ``etc`` -> ``nginx`` -> ``html``. Once the tree
    has been opened, find ``index.html`` file and right click on it. A
    menu will open up. Select: **“Reveal in File explorer”** to open it
    up in windows explorer.

    .. image:: ../images/image3.png

2.  Once \ **windows explorer** has opened at the location of the file,
    you will see the folder with ``index.html`` listed. Go ahead and
    double-click \ ``index.html`` to open that file in a browser (Google
    Chrome.)

    .. image:: ../images/image4.png

3.  After the double-click on \ ``index.html``, and opening the webpage
    in the web browser, you will see the current webpage displaying the
    Appster application with a dated iPhone 7 image. \ *Go ahead and
    leave this web browser page open.*

    .. image:: ../images/image5.png

4.  Go back to Visual Studio code editor to make edits to this file.
    This time, open that same ``index.html`` file (click to open it in
    visual studio code.)

    Once the file is open, we are now going to find and replace the
    current iPhone image (currently set to \ ``iphone_7.png`` and change
    it to \ ``iphone_x.png`` Hit **Ctrl+F**, which opens the find window
    and type in ``iphone_7.png``. You should have two hits (just to the
    right of the find window).

    Search and replace all instances of ``iphone_7.png`` to
    ``iphone_x.png``. Update all two instances of that image

    .. image:: ../images/image6.png

5.  Once you have edited ``index.html`` and replaced both instances of
    ``iphone_7.png`` with ``iphone_x.png``, go ahead and **save** the
    file. You can navigate to ``file`` -> ``save`` or you can use the
    shortcut, **CTRL+S**. **(NOTE:** Do not change the file name. Keep
    it the same.)

6.  Open or switch back to the **GitHub Desktop Client** and see the
    tracked changes made.

    The GitHub Desktop Client has automatically tracked the changes that
    were made on ``index.html`` and is highlighting those exact changes,
    ``iphone_7.png`` replaced with ``iphone_x.png``.

7.  We now can push these changes to our repository on GitLab. In the
    lower-left of the GitHub, Desktop Client provide a **Commit title**
    and **notes** before we can **commit** to master:

    You can see two boxes. Go ahead and type in the title field: “update
    index.html”.

    Additionally, you can provide notes as well, type in the notes
    field: “Update phone image”

    Once you fill in both boxes, click on \ **Commit to Master** and on
    the next screen, press **Push to Origin** to push the new code
    commit to our git repository on Gitlab.

    .. image:: ../images/image7.png

8.  After you click on \ **Commit to Master**, you will be taken to the
    next page where we push our changes to our repository. Go and
    click \ **push origin**, which will now push our modified
    ``index.html`` file to our GitLab repository.

    .. image:: ../images/image8.png

9.  Open up the Appster repo on Gitlab, using the
    URI \ `https://gitlab.f5.local/f5-demo-lab/gitlabappster <https://gitlab.f5.local/f5-demo-lab/gitlabappster>`__
    or using the **Appster** shortcut provided. This is our repository,
    where we just pushed our modified \ ``index.html`` file to.

    .. image:: ../images/image9.png

10. In the middle of the Appster repository, you will see the pipeline
    status icon next to the latest Commit SHA. When the pipeline is
    currently in progress, you will see an \ **orange icon** (waiting to
    start), **blue circle** (running) ), or a green check (passed).
    Hopefully, we don’t see a \ **red icon**, which indicates the
    pipeline has failed. We can click on the pipeline status icon to
    view the pipeline progress

    .. image:: ../images/image10.png

11. After clicking on the pipeline status icon, we can view the full
    pipeline. As you can see, we can now see our pipeline: \ ``BUILD``,
    ``TEST``, ``PUSH``, ``DEPLOY``, and \ ``CLEANUP``. This pipeline was
    automatically triggered after we submitted our changes to index.html
    (when we clicked \ **push origin**.) and we can see at a high level
    the stages in the pipeline progressing

    .. image:: ../images/image12.png

.. attention:: Stop: This is a good time to inspect the **GitLab CI/CD Pipeline** file,
   `.gitlab-ci.yml <https://gitlab.f5.local/f5-demo-lab/gitlabappster/-/blob/master/.gitlab-ci.yml>`__,
   while waiting for the pipeline to complete.

   #. Look at the stage, ``deploy_staging``, and compare to the stage, ``deploy_prod``,
      Do you see ``when: manual`` ? This enforces a manual trigger to deploy to production!

   #. In stages ``deploy_staging`` and ``deploy_prod:`` you will see many ``docker`` commands
      executed as commands remotely using SSH.

   #. In both stages, ``deploy_staging`` and ``deploy_prod``, ``docker login`` to our container registry
      and ``docker pull`` to Pull the updated web server image. We then run ``docker stop``
      to stop our running web server container and\ ``docker rm`` to delete this old container.
      Lastly we do a ``docker run`` to run the updated web server image. When we run multiple
      containers in production we can avoid an outage by performing cascading updates and
      use active health checks on the load balancer to avoid traffic sent to a down server.

12. As part of our Continuous Delivery, deployment to Staging is
    automatic, and Production is manual: we have purposely injected a
    human trigger for a deployment to Production

    .. image:: ../images/image13.png

.. note:: Do not deploy to Production (play button) until code changes in staging have been validated!

13. Browse to the server bookmarked as ``STAGING WEB - Appster`` under
    the **“Staging Servers”** bookmark folder to see the new web app
    code pushed to our Staging Server.

    Open the webpage in a **New incognito window (Ctrl + Shift + N)** to
    bypass browser cache and view changes.

    .. image:: ../images/image15.png

    **After new code commit (notice the updated phone image):**

    .. image:: ../images/image18.png

.. note:: Ignore the bookmarks ``STAGING LB - Appster`` and ``PROD LB - Appster`` for now - we will set this up in a later exercise.

14. If our code changes pushed to staging are successful and the changes
    are validated, we can now deploy to Production:

    Under the \ ``DEPLOY`` stage, we have the option to deploy to
    Production manually. Go ahead and click on the little \ **Play**
    button that is on the ``deploy_prod`` stage of the pipeline. This
    trigger will now deploy our new Docker image to Production, with. the
    new code showing the updated image, \ ``iphone_x.png``.

    .. image:: ../images/image27.png

    .. image:: ../images/image14.png

15. If our deployment to Production is successful you would now see the
    new web app code now deployed on \ **all four Production web
    servers**; we can see that on any Web Servers bookmarked as
    ``PROD WEB - Appster-red``, ``PROD WEB - Appster-yellow``,
    ``PROD WEB - Appster-green`` and ``PROD WEB - Appster-blue`` under
    the \ **Production Servers** bookmark folder.

    .. image:: ../images/image16.png
       
    .. image:: ../images/image26.png   
