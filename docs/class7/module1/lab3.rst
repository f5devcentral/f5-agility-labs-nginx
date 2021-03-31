Lab 1.3 - Control / Dev System tools introduction
=================================================

In this lab we will explore the control / dev system from the UDF pattern. This is where all work will be completed. Primarly we will be working in VS Code and the browser.

Dev/ Control System
-------------------

It is assumed that you have a development system you are regularly
using. Tool chain choices are often a personal prefrence but in the
intersted of transparency below is a description of a possible setup for
a dev / control system. This is sometimes referred to as a jump host.

**OS**

    - Ubuntu 18.04 LTS

**Browser**

    - Firefox

**Code Editor / IDE**

    - Visual Studio Code (VS Code)

**VS Code Extensions Minimum**

    - Docker 1.11.0 - Microsoft
    - Kubernetes 1.3.0 - Microsoft
    - YAML 0.16.0 - Red Hat
    - Go 0.23.2 - Go team at Google

**Path Binaries**

    - Required
    - kubectl
    - rke
    - helm

.. attention::
    Take some time to have a look around the system and familierize your self with the tools.  We are using a limited set of tools to keep things simple.

Please note the following items
-------------------------------

    - Firefox is our browser and in the bookmark bar you will find shortcuts to all the interfaces we will be using as well as some refrence links. These are detailed above.
    - VS Code will be our primary dev tool if you are familier with VS Code feel free to move on to the next area of intrest once you have explored what options are set up.
    - In the vscode main window you will notice a Rancher project. This is the repo project we will be working with.
    - Several extensions have been intalled to help with this process they are noted above.
    - We will be using vscode as our terminal as well to help keep all the work in one interface.
    - Several binaries have been added to the path for working with Rancher Kubernetes Engine (RKE) those are noted above.

.. important::
    Due to an unknown issue with running a standalone DNS inside UDF, the system will not resolve DNS requests properly from time to time. This is easily solved by issuing the command below to re-apply the systems netplan. I apologize for the inconvienience.

.. code-block:: bash

    sudo netplan apply

To set up for Module 2 please complete the following.
-----------------------------------------------------

    #. If you have not already return to the VSCode window and open the rancher projects repo.
    #. Locate the cluster.yaml as we will need it for the next module.
    #. next open the browser and locate the Rancher bookmark in the bookmarks bar and open in in a new tab. The login and password should be prepopulated. Go ahead and log in.

Recap
-----
You now have the following:

    - Explored the control / dev system.
    - Gone through the available tools with the instructor.
    - Set up the system for the next module.

Next In Module 2 we will configure and deploy the RKE cluster.