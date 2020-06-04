Lab 2 (OPTIONAL): Made new code commit, push changes using command line tools, and deploy
=========================================================================================

In this task, we will run through a similar process, but this time
achieve similar changes via a bash shell using Unix commands, a
different perspective to application development!

1.  Open **git bash for windows** using the **Git Bash** icon on the
    Windows desktop. Git Bash is a bash shell emulator, similar to what
    you see natively on Linux and Unix machines. If the git console font
    is too small to read, use **Ctrl+ “+”** to increase the font

    .. figure:: ../media/image19.png
       :alt: A screenshot of gitbash icon

2.  Make sure you are in appster project root:
    ``~/Documents/Git/gitlabappster`` . To get there, type the following
    command in the Git Bash shell:

    .. code-block:: bash

       cd ~/Documents/Git/gitlabappster
       ls

    .. figure:: ../media/image20.png
       :alt: A screenshot of Git Bash shell

3.  We can change the the subheader
    using \ `sed <https://www.gnu.org/software/sed/manual/sed.html>`__.
    ``sed`` command in UNIX stands for *Stream EDitor*, and it can
    perform lots of function on file like searching, find and replace,
    insertion or deletion

    Let’s search and replace the the existing subheader
    ``A beautiful fictitious app that you can trust on`` with ``A beautiful fictitious app that you can trust!``.
    The following command will flip background colors - yellow to
    purple, purple to yellow:

    .. code:: bash

       # Update "A beautiful fictitious app that you can trust on" 
       # with "A beautiful fictitious app that you can trust!" in the HTML
       sed -i 's/app that you can trust on/app that you can trust!/g' etc/nginx/html/index.html

4.  Let’s check that our changes were made by performing a ``grep`` text
    search on the ``index.html`` file

    .. code:: bash

       # Do a grep search and look for the subheader
       cat etc/nginx/html/index.html | grep "A beautiful"

       <h2>A beautiful <span class="text-orange">fictitious</span> app that you can trust!</h2>

5.  We now can commit and push changes to the git code repository using
    **git commands** instead of the GitHub Desktop Client. Type the
    following three commands sequentially.

    .. code:: bash

       git add .
       git commit -m "Update subheader"
       git push origin master

    If prompted for credentials, enter our Gitlab username and password:
    ``udf`` / ``P@ssw0rd20``

    .. figure:: ../media/image21.png
       :alt: A screenshot Gitlab login prompt

    A successful push will look like the following:

    .. figure:: ../media/image22.png
       :alt: A screenshot of git push

6.  We view the changes made in the new code deployment in a web
    browser. Remember that you may need to reload the webpage if you
    currently have the webpage open, or open the webpage in a \ **New
    incognito window** (**Ctrl + Shift + N**) to bypass browser cache
    and view updated changes

    .. figure:: ../media/image25.png
       :alt: A screenshot of the Appster web app

7.  If you prefer a different subheader again, we can change it once
    again
    using \ `sed <https://www.gnu.org/software/sed/manual/sed.html>`__
    this time performing a search and replace of the the HTML code
    containing ``A beautiful fictitious app that you can trust!`` with
    ``Whatever you want!``.

    For example we are matching the entire html ``<h2>`` block and have
    `escaped <http://dwaves.de/tools/escape/>`__ the HTML code:

    .. code:: bash

       # Flip background colors - purple to yellow, yellow to purple:
       sed -i 's/<h2>A beautiful <span class=\"text-orange\">fictitious<\/span> app that you can trust!<\/h2>/<h2>A beautiful <span class=\"text-orange\">fictitious<\/span> app that you should download!<\/h2>/g' etc/nginx/html/index.html

8.  Once again, let’s check that our changes were made by performing a
    ``grep`` text search on the ``index.html`` file

    .. code:: bash

       # Do a grep search and look for the subheader
       cat etc/nginx/html/index.html | grep "A beautiful"

       <h2>A beautiful <span class="text-orange">fictitious</span> app that you should download!</h2>

9.  Once again, commit and push changes to code repository:

    .. code:: bash

       git add .
       git commit -m "Update subheader"
       git push origin master

    Again, if prompted for credentials, use: ``udf`` / ``P@ssw0rd20``

    .. figure:: ../media/image21.png
       :alt: A screenshot of login prompt

    A successful push will look like the following:

    .. figure:: ../media/image22.png
       :alt: Successful push

10. Browse back to the **Appster** repo on **Gitlab**, click the
    pipeline status icon to get back to the detailed pipeline progress
    page and watch the build process in real-time

    .. figure:: ../media/image23.png
       :alt: Gitlab pipeline status

    .. figure:: ../media/image24.png
       :alt: Gitlab pipeline status

11. Once again, we can view the changes made in the new code deployment
    in a web browser. Remember that you may need to reload the webpage
    if you currently have the webpage open, or open the webpage in
    a \ **New incognito window** (**Ctrl + Shift + N**) to bypass
    browser cache and view updated changes

    .. figure:: ../media/image17.png
       :alt: A Screenshot of the Appster web app
