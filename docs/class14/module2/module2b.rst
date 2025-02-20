Importing NIM Templates
=============================

In this section, we will import a pre-made template that will later be used to configure the PyGoat application.  Acting as Paul, you will install the base template he developed.

1. From the NIM tab in the browser, click **Templates** from the left-side menu. There is one base template already installed - **F5 Global Default Base**.

    .. image:: ../images/nim-templates.png

    > Note: While **F5 Global Default Base** ships with NIM, it does not provide a complete configuration when executed. To accomplish this, we will be installing a custom base template of our own.

2. Click the **Create** button on the top right.

    .. image:: ../images/nim-templates-create-button.png
      :width: 576

   The Create Template form appears. The default option is to create a **New** template.  For this lab, we are going to import an existing template, so click the **Import** radio button.

    .. image:: ../images/nim-templates-create.png

3. Click **Browse** in the middle of the dialog to select the template file to import.

4. Select **basic_reverse_proxy_base.tar.gz** from the file browser then click **Open** at the bottom right of the dialog.

    .. image:: ../images/nim-templates-import-file.png

5. Click **Parse** at the bottom right

    .. image:: ../images/nim-templates-create-parse.png

   You will see a warning message similar to "archive is either unsigned or missing its signature file". This is a precautionary message, cautioning the user against importing templates that may have originated from an unofficial source. Since this is a custom template, it is not signed by F5. Check the box for **Allow Signature Bypass**, then click **Import** at the bottom of the page

    .. image:: ../images/nim-signature-bypass.png

   You should see a box at the bottom right showing that the template was successfully created. The newly imported base template appears on the **Templates** page.

    .. image:: ../images/nim-templates-created.png
      :width: 260

   Note: The newly imported base template will show a State of Draft. This simply means that the template can be edited in the NIM template editor. As the template author, you can mark a template as **Ready for Use** to prevent it from being unintentionally modified.


