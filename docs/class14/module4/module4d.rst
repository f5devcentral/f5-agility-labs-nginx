Importing Augment Templates
===========================

We are now going to log in as Paul Platops so that we can import and grant developers access to an Augment Template that attaches a custom pre-built 404 response handler.

#. Click the person icon in the top right corner, then click the **Logout** link.

#. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter the following:

   | User: `paulplatops`
   | Password: `NIM123!@#`

#. In the left navigation, click **Templates**.

#. Click the green **+ Create** button in the upper right corner.

   At this point we have the choice to create a new augment template from scratch, or to import an existing one. An augment template bundle has been created for you, so select **Import**.

#. Click **Browse** to browse the JumpHost's file system for the template we wish to import.

#. Select the `custom_404_augment.tar.gz` file, and click **Open**.

   This augment template was designed to be used with the base template we used earlier in the lab. It adds the capability to intercept 404 responses from the upstream, and respond with a custom html page. Yes, the custom response page has cats. This is fine.

#. Click the green **Parse** button in the lower right to scan and analyze the contents of this template bundle.

9. As you did earlier in the lab, check the **Allow Signature Bypass** checkbox to override the import dialog.

10. Below the checkbox, you should note that there was one template detected in a bundle, named **Custom 404 Response**.

11. Click the **Import** button.

12. You will see the **Config Template Created** message, and see the newly imported augment template on the **Templates** page.

    .. image:: ../images/image-5.png

