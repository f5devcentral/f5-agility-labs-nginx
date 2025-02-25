Test the Rate Limiting Augment Template
=================

In this section of the lab, we will use the *hey* utility to test the efficacy of the rate limiting augment template that you just deployed.

1. In the UDF deployment, select the **Web Shell** access method of the **JumpHost** component.

   .. image:: ../images/nim-jumphost-webshell.png

2. In the Web Shell, run the following:

    
      hey -n 10 -c 1 -q 2 https://pygoat.f5demos.com/login/
    

   This will execute a total of `10` requests using `1` concurrent worker at a rate of `2` requests per second against the `https://pygoat.f5demos.com/login/` URL. You should see output similar to the following:

   .. image:: ../images/image-12.png
     :width: 650

   Notice that all 10 requests were successful with a status code of 200 observed. Let's try increasing the rate to see what happens...

3. In the Web Shell, run the following:

    
      hey -n 10 -c 1 -q 6 https://pygoat.f5demos.com/login/
    

   This will execute a total of `10` requests using `1` concurrent worker at a rate of `6` requests per second against the `https://pygoat.f5demos.com/login/` URL. If you recall, this rate is above the rate limiting threshold you set in the augment template. You should see output similar to the following:

   .. image:: ../images/image-13.png
     :width: 650

   Notice that the first requests were successful with a status code of 200 observed. Then, they started to receive status code 503 (Service Unavailable), indicating that this client has been rate limited for exceeding the threshold you set.


