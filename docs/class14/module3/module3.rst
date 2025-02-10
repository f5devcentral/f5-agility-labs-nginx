Configure NGINX Using a Template
================================

Paul has been interested in ways to make his job easier while enabling others in his organization to be self-sufficient. To this end, Paul has developed a base template for NIM to deploy proxy services for applications using his organizations preferred configuration practices. Paul is one of a few in his organization that is comfortable with NGINX configuration, so he wants to make it easy for others to be able to deploy their applications on NGINX.

Acting as Paul, you will first install the base template he developed. Then, you will test this template by actually deploying it to provide an HTTP proxy for the PyGoat application. The PyGoat application has already been installed on the workloads server for you.

**Import a Custom Base Template**

1. In the left navigation, click Templates.

2. Click the green + Create button in the upper right corner.

   At this point we have the choice to create a new base template from scratch, or to import an existing one. A template bundle has been created for you, so select Import.

3. Click Browse to browse the JumpHost's file system for the template we wish to import.

4. Select the basic_reverse_proxy_base.tar.gz file, and click Open.

5. Click the green Parse button in the lower right to scan and analyze the contents of this template bundle.

   Note: You will see a message similar to "archive is either unsigned or missing its signature file". This is a precautionary message, cautioning the user against importing templates that     may have originated from an unofficial source. Since this is a custom template, it is not signed by F5.

6. Check the Allow Signature Bypass checkbox to override the import dialog.

7. Below the checkbox, you should note that there was one template detected in a bundle, named Basic Reverse Proxy. While a template bundle can contain more then one template, we will be importing them one at a time in this lab.

8. Click the Import button.

   You will see the Config Template Created message, and see the newly imported base template on the Templates page.

   Note: The newly imported base template will show a State of Draft. This simply means that the template can be edited in NIM's template editor. As the template author, you can mark a         template as Ready for Use to prevent it from being unintentionally modified.


**Application 1 - Basic Proxy for Juice Shop**

1. In a new Firefox tab, enter **nginx.f5demos.com**, which is the hostname of the NGINX server. 

   You will see a generic **Welcome to nginx** page. 

   .. image:: ../images/image-welcome-nginx.png

   NGINX (**nginx.f5demos.com**) has not been configured to proxy traffic to any of our applications, and it is configured as a basic web server by default.

2. In the left navigation, click **Templates**.

3. At the right side of the **Basic Reverse Proxy** template there will be a `...` menu in the **Actions** column. Click that, then select **Preview and Generate**. This will present a series of input forms to collect information for the new NGINX HTTP proxy configuration deployment.

4. Select the **Publish to an instance** radio button.

5. In the instance dropdown menu, select **nginx.f5demos.com**. This is an NGINX Plus instance that we accessed earlier and is already managed by NIM.

6. Click **Next**.

7. In the **Choose Augments** view, click **Next**.

8. On the **HTTP Servers** view, click the **Add HTTP Servers** link. This will reveal a new form to collect server information.

9. Enter the following data in this section:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Listen Port
     - 8080
   * - Default Server
     - true

10. Scroll down to **Server Locations**

11. Enter the following data in this section (**workloads.f5demos.com:9000** is the host that contains one of our applications):

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Location Match Strategy
     - Prefix
   * - URI   
     - /
   * - Upstream Name
     - workloads.f5demos.com:9000

12. Click **Next**. This will show you a preview of the config generated from the templates. 

13. Click the filename dropdown (currently displaying `/etc/nginx/nginx.conf`) at the top of the screen. Click `/etc/nginx.mime.types` file. As a convenience, this base template also creates this file for you, and will publish it to the instance in addition to the main `nginx.conf` file.

14. Click the **Publish** button. If successful, you should see a message indicating so.

    .. image:: ../images/image-18.png

15. What did we just do? Based on the data we entered, we intend to configure an NGINX configuration file that:

    - Creates a new HTTP Server 
    - Listens on port 80 
    - Will be the default HTTP server
    - Creates a single location using the `/` path prefix
    - Ensure requests made to this location will pass traffic to a **Juice Shop** application running on the workloads.f5demos.com server

**Application 2 - PyGoat**

Let's configure NGINX with some additional parameters for the **PyGoat** application". 

1. In the left navigation, click **Templates**.

2. At the right side of the **Basic Reverse Proxy** template there will be a `...` menu in the **Actions** column. Click that, then select **Preview and Generate**. This will present a series of input forms to collect information for the new NGINX HTTP proxy configuration deployment.

