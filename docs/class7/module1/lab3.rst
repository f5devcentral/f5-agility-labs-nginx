Lab 1.3 - Dev System tools introduction
=================================================

In this lab we will explore the "dev" system from the UDF pattern. This is where all work will be completed. We will be working in VS Code and the Firefox browser.

Dev System
-------------------

It is assumed that you have a development system you are regularly
using. Tool chain choices are often a personal preference but in the
interest of transparency, below is a description of a possible setup for
a dev system. This is sometimes referred to as a jump host.

**OS**

    - Ubuntu 20.04 LTS

**Browser**

    - Firefox

**Code Editor / IDE**

    - Visual Studio Code (VS Code)

**Rancher Desktop**

    - Rancher Desktop for Linux (pre-installed)

**Path Binaries provided by Rancher Desktop**

    - kubectl
    - nerdctl
    - helm

.. attention::
    Take some time to have a look around the system and familiarize yourself with the tools.  We are using a limited set of tools to keep things simple.

Please note the following items
-------------------------------

    - Firefox is our browser and in the bookmark bar you will find shortcuts to all the sites we will be using as well as some reference links.
    - VS Code will be our primary dev tool. If you are familiar with VS Code feel free to move on to the next area of interest once you have explored which options are set up.
    - We will be using vscode as our terminal as well to help keep all the work in one interface.
    - Rancher Desktop has been installed on this system and will aid us in working with the Rancher Kubernetes Engine 2 (RKE 2).

.. important::
    Due to an unknown issue with running a standalone DNS inside UDF, the system may not resolve DNS requests properly from time to time. This is easily solved by issuing the command below to re-apply the systems netplan. 

.. code-block:: bash

    sudo netplan apply

To set up for Module 2 please complete the following.
-----------------------------------------------------

    #. Open the browser and locate the Rancher bookmark in the bookmarks bar and open in a new tab. The login and password should be pre-populated.
    #. Ensure that VSCode is open and ready to use.
    #. Locate and open the link to the GitHub GIST we will be using.

Recap
-----
You now have the following:

    - Explored the dev system.
    - Gone through the available tools with the instructor.
    - Set up the system for the next module.

Next In Module 2 we will run though a GitHub Gist for the rest of the configuration and deployment of an RKE2 cluster as well as the NGINX Kubernetes Ingress Controller.
