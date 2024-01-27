Test the WAF Policy by Replicating the SQL Injection Attack
===========================================================

1. Now that the WAF policy is applied, retry the SQL injection attack to see if the attempt is blocked.  In UDF, open a new webshell connection to NGINX Instance Manager under Systems > ACCESS.  Copy the command below and paste it into the webshell (Command/Shift+Ctrl+V).

.. code-block:: bash

   curl -X POST -k -H "host: diy.arcadia-finance.io" "https://nginx-plus-2.appworld.lab/trading/auth.php&\'+or+1=1;--"


2. As shown below, a support ID is generated when the response is returned. **Select and copy this value** so that you can search for it in SM.

   TODO: Add screenshot

3. Return to NIM and navigate to Security Monitoring by clicking the drop-down in the top left of the screen and selecting **Security Monitoring**.

.. image:: images/SM-tile.png

4. You’ll be presented with the Security Monitoring landing page, as shown below.  Please spend a minute or so looking around at the Security Dashboard details while the system processes the attack.

.. image:: images/SM_overview.png

5. On the left menu, select **Support ID Details**. 
    
.. image:: images/SM_support_id_link.png

6. You'll be prompted for your support ID.

.. image:: images/SM_support_id_prompt.png

7. Enter your support ID into the search field and click the **arrow** to search.

.. image:: images/SM_support_id_entry.png

8. Once the security event has loaded, you can see details surrounding the violation that is blocking images on your app. 

.. image:: images/SM_support_id_details.png

NGINX App Protect WAF is now enforcing protection for the site.
