Permissions Validation
==================================

We are now going to log in as Jane Developer so that we can verify she has access to update the template submission.

1. Click the person icon in the top right corner, then click the **Logout** link.

   .. image:: ../images/image-24.png
     :width: 600

2. Click **Sign In**. You will be redirected to KeyCloak. When prompted for credentials, enter the following:
   
   | User: `janedev`
   | Password: `NIM123!@#`

3. You are presented with the NIM Overview Dashboard showing the metrics of the **nginx.f5demos.com** instance. Jane is able to see this information because we added access to do so via the developer role.

   Note: The Certificates panel is not loading any data. Why? If you hover over the red diamond icon, you will see that access has been denied. Access to view certificate data has not been granted to the developer role. This is not something we will address at this time, but you are welcome to come back to this after completing the lab to resolve this issue.

   .. image:: ../images/image-25.png