3. Select the **Publish to an instance** radio button.

4. In the instance dropdown menu, select **nginx.f5demos.com**. This is an NGINX Plus instance that is already managed by NIM.

5. Click **Next**.

6. In the **Choose Augments** view, click **Next**.

7. On the **HTTP Servers** view, click the **Add HTTP Servers** link. This will reveal a new form to collect server information.

8. Enter the following data in this section:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Server Label
     - pygoat
   * - Listen Port
     - 443
   * - Default Server
     - true

9. Under **Server name**, click **+ Add item**.

10. Enter the following data:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Server name -> ITEM 1 -> Server name
     - pygoat.f5demos.com

11. In the **TLS Settings** section, enter the following data:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Enable TLS  
     - TRUE
   * - TLS Certificate Path   
     - /etc/ssl/certs/wildcard.f5demos.com.crt.pem
   * - TLS Keyfile Path
     - /etc/ssl/private/wildcard.f5demos.com.key.pem
   * - Redirect Port  
     - 80

12. In the **Server Locations** section, click the **Add Server Locations** link.

13. Enter the following data in this section:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Location Match Strategy
     - Prefix
   * - URI   
     - /
   * - Upstream Name
     - pygoat-upstream

Note: Do not enter any information into the **Proxy Headers** portion of the template form.

    That was a lot of data entry! But what did we just do? Based on the data we entered into the **HTTP Servers** template, we intend to:

    - Create a new HTTP Server called **pygoat.f5demos.com**
    - THis server should listen on port 443
    - Will be the default HTTP server
    - Will encrypt communications using TLS
    - Reference an existing certificate and key for TLS
    - Will redirect any HTTP traffic to HTTPS
    - Create a single location using the `/` path prefix
    - Requests made to this location will pass traffic to an upstream called **pygoat-upstream**
    - No Proxy Headers were configured

    But where is the upstream itself defined?

14. Click **Next**. You will be presented with a form to collect the details of the upstream server for the PyGoat application, which is hosted on the `workloads.f5demos.com` server.

15. In the **HTTP Upstreams** section, click the **Add HTTP Upstream Servers** link.

16. Enter the following data in this section:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Upstream Name
     - pygoat-upstream
   * - Load balancing strategy   
     - Round Robin

17. In the **Servers** section, click **+Add item**.

18. Enter the following data in this section:

.. list-table:: 
   :header-rows: 1

   * - **Item**
     - **Value**
   * - Host
     - workloads.f5demos.com
   * - Port 
     - 8000
   * - Down
     - False
   * - Backup
     - False

Note: Do not enter any information into the **Zone** portion of the template form.

    What did we configure in the **HTTP Upstreams** portion of the template?

    - An upstream that is configured with a Round Robin loan balancing strategy (unused now, but would be relevant if we had multiple upstream servers configured)
    - A single upstream server, located at `workloads.f5demos.com` on port `8000` was configured
    - This server was not set to **Down**
    - This server was not set as a **Backup** server
    - No Zones were configured

    > Note: the value `pygoat-upstream` was entered into both the **HTTP Servers** and **HTTP Upstreams** templates. Why? This unique identifier needed to match so the templating system could properly correlate these objects together even though they were configured on different pages of the template.

19. Click **Next**. This will show you a preview of the config generated from the templates.

20. Click the filename dropdown (currently displaying `/etc/nginx/nginx.conf`) at the top of the screen. Click `/etc/nginx.mime.types` file. As a convenience, this base template also creates this file for you, and will publish it to the instance in addition to the main `nginx.conf` file.

21. Click the **Publish** button. If successful, you should see a message indicating so.

    .. image:: ../images/image-18.png

22. Click the **Close and Exit** button.

23. Click **Template Submissions** in the left navigation.

    You should see that the **Basic Reverse Proxy** has been deployed to 1 instance:

    .. image:: ../images/image-19.png

24. Click on the **Basic Reverse Proxy** row. Details of the template submission appear.

25. At the right side of the **nginx.f5demos.com** row, there will be a `...` menu in the **Actions** column. Click that, then select **Edit Submission**.

    .. image:: ../images/image-20.png

    If we wanted to make changes to the submission, we could simply edit the values here, and publish configuration as we did before.

**Test the Deployed Configuration**

1. Back in the FireFox **Lab Links** tab, click on the **PyGoat Web Application** link once again. The application should load now:

    .. image:: ../images/image-21.png

