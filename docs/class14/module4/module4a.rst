Create more advanced configuration
==================================

**Provision Access to a Template Submission**

Since the initial deployment of the PyGoat application using templates worked well, you (as Paul Platops) would like to extend the editing of this particular configuration to one of the app developers, Jane Developer. Paul would like to only grant Jane access to this template submission, instead of the whole template. He wants to allow Jane to ***only*** be able to make changes to the values used in the templated configuration for the specific NGINX instance that was targeted in the template submission. He does not want Jane to be able to use templates to target other NGINX instances in their data center. How will he accomplish this?

**Use RBAC to Grant Access to the Template Submission**

1. In NIM, select **Settings** on top right of the NIM page.

   .. image:: ../images/nim-settings-icon.png
     :width: 275

2. Click **Users**. Note that Jane Developer already has an account, and that her account is mapped to the **developer** role.

   .. image:: ../images/nim-settings-users.png
     :width: 939

3. Click **Roles**. Note that the developer role is listed, and already has some permissions associated with it.

   .. image:: ../images/nim-settings-roles.png
     :width: 906

4. Click the **developer** row to list additional details. Note at present developers only have READ access to the configuration of the nginx.f5demos.com system, which isn't very useful. Let's grant a couple more permissions to make NIM more useful for the developers.

   .. image:: ../images/nim-settings-dev.png
     :width: 567

5. Click **Edit Role** at the top left of the **developer** view, then click **Add Permission**.

   .. image:: ../images/nim-settings-edit-button.png
     :width: 215
   |

   .. image:: ../images/nim-settings-edit.png
     :width: 493

6. Click **Edit** under **INSTANCE-MANAGEMENT**

   .. image:: ../images/nim-settings-edit-role.png
     :width: 570

7. Select **Instance Manager** for the *Module* and **Analytics** for the *Feature*.

   .. image:: ../images/nim-roles-access.png
     :width: 680

8. Click **Add Additional Access**.

    Note that *Access* is already preset to **READ**, which is sufficient.

9. Click **Save**. **Permission Update Staged** will be displayed. Once applied, this will permit the developers to have access to the analytics data on the NIM dashboard.

   At this point, the staged permissions look like this:

   .. image:: ../images/image-22.png
     :width: 700

   Next we will add the ability for the developer role to update the Template Submission object of the NGINX instance that proxies the PyGoat application.

10. You will be returned to the **Edit Role** view.  Click **Add Permission**.

    .. image:: ../images/nim-settings-edit.png
      :width: 493

11. Select **Instance Manager** for the *Module* and **Template Submissions** for the *Feature*.

12. Click **Add Additional Access**.

    .. image:: ../images/nim-roles-add-access.png
      :width: 726

13. Select **Create**, **Read** and **Update** from the *Access* drop-down list.

14. Select **Systems** from the *Applies to* drop-down.

15. Select **nginx.f5demos.com** for the system selection to the right.  The page should look like this:

    .. image:: ../images/nim-role-temp-sub.png
      :width: 797

16. Click **Save** on the bottom right. You will see a **Permission Update Staged** message.

18. Click **Save** once again to save the staged role changes. You will see a **Role Updated** message indicating success.

19. Close the developer role details by clicking the **x** button in the top right of the dialog.


**Import a Custom 404 Augment Template**

We are now going to log in as Paul Platops so that we can import and grant developers access to an Augment Template that attaches a custom pre-built 404 response handler.

1. Click the person icon in the top right corner, then click the **Logout** link.

2. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter `paulplatops` as the user, `NIM123!@#` as the password.

3. Click the **Instance Manager** tile.

4. In the left navigation, click **Templates**.

5. Click the green **+ Create** button in the upper right corner.

    At this point we have the choice to create a new augment template from scratch, or to import an existing one. An augment template bundle has been created for you, so select **Import**.

6. Click **Browse** to browse the JumpHost's file system for the template we wish to import.

7. Select the `custom_404_augment.tar.gz` file, and click **Open**.

    This augment template was designed to be used with the base template we used earlier in the lab. It adds the capability to intercept 404 responses from the upstream, and respond with a custom html page. Yes, the custom response page has cats. This is fine.

8. Click the green **Parse** button in the lower right to scan and analyze the contents of this template bundle.

9. As you did earlier in the lab, check the **Allow Signature Bypass** checkbox to override the import dialog.

10. Below the checkbox, you should note that there was one template detected in a bundle, named **Custom 404 Response**.

11. Click the **Import** button.

12. You will see the **Config Template Created** message, and see the newly imported augment template on the **Templates** page.

  .. image:: ../images/image-5.png

