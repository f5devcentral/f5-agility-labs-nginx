Lab 2 - Configuring the IdP Keycloak:
=====================================
   
1) Connect to container via udf connection methods
   
.. image:: images/ualab06.png
  :width: 800 

2) Login to keycloak

.. image:: images/ualab07.png
   :width: 800

Configuring Keycloak
--------------------
  1) Create a Keycloak client for NGINX Plus in the Keycloak GUI:

      In the left navigation column, click Clients. On the Clients page that opens, click the Create button in the upper right corner.

      On the Add Client page that opens, enter or select these values, then click the  Save  button.

      **Client ID – agility2022**

      **Client Protocol – openid-connect.**

.. image:: images/ualab08.png
   :width: 800
   
  2) On the NGINX Plus page that opens, enter or select these values on the Settings tab:

      Access Type – confidential
      Valid Redirect URIs – The URI of the NGINX Plus instance, including the port number, and ending in /_codexch (in this guide it is https://10.1.1.5:443/_codexch)
      
      *Notes: For production, we strongly recommend that you use SSL/TLS (port 443).*
      *The port number is mandatory even when you’re using the default port for HTTP (80) or HTTPS (443).*

.. image:: images/ualab09.png
   :width: 800