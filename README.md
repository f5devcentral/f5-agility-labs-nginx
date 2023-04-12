F5 Agility Lab Template
=======================

[![Issues](https://img.shields.io/github/issues/f5devcentral/f5-agility-labs-template.svg)](https://github.com/f5devcentral/f5-agility-labs-template/issues)
[![Build the Docs](https://github.com/f5devcentral/f5-agility-labs-template/actions/workflows/build-the-docs.yml/build.svg)](https://github.com/f5devcentral/f5-agility-labs-template/actions/workflows/build-the-docs.yml)
[![Check the Docs](https://github.com/f5devcentral/f5-agility-labs-template/actions/workflows/check-the-docs.yml/check.svg)](https://github.com/f5devcentral/f5-agility-labs-template/actions/workflows/check-the-docs.yml)

Introduction
------------

This repo contains a template that should be used when creating lab
documentation for F5's Agility Labs.

Setup
-----

1. Download or ``git clone`` the f5-agility-lab-template
2. Download and install Docker CE (https://docs.docker.com/engine/installation/)
3. Build the sample docs ``./containthedocs-build.sh``. The first time you
   build a container (~1G in size) will be downloaded from Docker Hub.
4. Open the ``docs/_build/html/index.html`` file on you system in a web browser

Configuration & Use
-------------------

To use this template:

1. Copy contents of this repo to a new directory
   ``cp -Rf . /path/to/your/docs``
2. ``cd /path/to/your/docs``
3. Edit ``docs/conf.py``
4. Modify the following lines:
   - ``classname = "Your Class Name"``
   - ``github_repo = "https://github.com/f5devcentral/your-class-repo"``
5. Build docs ``./containthedocs-build.sh`` (*see Build Scripts below*)
6. Open the ``docs/_build/html/index.html`` file on you system in a web browser
7. Edit the ``*.rst`` files as needed for your class
8. Rebuild docs as needed using ``./containthedocs-build.sh``

Converting from Microsoft Word
------------------------------

To convert a ``.docx`` file from Microsoft Work to reStructuredText:

1. Copy your ``.docx`` file into the f5-agility-lab-template directory
2. Run ``./containthedocs-convert.sh <filename.docx>``
3. Your converted file will be named ``filename.rst``
4. Images in your document will be extracted and placed in the ``media``
   directory

.. WARNING:: While the document has been converted to rST format you will still
   need to refactor the rST to use the structure implemented in this template.

.. _scripts:

Build Scripts
-------------

The repo includes build scripts for common operations:

- ``containthedocs-bash.sh``: Run to container with a BASH prompt
- ``containthedocs-build.sh``: Build HTML docs using ``make -C docs html`` to
  ``docs/_build/html``
- ``containthedocs-clean.sh``: Clean the build directory using
  ``make -C docs clean``
- ``containthedocs-cleanbuild.sh``: Clean the build directory and build HTML
  docs using ``make -C docs clean html``
- ``containthedocs-convert.sh``: Convert a Word ``.docx`` file to rST