**Apply the Custom 404 Augment Template**

As Jane Developer, we will attach the custom 404 handler to the NGINX configuration that she has been granted access to. We (as Jane Developer) will use the augment template that Paul just imported to accomplish this.

1. Click the person icon in the top right corner, then click the **Logout** link.

2. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter `janedev` as the user, `NIM123!@#` as the password.

3. Click the **Instance Manager** tile.

4. Click **Template Submissions** in the left navigation.

5. Click on the **Basic Reverse Proxy** row. Details of the template submission appear.

6. At the right side of the **nginx.f5demos.com** row, there will be a `...` menu in the **Actions** column. Click that, then select **Edit Submission**.

    You should see the familiar template filled with values similar to what you saw earlier.

7. Click **Next** to transition to the **Choose Augments** view. Note the augment template Paul Platops imported earlier is ready for use.

    .. image:: ../images/image.png

8. Click the checkbox on the **Custom 404 Response** row. When you do, the template form builder will add a new step indicating there is an additional form needed to capture inputs for this new augment template.

    .. image:: ../images/image-1.png

9. Click the **Next** button until you reach the **Custom 404 Response** input step.

    This step only has one option - to enable it or not.

10. Choose **TRUE** in the *Use Custom 404 Response* input.

    .. image:: ../images/image-4.png

11. Click **Next**. You will be presented with the diff view showing the changes that would happen to the nginx.conf file if the changes were to be published.

    It is important to understand that Augment templates are applied to configuration files within `include` directives. To see the details of what the augment template adds, click the file selector dropdown at the top of the editor.

    .. image:: ../images/image-2.png

    Notice there are 2 new files in the generated configuration:

      - /etc/nginx/augments/http-server/base_http-server1-<<UNIQUE-ID>>.conf
      - /usr/share/nginx/html/custom_404.html

12. Click on the first file. This is the file that will be included in the main `nginx.conf` file. It contains the config to intercept 404 errors from the upstream, and will serve up the contents of a static file included in the template bundle.

13. Click on the second file. This is the static HTML page that will be displayed by the configuration in the previous file.

14. Click the **Publish** button. If successful, you should see a message indicating so.

**Test the Augment Template**

1. In FireFox, click the tab for the PyGoat app.

2. Modify the URL to a reference a page that does not exist, such as: `https://pygoat.f5demos.com/login/non-existent-page.html` and hit enter.

3. You will see the custom 404 page. You were previously warned there would be cats.

    .. image:: ../images/image-3.png

**Import another Augment Template**

We are now going to log in as Paul Platops so that we can import and grant persons in the **secops** role access to rate limiting augment template.

4. Click the person icon in the top right corner, then click the **Logout** link.

5. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter `paulplatops` as the user, `NIM123!@#` as the password.

6. Click the **Instance Manager** tile.

7. In the left navigation, click **Templates**.

8. Click the green **+ Create** button in the upper right corner.

9. Select **Import**.

10. Click **Browse** to browse the JumpHost's file system for the template we wish to import.

11. Select the `rate_limit_augment.tar.gz` file, and click **Open**.

    This augment template was designed to be used with the base template we used earlier in the lab. It adds the capability to attach a rate limiting policy to an HTTP Server.

12. Click the green **Parse** button in the lower right to scan and analyze the contents of this template bundle.

13. As you did earlier in the lab, check the **Allow Signature Bypass** checkbox to override the import dialog.

14. Below the checkbox, you should note that there was one template detected in a bundle, named **Rate Limiting**.

15. Click the **Import** button.

16. You will see the **Config Template Created** message, and see the newly imported augment template on the **Templates** page.

    .. image:: ../images/image-6.png

**Apply the Rate Limiting Augment Template**

Sally Secops has noticed that the PyGoat application's login API has been overused by actors with questionable intent, also resulting in degraded application performance. Sally would like to attach rate limiting to the NGINX configuration or the PyGoat application's NGINX HTTP Server. We (as Sally Secops) will use the augment template that Paul just imported to accomplish this.

1. Click the person icon in the top right corner, then click the **Logout** link.

2. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter `sallysecops` as the user, `NIM123!@#` as the password.

3. Click the **Instance Manager** tile.

4. Click **Template Submissions** in the left navigation.

5. Click on the **Basic Reverse Proxy** row. Details of the template submission appear.

6. At the right side of the **nginx.f5demos.com** row, there will be a `...` menu in the **Actions** column. Click that, then select **Edit Submission**.

    You should see the familiar template filled with values similar to what you saw earlier.

