Test a SQL Inject Attack against the Arcadia Finance App
========================================================

1. Before you enable the App Protect service, attempt a SQL injection attack on the Arcadia Finance app. In UDF, open a new webshell connection to NGINX Instance Manager under Systems > ACCESS. Copy the command below and paste it into the webshell (Command/Shift + Ctrl + V).

.. code-block:: bash

   curl -X POST -k -H "host: nginx-plus.arcadia-finance.io" "https://nginx-plus-2.appworld.lab/trading/auth.php&\'+or+1=1;--"

2. While your SQL injection was not successful in logging into the system, the attempt was also not blocked. We'll enable the App Protect WAF policy and re-attempt to ensure protection is enforce as you progress through the lab.

   TODO: ADD SCREENSHOT OF RESULT
