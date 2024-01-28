Modify the WAF Policy to Resolve an App Issue
=============================================

1. In **Firefox**, open a new tab, then click the **Arcadia Finance (N+)** bookmark or navigate to https://nginx-plus.arcadia-finance.io/. 

.. image:: images/new_tab.png

2. You should see a partially blank page load as shown below.

.. image:: images/arcadia_partial_load.png

3. Now, click on the **Arcadia Finance (DIY)** bookmark or navigate to https://diy.arcadia-finance.io/. 

.. image:: images/diy_bookmark.png

4. Notice that this page includes more images than the **Arcadia Finance (N+)** page.

.. image:: images/arcadia_full_load.png

5. Load the Arcadia Finance (N+) bookmark again. Now, we will make a request for the missing image in the blank section of the web page. In your Jump Server RDP session, click **Applications** and then **Terminal**.

.. image:: images/terminal_click.png

.. image:: images/terminal_new.png

6. In the terminal window that opens, enter the command below.

.. code-block:: bash

    curl -X POST -k -H "host: nginx-plus.arcadia-finance.io" "https://nginx-plus-1.appworld.lab/images/slider/slide-img-3.jpg" |& sed 's/>/>\n/gI'

.. image:: images/terminal_curl_output_block.png

7. NGINX App Protect intercepted the request and responded with this custom page. Notice that a **support ID** is generated in the terminal output. You can use this ID to identify the cause of the image block. **Select and copy this value** so that you can search for it in SM.

.. image:: images/terminal_curl_output_select_support_id.png

8. Return to NIM and navigate to Security Monitoring by clicking the drop-down in the top left of the screen and selecting **Security Monitoring**.

.. image:: images/SM-tile.png

9. You'll be presented with the Security Monitoring landing page, as shown below:

.. image:: images/SM_overview.png

10. On the left menu, select **Support ID Details**. 
    
.. image:: images/SM_support_id_link.png

11. You'll be prompted for your support ID. Wait for 60 seconds or so, then move to the next step.

.. image:: images/SM_support_id_prompt.png

12. Enter your support ID into the search field and click the **arrow** to search.

.. image:: images/SM_support_id_entry.png

.. note:: At anytime in this lab you encounter a support ID, feel free to return to this tool to look at the details of the attack and mitigation.

13. Once the security event has loaded, you can see details surrounding the violation that is blocking images on your app. 

.. image:: images/SM_support_id_details.png

14. Notice that the image URI is listed as **/images/slider/slide-img-3.jpg**.

.. image:: images/SM_support_id_uri.png

15. If you scroll down to the **Attack Details** section, you can expand the individual sections showing **Violations**, **Subviolations**, **CVEs**, and **Threat Campaigns**. 

.. image:: images/SM_support_id_attack_details_collapsed.png

16. Notice that the **Violations** section shows an **Illegal File Type** violation.

.. image:: images/SM_support_id_illegal_file_type.png

17. You need to allow JPG files to enable the application to operate properly. To do this, you will need to modify the WAF policy. Start that process by navigating back to **Instance Manager** from the **Select module** drop-down at the top of the left menu bar.

.. image:: images/menu_drop_down_nim.png

18. Inside of the **Instance Manager** dashboard, click on **App Protect**, then **Policies** towards the bottom of the left menu bar.

.. image:: images/nim_app_protect_menu.png

19. Click on the **AppWorldPolicy** in the policy list. 

.. image:: images/nim_app_protect_appworldpolicy.png

20. Now, click on the **Versions** tab inside of the **Policy Detail** page.

.. image:: images/nim_app_protect_appworldpolicy_versions.png

21. Click on the version name under the **Versions** column in the list.

.. image:: images/nim_app_protect_appworldpolicy_version_view.png

22. The JSON configuration of the policy will be displayed, as shown below:
  
.. image:: images/nap_appworldpolicy_json.png

23. To modify the policy based on this version of the policy, click **Edit Version**.

.. image:: images/nap_appworldpolicy_edit_version.png

24. Provide a description of the changes you'll be making in the **Description** field.

.. image:: images/nap_appworldpolicy_version_edit.png

25. Place your mouse cursor inside the policy editor. Press **CTRL+F** to open the search dialog.

.. image:: images/nim_app_protect_appworldpolicy_version_search.png

26. Search for **"jpg"** and you'll find on line 240 that JPG files are not being allowed. Modify line 241 to change ``"allowed": false`` to ``"allowed": true``. Note that false and true are not encapsulated in quotation marks.

.. image:: images/nim_app_protect_appworldpolicy_version_modified.png

27. Click the **Save New Version** button to create a new version of the policy. 
    
.. image:: images/save_new_version.png
    
28. You will see confirmation that the new version has been created.

.. image:: images/nim_app_protect_new_version_created.png

29. Click on the policy name at the top of the screen.

.. image:: images/nap_app_protect_link.png

30. Select the **Versions** tab.

.. image:: images/nim_appworldpolicy_versions.png

31. Notice the new policy version is now listed.

.. image:: images/nim_app_protect_new_version_listed.png

32. Return to the the **Deployments** tab.

.. image:: images/nim_app_protect_appworldpolicy_instance_tab.png

33. Now click on the **Assign Policy and Signature Versions** button above the instance list.

.. image:: images/assign_policy_version.png

34. Notice that the version listed in the **Policy Version** column is in a drop-down box. You may need to hover your mouse arrow over this section to see the drop-down appear.

.. image:: images/policy_version_dropdown.png

35. Change this to your newer version (compare timestamps) and click **Publish**.

.. image:: images/publish.png

36. A pop-up will confirm that you have changed the version.

.. image:: images/publish_confirmation.png

37. Click X to close the confirmation window.

.. image:: images/publish_confirmation_close.png

38. Click **Cancel** to close the assignment window.

.. image:: images/close_assignment_window.png

39. On the top of the left menu bar, click **Instances**.

.. image:: images/nim_instances_link.png

40. Select the **nginx-plus-1** instance from the list.

.. image:: images/active_instance_select.png

41. Look for the deployment status in the **Last Deployment Details** section. You should see a status of **Successful**. If not, wait a few moments for the deployment to commence and complete. You may need to refresh your browser for the status to update.

.. image:: images/deployment_status.png

42. Once the deployment has finished, check the site to see if the issue is remediated. Go back to the Terminal that is open on the Jump Server and enter the command below.

.. code-block:: bash

    curl -X POST -k -H "host: nginx-plus.arcadia-finance.io" "https://nginx-plus-1.appworld.lab/images/slider/slide-img-3.jpg" -o slide-img-3.jpg && file slide-img-3.jpg | sed 's/, /\n/gI'

The command will attempt to download the jpg image, and inspect its contents. You should see output as in the screenshot below signifying that the file has been downloaded successfully, and is no longer being blocked by the WAF policy.

.. image:: images/terminal_curl_output_pass.png

Now that you have viewed, diagnosed and remedied a false positive in a WAF policy, continue to the next section of the lab.
