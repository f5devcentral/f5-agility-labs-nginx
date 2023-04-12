NGINX App Protect Overview
--------------------------

NGINX App Protect is a web application firewall (WAF) designed to protect web applications from a variety of threats such as DDoS attacks, SQL injection, cross-site scripting (XSS), and other common web application attacks.

NGINX App Protect is built on top of the NGINX web server and is deployed as a module within the NGINX Plus application delivery platform. It uses machine learning algorithms and other advanced techniques to detect and block malicious traffic in real-time.

NGINX App Protect provides comprehensive protection for web applications without sacrificing performance. It can be deployed on-premises, in the cloud, or in a hybrid environment and integrates with popular DevOps tools and platforms such as Kubernetes, AWS, and Azure.

Deployment Modes
----------------

NGINX App Protect can be deployed in a variety of ways depending on the specific use case and deployment requirements. Here are some of the most common deployment options:

- As a module within the NGINX Plus application delivery platform: NGINX App Protect can be deployed as a module within the NGINX Plus platform. This provides a unified solution for both load balancing and application security.
- Alongside NGINX Plus Ingress Controller: NGINX App Protect can be deployed in a containerized environment such as Docker or Kubernetes on top of NGINX Plus Ingress Controller. This provides a scalable and flexible solution for cloud-native applications.
- Alongside NGINX Plus API Connectivity Manager: NGINX App Protect combined with NGINX Plus API Connectivity Manager to create a secure API gateway that layers protection from known attack signatures, threat campaigns to fully protect your APIs
- As a service for microservices based deployments: Run NGNIX App Protect inside your microservices-based environment to provide WAF protection to your web applications and APIs

.. image:: images/deployment_modes.png
   :align: center
   :alt: Image showing deployment modes for NGINX App Protect

Deployment environments
-----------------------

NGINX App Protect can be deployed in public and private clouds, on virtual machines, as a container on a microservices platforms including NGINX Ingress Controller; anywhere a `supported Linux distribution <https://docs.nginx.com/nginx-app-protect-waf/admin-guide/install/#prerequisites>`_ can run. 

.. image:: images/deployment_environments.png
   :align: center
   :alt: Image showing diagram of support deployment environments for NGINX App Protect

Lab Overview
------------

This lab serves as an introduction to the NGINX App Protect WAF solution. In this lab, you will:

- review a fully deployed NGINX Plus instance with NGINX App Protect in place for an existing application
- test drive the NGINX Management Suite's Instance Manager and Security Monitoring modules to manage configurations and security posture
- identify false positives and perform policy changes to remedy
- deploy NGINX App Protect on an existing NGINX Plus instance 
- deploy NGINX App Protect in Kubernetes using modern apps methodologies
- Review NGINX App Protect API Security

Each of the modules in this lab are independent and can be performed in any order. 

NGINX Acronyms
--------------

The following are a few acronyms that you will encounter in this lab. 

- NAP – NGINX App Protect
- NMS – NGINX Management Suite
- NIM – NGINX Instance Manager (base NMS module)
- NMS-SM – NGINX Security Monitoring (optional NMS module)
- ACM – API Connectivity Manager (optional NMS module)
- ADM – App Delivery Manager (optional NMS module)
- NIC – NGINX Ingress Controller

NGINX App Protect WAF Terminology
---------------------------------

.. list-table:: 
  :header-rows: 1

  * - **Term**
    - **Definition**
  * - Alarm
    - If selected, the NGINX App Protect WAF system records requests that trigger the violation in the remote log (depending on the settings of the logging profile).
  * - Attack signature
    - Textual patterns which can be applied to HTTP requests andor responses by NGINX App Protect WAF to determine if traffic is malicious. For example, the string ``<script>`` inside an HTTP request triggers an attack signature violation.
  * - Attack signature set
    - A collection of attack signatures designed for a specific purpose (such as Apache).
  * - Bot signatures
    - Textual patterns which can be applied to an HTTP request’s User Agent or URI by NGINX App Protect WAF to determine if traffic is coming from a browser or a bot (trusted, untrusted or malicious). For example, the string ``googlebot`` inside the User-Agent header will be classified as ``trusted bot``, and the string ``Bichoo Spider`` will be classified as ``malicious bot``.
  * - Block
    - To prevent a request from reaching a protected web application. If selected (and enforcement mode is set to Blocking), NGINX App Protect WAF blocks requests that trigger the violation.
  * - Blocking response page
    - A blocking response page is displayed to a client when a request from that client has been blocked. Also called blocking page and response page.
  * - Enforcement mode
    - Security policies can be in one of two enforcement modes:
        - **Transparent mode** In Transparent mode, Blocking is disabled for the security policy. Traffic is not blocked even if a violation is triggered with block flag enabled. You can use this mode when you first put a security policy into effect to make sure that no false positives occur that would stop legitimate traffic.
        - **Blocking mode** In Blocking mode, Blocking is enabled for the security policy, and you can enable or disable the Block setting for individual violations. Traffic is blocked when a violation occurs if you configure the system to block that type of violation. You can use this mode when you are ready to enforce the security policy. You can change the enforcement mode for a security policy in the security policy JSON file.
  * - Entities
    - The elements of a security policy, such as HTTP methods, as well as file types, URLs, and/or parameters, which have attributes such as byte length. Also refers to elements of a security policy for which enforcement can be turned on or off, such as an attack signature.
  * - False positive
    - An instance when NGINX App Protect WAF treats a legitimate request as a violation.
  * - File types
    - Examples of file types are .php, .asp, .gif, and .txt. They are the extensions for many objects that make up a web application. File Types are one type of entity a NGINX App Protect WAF policy contains.
  * - Illegal
    - request	A request which violates a security policy
  * - Legal
    - request	A request which has not violated the security policy.
  * - Loosening
    - The process of adapting a security policy to allow specific entities such as File Types, URLs, and Parameters. The term also applies to attack signatures, which can be manually disabled — effectively removing the signature from triggering any violations.
  * - Parameters
    - Parameters consist of “name=value” pairs, such as OrderID=10. The parameters appear in the query string and/or POST data of an HTTP request. Consequently, they are of particular interest to NGINX App Protect WAF because they represent inputs to the web application.
  * - TPS/RPS
    - Transactions per second (TPS)/requests per second (RPS). In NGINX App Protect WAF, these terms are used interchangeably.
  * - Tuning
    - Making manual changes to an existing security policy to reduce false positives and increase the policy’s security level.
  * - URI/URL
    - The Uniform Resource Identifier (URI) specifies the name of a web object in a request. A Uniform Resource Locator (URL) specifies the location of an object on the Internet. For example, in the web address, ``http://www.siterequest.com/index.html``, index.html is the URI, and the URL is ``http://www.siterequest.com/index.html``. In NGINX App Protect WAF, the terms URI and URL are used interchangeably.
  * - Violation
    - Violations occur when some aspect of a request or response does not comply with the security policy. You can configure the blocking settings for any violation in a security policy. When a violation occurs, the system can Alarm or Block a request (blocking is only available when the enforcement mode is set to Blocking).

