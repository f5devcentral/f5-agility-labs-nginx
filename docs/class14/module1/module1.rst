Understanding the NGINX Instance Manager solution
-------------------------------------------------

**Login to NIM**

In the first portion of the lab you will be masquerading as Paul Platops. Paul is a Platform Operator in charge of the NIM platform. In his organization, NIM is used by developers and security professionals responsible for the delivery and security of their web applications.

Begin by logging into NIM as Paul in the following steps. Paul has the NIM admin role assigned to him.

1. In the UDF deployment, select the **FireFox** access method of the **JumpHost** component.

    .. image:: ../images/image-15.png
      :width: 600

2. Under Lab Links, click the **NGINX Instance Manager** link to open NIM in a new tab.

    .. image:: ../images/nim-lab-links.png
   
3. Click **Sign In**. 

    .. image:: ../images/nim-signin.png
      :width: 600

4. You will be redirected to KeyCloak. When prompted for credentials, enter the following:
   
   | User: `paulplatops`
   | Password: `NIM123!@#`
   |

    .. image:: ../images/image-28.png
      :width: 600

   After Sign-In, you will see the NIM Dashboard.

    .. image:: ../images/nim-dashboard-general.png

**Viewing, Monitoring and Managing NGINX**

Here we will examine the default configuration of the NGINX server, and afterward generate a new one for the PyGoat application.

1. In FireFox, select the **Lab Links** tab then click **PyGoat Web Application**. This link uses a hostname record that references the NGINX instance.

    .. image:: ../images/nim-lab-links2.png

    Since NGINX has not yet been configured to proxy requests to the upstream server hosting the PyGoat application, you will see an **"Unable to connect"** page. To make this work, we need to generate NGINX configuration that meets our requirements

    .. image:: ../images/pygoat-no-connect.png

**Examine Default Configuration**

2. Back in the NIM tab, click the **Instances** link in the left navigation.  You will see that NIM is currently only managing one single NGINX Instance - **nginx.f5demos.com**.

    .. image:: ../images/nim-instances-general.png

    We won't be adding any more instances in this lab, we can do everything we need to with one instance.

    If you needed to add another instance of NGINX Plus or Open Source, click **Add** on the top right of the page.

    .. image:: ../images/nim-instances-add.png
      :width: 481

3. Click on **nginx.f5demos.com** and browse through some of the tabs, especially **Metrics**. Here you can see system level metrics or metrics specific to NGINX.

    .. image:: ../images/nim-instances-tabs.png

4. Go back to the **Instances** page.

    Click **nginx.f5demos.com**. Note that the instance Status is online, and ready to receive management commands from NIM.

    .. image:: ../images/nim-instances-details.png

5. Click **Edit Config** near the top right of the window.

    .. image:: ../images/nim-instances-edit.png
      :width: 400

You will see the NIM config editor, displaying the existing state of the NGINX configuration files in the instance. As a reminder, the configuration has not been customized for the application we will be hosting in this lab.

    .. image:: ../images/nim-instances-edit-detail.png

6. Feel free to check out other tabs. There are many other options in NIM such as Certificate Management and NGINX App Protect WAF management. 

    Today we are focusing on Templates.

7. Click the **Templates** tab. Note there is one base template listed, **F5 Global Default Base**

    .. image:: ../images/nim-templates.png

    > Note: While **F5 Global Default Base** ships with NIM, it does not provide a complete configuration when executed. To accomplish this, we will be installing a custom base template of our own.

8. Click the **Create** button on the top right.

    .. image:: ../images/nim-templates-create.png

The Create Template form appears. The default option is to create a **New** template.  For this lab, we are going to import an existing template, so click the **Import** radio button.

    .. image:: ../images/nim-instances-edit.png

9. Click **Browse** in the middle of the dialog to select the template file to import.

10. Select **basic_revrse_proxy_base.tar.gz from the file browser then click **Open** at the bottom right of the dialog

    .. image:: ../images/nim-templates-import-file.png

11. Click **Parse** at the bottom right

    .. image:: ../images/nim-templates-import-file.png

You will see a warning about template not being signed.  Check the box for **Allow Signature Bypass**, then click **Import** at the bottom of the page

    .. image:: ../images/nim-signature-bypass.png
