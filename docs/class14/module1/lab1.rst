Understanding the NGINX Instance Manager solution
----

### Login to NIM

In the first portion of the lab you will be masquerading as Paul Platops. Paul is a Platform Operator in charge of the NIM platform. In his organization, NIM is used by developers and security professionals responsible for the delivery and security of their web applications.

Begin by logging into NIM as Paul in the following steps. Paul has the NIM admin role assigned to him.

1. In the UDF deployment, select the **FireFox** access method of the **JumpHost** component.

    .. image:: ../images/image-15.png

2. Under Lab Links, click the **NIM** link to open NIM in a new tab.

    .. image:: ../images/image-26.png

3. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter `paulplatops` as the user, `NIM123!@#` as the password.

    .. image:: ../images/image-28.png

4. Click the **Instance Manager** tile.

   .. image:: ../images/image-14.png

    If you are familiar with NIM, things may seem typical to you, with the addition of **Templates** and **Template Submissions** links in the left navigation:

    .. image:: ../images/image-16.png

5. Click the **Templates** link. Note there is one base template listed, **F5 Global Default Base**

    > Note: While **F5 Global Default Base** ships with NIM, it does not provide a complete configuration when executed. To accomplish this, we will be installing a custom base template of our own.


### Viewing, Monitoring and Managing NGINX

Here we will examine the default configuration of the NGINX server, and afterward generate a new one for the PyGoat application.

1. In FireFox, click the **PyGoat Web Application** link. This link uses a hostname record that references the NGINX instance.

    .. image:: ../images/image-27.png

    Since NGINX has not yet been configured to proxy requests to the upstream server hosting the PyGoat application, you will see an **"Unable to connect"** page. To make this work, we need to generate NGINX configuration that meets our requirements.

### Examine Default Configuration

2. Back in the NIM tab, click the **Instances** link in the left navigation.

    .. image:: ../images/image-17.png

3. Select **nginx.f5demos.com**. Note that it is online, and ready to receive management commands from NIM.

4. Click **Edit Config** near the top right of the window.

You will see the NIM config editor, displaying the existing state of the NGINX configuration files in the instance. As a reminder, the configuration has not been customized for the application we will be hosting in this lab.