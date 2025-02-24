Test the Rate Limiting Augment Template
=================

In this final section of the lab, we will use the hey utility to test the efficacy of the rate limiting augment template that you just deployed.

1. In the UDF deployment, select the **Web Shell** access method of the **JumpHost** component.

   .. image:: ../images/nim-jumphost-webshell.png

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




