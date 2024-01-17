Module 5 - Reporting and Monitoring NAP DoS using ELK Stack
###########################################################

1. Go to "ELK" VM, navigate to "Access" and select "KIBANA"

.. image:: access-kibana.jpg

2. Navigate to Kibana > Dashboards > click on the "AP_DOS: AppProtectDOS" link

.. image:: access-dashboard1.jpg

Once the attack begins the NGINX App Protect Dos will switch into attack mode due to the server health deteriorating - almost immediately. ( Dashboard : AP_DOS: Server_stress_level )

That’s why BaDoS first mitigates with a global rate limit just to protect the server. (Dashboard: AP_DOS: HTTP mitigation, Global Rate will marked Red)

During this time Behavioral DoS identifies anomalous traffic and generates Dynamic Signatures matching only the malicious traffic. (Dashboard: AP_DOS: HTTP mitigation, Signatures will marked Purple)

It might take a few moments for a dynamic signature(s) to generate, but shortly after the attack has been detected a signature should be created.

Dynamic Signatures will be displayed in (Dashboard:AP_DOS: Attack signatures)

Once mitigation is in effect, the server health will rapidly improve and application performance will return to normal. ( Dashboard : AP_DOS: Server_stress_level returns to value 0.5)

After a few minutes, you will begin to see transactions being mitigated with Blocked Bad Actor. (Dashboard: AP_DOS: HTTP mitigation, Bad Actors will marked Yellow)

Bad Actors IPs will be listed in (Dashboard: AP_DOS: Detected bad actors)