Lab Inventory
-------------

.. list-table:: 
  :header-rows: 1

  * - **Instance**
    - **IP Address**
    - **OS**
    - **NGINX Services**
    - **Apps/Protocols**
  * - NGINX Management Suite
    - 10.1.1.4
    - Ubuntu 20.04 LTS
    - NMS, NIM, NMS-SM
    - SSH
  * - k3s Master Node
    - 10.1.1.5
    - Ubuntu 20.04 LTS
    - NIC
    - SSH, k3s
  * - k3s Worker Node 1
    - 10.1.1.6
    - Ubuntu 20.04 LTS
    - NIC
    - SSH, k3s, Arcadia Finance
  * - k3s Worker Node 2
    - 10.1.1.7
    - Ubuntu 20.04 LTS
    - NIC
    - SSH, k3s, Arcadia Finance
  * - NGINX Plus 1
    - 10.1.1.8
    - Ubuntu 20.04 LTS
    - Plus + NAP
    - SSH
  * - NGINX Plus 2
    - 10.1.1.9
    - Ubuntu 20.04 LTS
    - Plus
    - SSH
  * - DevOps Tools
    - 10.1.1.10
    - Ubuntu 20.04 LTS
    - none
    - SSH

Accessing the Lab
-----------------

In this lab, you will access all resources by connecting to a Linux jump host running XRDP. XRDP is an open-source version of the popular Remote Desktop Protocol and is compatible with all popular RDP clients.

When you first connect to the Jump Host via RDP, you will be prompted to click **OK** to connect to the remote session.

.. image:: images/xrdp_login_prompt.png

Once connected, you will see the desktop as shown below.

.. image:: images/xrdp_desktop.png

Clicking on the **Applications** drop-down in the menu bar will bring up a list of applications you will need to finish this lab.

**Favorites** includes Firefox, Visual Studio Code and Terminal.

.. image:: images/desktop_favorites.png

**SSH Shortcuts** open SSH terminal windows to the command prompt of all machines in the lab.

.. image:: images/desktop_ssh.png

Each section in this lab will begin with the assumption that you are connected via RDP, able to navigate the **Applications** menu and familiar with the available applications.

Remember these important tips:

- Lab modules are independent; feel free to tackle the modules in any order.
- The username **lab** and password **Agility2023!** will work for every login unless specifically noted.
- Traffic and attack generators are running to help generate statistics, events and attacks.
- To paste into an SSH session, press SHIFT+CTRL+V or right-click and select **Paste**. Ctrl + V will work inside browser windows.
- The screen resolution for the Remote Desktop connection is selected when conencting to the session. Choose a resolution that works best for you.

Tips for Installing NGINX Management Suite, NGINX App Protect and/or NGINX Plus in Your Own Environment
-------------------------------------------------------------------------------------------------------

If you're installing NGINX Management Suite, make sure that:
- you use a supported version of NGINX Plus and Linux: https://docs.nginx.com/nginx-management-suite/admin-guides/installation/on-prem/install-guide/

If you're installing NGINX App Protect, make sure that:
- you use a supported version of Linux: https://docs.nginx.com/nginx-app-protect-waf/admin-guide/install/

If you're installing NGINX Plus, make sure that:
- you use a supported version of Linux: https://docs.nginx.com/nginx/technical-specs/

.. caution:: NGINX App Protect supports fewer Linux distributions than NGINX Plus. You may need to migrate your NGINX configuration to a supported distro in order to install NAP.

Lab Maintainers
---------------

- Chad Wise - Senior Solutions Engineer c.wise@f5.com
- Greg Robinson - Senior Solutions Engineer g.robinson@f5.com

Please email us with any issues or suggestions.

.. note:: To allow for easy reference back to this page, hold CTRL (Windows) or CMD (Mac) while clicking the **Next** button below to continue in a new tab.