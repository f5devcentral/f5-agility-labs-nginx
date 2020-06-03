Lab 2 - Log and Change Headers (EXAMPLE)
========================================

Your iRule should:

#. Log all HTTP **request** headers.
#. Log all HTTP **response** headers.
#. Remove the header named **Server** from all HTTP responses.

.. attention::
   OPTIONAL:  Instead of removing the **Server** header in the response, change the value of the **Server** header to **Microsoft-IIS/7.0**.

.. important::
   Estimated completion time: 15 minutes

#. Open Chrome Browser
#. Enter https://bigip1 into the address bar and hit Enter

   .. image:: ../images/bigip_login.png
      :width: 800

#. Login with **username**: **admin** 
              **password**: **admin.F5demo.com**
#. Click Local Traffic -> iRules  -> iRules List
#. Click **Create** button

   .. image:: ../images/irule_create.png
      :width: 800

#. Enter Name of **Header_Log_Strip_iRule**
#. Enter Your Code
#. Click **Finished**
#. Click Local Traffic -> Virtual Servers -> Virtual Server List
#. Click on **http_irules_vip**

   .. image:: ../images/select_vs.png
      :width: 800

#. Click on the **Resources** tab
#. Click **Manage** button for the iRules section

   .. image:: ../images/resources.png
      :width: 800

#. Click on Header_Log_Strip_iRule from the Available box and click the << button, thus moving it to the Enabled box, your first and now second iRule should be in the Enabled box.

   .. image:: ../images/lab2-irules-add.png
      :width: 800

#. Click the **Finished** button
#. Open the Firefox browser
#. Click the 3 horizontal line button on the far right of the address bar
#. Use **developer tools** in Mozilla, or use Chrome to view headers

   .. image:: ../images/firefox_developer.png
      :width: 600

#. Enter http://dvwa.f5lab.com/  and ensure you get there
#. Now enter http://wackopicko.f5lab.com/
#. Finally, enter http://peruggia.f5lab.com/ and ensure you can get to that app
#. Look at the headers for each of your requests. Did you log them all? What is the value of the Server header?

   .. image:: ../images/lab2_verify-remove.png
      :width: 800

.. attention::
   OPTIONAL:  Instead of removing the **Server** header in the response, change the value of the **Server** header to **Microsoft-IIS/7.0**.

   .. image:: ../images/lab2_verify.png
      :width: 800

.. hint::

   Basic Hint
   `if you need a hint here is some example code: <../../class1/module1/irules/lab2irule_0.html>`__

   Link to DevCentral: https://clouddocs.f5.com/api/irules/HTTP__header.html

   If you are really stuck, here is what we are looking for:

   #. `When HTTP_Request comes in <../../class1/module1/irules/lab2irule_1.html>`__
   #. `Log the headers from the HTTP_REQUEST <../../class1/module1/irules/lab2irule_2.html>`__
   #. `When HTTP_RESPONSE comes back <../../class1/module1/irules/lab2irule_3.html>`__
   #. `Log the response headers <../../class1/module1/irules/lab2irule_4.html>`__
   #. `Now remove the HTTP::header named Server <../../class1/module1/irules/lab2irule_5.html>`__
   #. `Now you should have enough to understand and the majority of code to create the iRule.  If not here is the complete iRule. <../../class1/module1/irules/lab2irule_99.html>`__
