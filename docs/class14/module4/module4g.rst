Apply the Rate Limiting Augment Template
===================

Sally Secops has noticed that the PyGoat application's login API has been overused by actors with questionable intent, also resulting in degraded application performance. Sally would like to attach rate limiting to the NGINX configuration or the PyGoat application's NGINX HTTP Server. We (as Sally Secops) will use the augment template that Paul just imported to accomplish this.

#. Click the person icon in the top right corner, then click the **Logout** link.

#. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter the following:

   | User: `sallysecops`
   | Password: `NIM123!@#`

#. Click **Template Submissions** in the left navigation.

#. Click on the **Basic Reverse Proxy** row. Details of the template submission appear.

#. At the right side of the **nginx.f5demos.com** row, there will be a `...` menu in the **Actions** column. Click that, then select **Edit Submission**.

   You should see the familiar template filled with values similar to what you saw earlier.

#. Click **Next** to transition to the **Choose Augments** view. Note the **Custom 404 Response** augment template that Jane used on this template submission is still selected.

   .. image:: ../images/image-7.png

#. Click the checkbox on the **Rate Limiting** row. When you do, the template form builder will add a new step indicating there is an additional form needed to capture inputs for this new augment template.

   .. image:: ../images/image-8.png

#. Click the **Next** button until you reach the **Rate Limiting** input step and enter the following:

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

#. Click **Next**. You will be presented with the diff view showing the changes that would happen to the nginx.conf file if the changes were to be published.

   Notice that there are two changes in the diff editor: one in the http context, and one in the server context. Since the Rate Limiting template needs to insert directives into both contexts, this template emits two different include statements as pictured below.

   .. image:: ../images/image-10.png

    In addition to the changes to `nginx.conf`, there are 2 new files in the generated configuration:

    - /etc/nginx/augments/http-server/base_http-server1_*&lt;unique identifier&gt;*.conf
    - /etc/nginx/augments/http/*&lt;unique identifier&gt;*.conf

#. Click on each of these new files. They are files that will be included in the main `nginx.conf` file at the `http` and `server` contexts.

   .. image:: ../images/image-11.png

#. Click the **Publish** button. If successful, you should see a message indicating so.