7. Click **Next** to transition to the **Choose Augments** view. Note the **Custom 404 Response** augment template that Jane used on this template submission is still selected.

    .. image:: ../images/image-7.png

8. Click the checkbox on the **Rate Limiting** row. When you do, the template form builder will add a new step indicating there is an additional form needed to capture inputs for this new augment template.

    .. image:: ../images/image-8.png

9. Click the **Next** button until you reach the **Rate Limiting** input step.

    This step has 3 options. Enter the values from the following table:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Apply Rate Limiting
     - TRUE
   * - Rate Limit Method
     - Binary Remote Address
   * - Requests Per Second 
     - 5


Note: Realistically, 5 requests per second per client is extremely low. We are just using this value for illustrative purposes.

    .. image:: ../images/image-9.png

10. Click **Next**. You will be presented with the diff view showing the changes that would happen to the nginx.conf file if the changes were to be published.

    Notice that there are two changes in the diff editor: one in the http context, and one in the server context. Since the Rate Limiting template needs to insert directives into both contexts, this template emits two different include statements as pictured below.

    .. image:: ../images/image-10.png

    In addition to the changes to `nginx.conf`, there are 2 new files in the generated configuration:

      - /etc/nginx/augments/http-server/base_http-server1_*&lt;unique identifier&gt;*.conf
      - /etc/nginx/augments/http/*&lt;unique identifier&gt;*.conf

11. Click on each of these new files. They are files that will be included in the main `nginx.conf` file at the `http` and `server` contexts.

    .. image:: ../images/image-11.png

12. Click the **Publish** button. If successful, you should see a message indicating so.

**Test the Rate Limiting Augment Template**

In this final section of the lab, we will use the hey utility to test the efficacy of the rate limiting augment template that you just deployed.

1. In the UDF deployment, select the **Web Shell** access method of the **JumpHost** component.

2. In the Web Shell, run the following:

    
    hey -n 10 -c 1 -q 2 https://pygoat.f5demos.com/login/
    

This will execute a total of `10` requests using `1` concurrent worker at a rate of `2` requests per second against the `https://pygoat.f5demos.com/login/` URL. You should see output similar to the following:

    .. image:: ../images/image-12.png

Notice that all 10 requests were successful with a status code of 200 observed. Let's try increasing the rate to see what happens...

3. In the Web Shell, run the following:

    
    hey -n 10 -c 1 -q 6 https://pygoat.f5demos.com/login/
    

This will execute a total of `10` requests using `1` concurrent worker at a rate of `6` requests per second against the `https://pygoat.f5demos.com/login/` URL. If you recall, this rate is above the rate limiting threshold you set in the augment template. You should see output similar to the following:

    .. image:: ../images/image-13.png

Notice that the first requests were successful with a status code of 200 observed. Then, they started to receive status code 503 (Service Unavailable), indicating that this client has been rate limited for exceeding the threshold you set.


**Examine additional Custom Templates**

Finally, to conclude this lab, we will log in as Paul Platops and import additional template examples developed by the NGINX community. Some are simple, such as a basic location block, while others are more advanced, like health checks and OIDC. These examples will demonstrate the flexibility of this feature and the wide variety of use cases it supports. Many of these templates can be customized to suit your needs, depending on your specific NGINX use cases.

1. Click the person icon in the top right corner, then click the **Logout** link.

2. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter the following: 

   | User: `paulplatops`
   | Password: `NIM123!@#`

3. Click the **Instance Manager** tile.

4. In the left navigation, click **Templates**.

5. Click the green **+ Create** button in the upper right corner.

6. Click **Browse** to select a template to import from the JumpHost's file system.

7. Select the `n1_templates_http_examples.tar.gz` file, and click **Open**.

    There is a wide selection of templates here for common NGINX use-cases.

8. Click the green **Parse** button in the lower right to scan and analyze the contents of this template bundle.

9. As you did earlier in the lab, check the **Allow Signature Bypass** checkbox to override the import dialog.

10. Below the checkbox, you should note that there are multiple Templates detected in the bundle.

    .. image:: ../images/nim-templates-bundle.png
     :width: 683

11. Click the **Import** button at the bottom right.


**Conclusion**

As you have witnessed, NIM's Templating framework gives organizations the control they need to empower users of their NGINX platform. Via templates, these users can apply use cases to their application delivery tier without requiring they be NGINX configuration experts. Additionally, the framework allows organizations to provide this capability to users in a "least-privileged" manner - only granting them permissions to execute templates on the instances they have been assigned. This ensures compliance, and significantly narrows the "blast radius" in the event an outage occurs due to human error while configuring.

