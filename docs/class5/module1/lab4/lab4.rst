Modify the WAF Policy to Resolve an App Issue
=============================================

1. In **Firefox**, click the **Arcadia Finance (N+)** bookmark or navigate to https://nginx-plus.arcadia-finance.io/. You should see a partially blank page load as shown below.

.. image:: images/arcadia_partial_load.png

2. Now, click on the **Arcadia Finance (DIY)** bookmark or navigate to https://diy.arcadia-finance.io/. 

.. image:: images/arcadia_full_load.png

3. Carefully examine the pages for obvious differences. Notice anything unusual? In our N+ site, which has a WAF policy applied, the banner images on the page are not loading. On the "DIY" site, which has no policy, we we are not experiencing this same issue. Let's troubleshoot further to find out why.

4. Load the **Arcadia Finance (N+)** bookmark again. Click in the middle of the white space in the browser where the banner image should have loaded. Click **Open Image in New Tab** on the context menu that appears.

.. image:: images/load_image_new_tab.png

5. Click on the **Custom Reject Page** that loads in the new tab. NGINX App Protect redirected us to this page. Notice that a **support ID** is generated when the page loads. We can use this ID to identify the cause of the image block. **Select and copy this value** so that we can search for it in NMS-SM.

.. image:: images/custom_reject_page.png

6. Return to NGINX Security Monitoring by clicking the **NMS** bookmark, logging in and selecting **Security Monitoring**.

.. image:: images/NMS-SM_overview.png

7. On the left menu, select **Support ID Details**. You'll be prompted for your support ID.

.. image:: images/NMS-SM_support_id_prompt.png

8. Once the security event has loaded, you can see details surrounding the violation that is blocking images on your app. Notice that the image URI is listed as **/images/slider/slide-3.jpg**.

.. image:: images/NMS-SM_support_id_details.png

9. If you scroll down to the **Attack Details** section, you can expand the individual sections showing **Violations**, **Subviolations**, **CVEs**, and **Threat Campaigns**. 

.. image:: images/NMS-SM_support_id_attack_details.png

10. Notice that the **Violations** section shows a single violation: **Illegal File Type**. 

.. image:: images/NMS-SM_support_id_illegal_file_type.png

11. We need to allow JPG files to enable our application to operate properly. In order to do so, we need to modify our WAF policy. Let's start that process by navigating back to **Instance Manager** from the **Select module** drop-down at the top of the left menu bar.

.. image:: images/menu_drop_down_nim.png

12. Inside of the **Instance Manager** dashboard, click on **App Protect** towards the bottom of the left menu bar.

.. image:: images/nim_app_protect_menu.png

13. Click on the **AgilityPolicy** in the policy list. 

.. image:: images/nim_app_protect_agilitypolicy.png

14. Now, click on the **Policy Versions** sub-tab inside of the **Policy Detail** page.

.. image:: images/nim_app_protect_agilitypolicy_versions.png

15. Click on the version name under the **Versions** column in the list. The JSON configuration of the policy will be displayed.

.. image:: images/nin_app_protect_agilitypolicy_version_view.png

16. To modify the policy based on this version of the policy, click **Edit Version**. Provide a description of the changes you'll be making in the **Description** field. 

.. image:: images/nim_app_protect_agilitypolicy_version_edit.png

17. Place your mouse cursor inside the policy editor. Press **CTRL+F** to open the search dialog.

.. image:: images/nim_app_protect_agilitypolicy_version_search.png

18. Search for **"jpg"** and you'll find on line 240 that JPG files are not being allowed. Modify line 241 to change **"allowed": false** to **"allowed": true**. Note that false and true are not encapsulated in quotation marks.

.. image:: images/nim_app_protect_agilitypolicy_version_modified.png

19. Click the **Save New Version** button to create a new version of the policy. You will see confirmation that the new version has been created.

.. image:: images/nim_app_protect_new_version_created.png

20. Click on **App Protect** on the menu bar on the left to return to the policy list. Select the **AgilityPolicy** once again and once opened, select the **Policy Versions** sub-tab again. You should see your new version of the policy created:

.. image:: images/nim_app_protect_new_version_listed.png

21.  Return to the the **Instances and Instance Groups** sub-tab. Now click on the **Assign Policy and Signature Versions** button above the instance list. Notice that the policy version listed is actually a drop-down that can be modified.

.. image:: images/assign_policy_version.png

22. Change this to your newer version (compare timestamps) and click **Publish**. A pop-up will confirm that you have changed the version.

.. image:: images/publish_confirmation.png

23. Click **Cancel** to close the assignment window. 

24. On the top of the left menu bar, click **Instances**, then chose the active NGINX Plus instance from the list.

25. Look for the deployment status in the **Last Deployment Details** section. You should see a status of **Finalized**. If not, wait a few moments for the deployment to commence and complete. You may need to refresh your browser for the status to update.

**Deployment not finished**

.. image:: images/deployment_status_unknown.png

**Deployment finished**

.. image:: images/deployment_status.png

26.  Once the deployment has finished, check the site to see if the issue is remediated. In a new tab in **Firefox**, open a new tab and click on the **Arcadia Finance (N+)** bookmark. Notice that the images are now loading successfully.

.. image:: images/successful_full_load.png

Now that you have viewed, diagnosed and remedied a false positive in a WAF policy, let's continue to the next section of the lab.








