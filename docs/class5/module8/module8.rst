Module 8 - Establishing Application Traffic Baseline
####################################################

NGINX App Protect DoS is based on learning and analyzing all traffic to the web application. 
It builds baselines for what traffic should look like and identifies anomalies when server stress is detected.

Establish Baseline
------------------

1. Open WebShell to the 'legitimate traffic VM' (UDF > Components > Systems > legitimate traffic > Access > Web Shell)

2. Run the good traffic script

.. code:: shell

    ./good.sh 

3. Allow good traffic to run for 10 to 20 minutes 

4. Click **Kibana** on the Access pulldown on the ELK VM (UDF > Components > Systems > elk > Access > Kibana)

.. Note::

    - Contrary to the lab topology image and the description of the environment, the Kibana server IP address is 10.1.1.20.
   

.. image:: ../../_static/class5_module8_elk_homepage.jpeg


5. Click the menu button in the upper left corner ( button with 3 horizontal lines)

6. Under **Analytics** click **Discover** (second option down)

.. image:: ../../_static/class5_module8_kibana_search.png


7. Under Available Fields, Click the word **learning_confidence** 
8. Under the **Multi fields** section, Click the '+' button to the right of learning_confidence.keyword. 
9. Also add **vs_name** and **unit_hostname** as additional filters

.. Note::

    After 15 minutes of running good (creating a baseline) traffic, there will be "Ready" and "Not ready" states indicated. Find a row indicating a "Ready" state, then filter for that word by moving your cursor to the far right side of the window and select "+." 

10. Wait until learing confidence is **Ready** 

.. image:: ../../_static/class5_module8_kibana_ready.png 


