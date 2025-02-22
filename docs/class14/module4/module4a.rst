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

15. Select **nginx.f5demos.com** for the system selection to the right.  The page should look like this when done:

    .. image:: ../images/nim-role-temp-sub.png
      :width: 797

16. Click **Save** on the bottom right. You will see a **Permission Update Staged** message.

18. Click **Save** once again to save the staged role changes. You will see a **Role Updated** message indicating success.

19. Close the developer role details by clicking the **x** button in the top right of the dialog.
