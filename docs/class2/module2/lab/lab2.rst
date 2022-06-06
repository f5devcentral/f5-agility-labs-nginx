Lab 2 (OPTIONAL): Made new code commit, push changes using command line tools, and deploy
=========================================================================================

In this task, we will run through a similar process achieving similar results executing commands in a bash shell.

1.  Open **git bash for windows** using the **Git Bash** icon on the Windows desktop. Git Bash is a bash shell emulator, similar to what you see natively on Linux and Unix machines. If the git console font is too small to read, use **Ctrl+ “+”** to increase the font

    .. image:: ../images/image19.png

2.  Make sure you are in appster project root:
    ``~/Documents/Git/gitlabappster`` . To get there, type the following
    command in the Git Bash shell:

    .. code-block:: bash

       cd ~/Documents/Git/gitlabappster
       ls

    .. image:: ../images/image20.png

3.  We can change the the subheader
    using \ `sed <https://www.gnu.org/software/sed/manual/sed.html>`__.
    ``sed`` command in UNIX stands for *Stream EDitor*, and it can
    perform lots of function on file like searching, find and replace,
    insertion or deletion

    Let’s search and replace the the existing subheader
    ``A beautiful fictitious app that you can trust on`` with ``A beautiful fictitious app that you can trust!``.

    .. code:: bash

       # Update "A beautiful fictitious app that you can trust on" 
       # with "A beautiful fictitious app that you can trust!" in the HTML
       sed -i 's/can trust on/can trust!/g' etc/nginx/html/index.html

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

    .. image:: ../images/image21.png

    A successful push will look like the following:

    .. image:: ../images/image22.png

6.  We view the changes made in the new code deployment in a web
    browser. Remember that you may need to reload the webpage if you
    currently have the webpage open, or open the webpage in a \ **New
    incognito window** (**Ctrl + Shift + N**) to bypass browser cache
    and view updated changes

    .. image:: ../images/image25.png

7.  If you prefer a different subheader again, we can change it again
    using \ `sed <https://www.gnu.org/software/sed/manual/sed.html>`__
    this time performing a search and replace of the the HTML code
    containing ``A beautiful fictitious app that you can trust!`` with
    ``Whatever you want!``.

    For example we are matching the entire html ``<h2>`` block and have
    `escaped <http://dwaves.de/tools/escape/>`__ the HTML code:

    .. code:: bash

       sed -i 's/<h2>A beautiful <span class=\"text-orange\">fictitious<\/span> app that you can trust!<\/h2>/<h2>A beautiful <span class=\"text-orange\">fictitious<\/span> app that you should download!<\/h2>/g' etc/nginx/html/index.html

8.  Let’s check that our changes were made by performing a
    ``grep`` text search on the ``index.html`` file

    .. code:: bash

       # Do a grep search and look for the subheader
       cat etc/nginx/html/index.html | grep "A beautiful"

       <h2>A beautiful <span class="text-orange">fictitious</span> app that you should download!</h2>

9.  Commit and push the changes to the code repository:

    .. code:: bash

       git add .
       git commit -m "Update subheader"
       git push origin master

    Again, if prompted for credentials, use: ``udf`` / ``P@ssw0rd20``

    .. image:: ../images/image21.png

    A successful push will look like the following:

    .. image:: ../images/image22.png

10. Browse back to the **Appster** repo on **Gitlab**, click the
    pipeline status icon to get back to the detailed pipeline progress
    page and watch the build process in real-time

    .. image:: ../images/image23.png

    .. image:: ../images/image24.png

11. We can view the changes made in the new code deployment
    using a web browser. Remember that you may need to reload the webpage
    if you currently have the webpage open, or open the webpage in
    a \ **New incognito window** (**Ctrl + Shift + N**) to bypass
    browser cache and view updated changes

    .. image:: ../images/image17.png
