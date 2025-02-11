Security Hardening
##################
This section guides you in identifying and resolving common security mis-configurations. The goal is to identify mis-configurations that may expose security issues and apply appropriate resolutions where applicable. By following this guide, you will strengthen your understanding of secure configurations and enhance the overall security posture of your deployment.

========
Overview
========

You will use the following systems, already deployed in previous sections of the lab:

* Client System ("Locust Worker"): Runs client tests using the Web Shell. Usage: client <step_number>.
* NGINX Instance Manager or NGINX One: Used for editing NGINX configuration files located in /etc/nginx/conf.d/.
* NGINX Proxy: Data plane instance.
* Upstream Server: A Flask application which reflects headers after requests are proxied through NGINX.

In each step, you will run the client requests, observe results, modify the NGINX configuration and repeat the process. 
Configuration changes are recommended to be done on the NGINX Instance Manager system or NGINX One console.

* Insecure settings will have a comment above them starting with the UNSAFE keyword.
* Secure settings will have a comment above them starting with SAFE keyword.

=========
Lab Steps
=========
Each step has its number as the filename, preceeded by "lab". For example, the step 7 configuration file is /etc/nginx/conf.d/lab07.conf.

From within the UDF console:
* Open a browser and authenticate to the NGINX Instance Manager system or NGINX One console.
* Open a Web Shell to the Locust (Worker) system. This will login automatically as the root user.

Step 0
******
This step will test the connection the NGINX proxy and the upstream server.

#. From the Web Shell run the command: 'client 0'.
#. Observe the response includes "HTTP/1.1 200 OK".
#. If you do not see this, check the NGINX proxy and upstream server are running. If they are not, work with the lab proctors to resolve the issue.

Step 1
******
Using client-controlled values in the **return directive** can expose your system to HTTP response header injection attacks.

#. From the Web Shell run the command: 'client 1'
#. Observe the request includes an encoded request line.
#. Observe the response includes "INJECTED: TRUE" as an HTTP response header. The response code will be 301.
#. Modify the conf.d/lab01.conf configuration file to use the different variables and observe the results.
#. From Web Shell run the command: 'client 1'
#. Observe the response no longer includes the injected header.

Key Takeaways
-------------
* Using $uri and $document_uri can result in HTTP response header injection attacks.
* Using $request_uri is safe in most situations, however downstream/upstream interpretation of the request line can make it unsafe.

Step 2
******
Using client-controlled values in the **root or alias directives** can expose your system to directory traversal attacks.

#. From the Web Shell run the command: 'client 2'
#. Observe the response includes the contents of /etc/passwd.
#. Modify the conf.d/lab02.conf configuration file to use the different variables and observe the results.
#. From the Web Shell re-run the command: 'client 2'
#. Observe the response no longer contains the contents of /etc/passwd.

Key Takeaways
-------------
* Using client controlled values in the root or alias directives can result in directory traversal attacks.
* If you must use client controlled values in the root or alias directives, consider using a map to limit the possible values.

Step 3
******
Using client-controlled variables in configuration options used with **sub_filter** can expose your system to HTTP response content injection attacks.

#. From the Web Shell run the command: 'client 3'
#. Observe the response includes the content "Welcome to INJECTED=TRUE!".
#. Modify the conf.d/lab03.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 3'
#. Observe the response no longer displays "Welcome to INJECTED=TRUE!".

Key Takeaways
-------------
* Using client controlled values with the sub_filter directives can result in content injection attacks.
* Consider using a map to limit the possible values or use a static values.


Step 4
******
Using client-controlled variables in configuration options with **$ssl_server_name** can expose your system to HTTP request smuggling and HTTP response header injection attacks.

#. From the Web Shell run the command: 'client 4'
#. Observe the request includes "X-Injected: FALSE" HTTP request header.
#. Observe the response body includes "X-Injected":"TRUE", which is the http header our upstream server received.
#. Modify the conf.d/lab04.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 4'
#. Observe the response body no longer contains "X-Injected":"TRUE", indicating our upstream server did not recieve the injected header.

Key Takeaways
-------------
* Using client controlled variables in the ssl_server_name directive can result in HTTP request smuggling and HTTP response header injection attacks.
* Consider using a map to limit the possible values and reject requests with unknown Server Name Indicator values.


Step 5
******
Using client-controlled variables in configuration options with **server_tokens** can expose your system to HTTP response header injection attacks.

#. From the Web Shell run the command: 'client 5'
#. Observe the Server Name Indicator includes 'X-Injected: TRUE'
#. Observe the request header includes "X-Injected: FALSE".
#. Observe the response headers includes "X-Injected: TRUE" and the response body includes "X-Injected":"FALSE".
#. Modify the conf.d/lab05.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 5'
#. Observe the response header no longer includes "X-Injected: TRUE" and the response body no longer includes "X-Injected":"FALSE".

Key Takeaways
-------------
* Using client controlled variables in the server_tokens directive can result in HTTP response header injection attacks.
* Consider using a map to limit the possible values or use static values.


Step 6
******
Using client-controlled variables in configuration options with **regex negation** can expose your system to HTTP response header injection attacks.

#. From the Web Shell run the command: 'client 6'
#. Observe the response includes "X-Injected: TRUE".
#. Modify the conf.d/lab06.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 6'
#. Observe the response no longer includes "X-Injected: TRUE".

Key Takeaways
-------------
* Using client controlled variables in the rewrite directive with regex negation can result in HTTP response header injection attacks.
* Consider using a stricter regex which negates CRLF characters or avoid regex negation.


Step 7
******
**Open Proxy**
Allowing client-controlled variables with **proxy_pass** directive can enable attackers to utilize your system as an open proxy.

#. From the Web Shell run the command: 'client 7'
#. Observe the response includes content from "example.com".
#. Modify the conf.d/lab07.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 7'
#. Observe the response no longer includes content from "example.com".

Key Takeaways
-------------
* Using client controlled variables in the proxy_pass directive can result in Server Side Request Forgery attacks.
* Consider using a map to limit the possible destinations or use static values.
* Consider using restrictions such as a localhost only listen directive or access control directives (allow and deny).


Step 8
******
A **leading dot in the hostname** can allow an attacker to target specific configurations and access files directly.

#. From the Web Shell run the command: 'client 8'
#. Observe there are multiple requests and responses made in this step.
#. Observe the part 1 response includes "401 Authorization Required" as the client did not send the correct credentials.
#. Observe the part 2 response includes "secret.local SECRET LOCATION" as the client did send the correct credentials.
#. Observe the part 3 response includes "secret.local SECRET LOCATION" but the client did not send the correct credentials. Review the Host header in the part 3 request.
#. Modify the conf.d/lab08.conf configuration file to prevent this attack. You can add a "stub" default virtual server or check for valid hostnames.
#. From the Web Shell re-run the command: 'client 8'
#. Observe the part 3 response no longer includes "secret.local SECRET LOCATION".

Key Takeaways
-------------
* Using client controlled variables mixed with access controls can result in unauthoized content access.

Step 9
******
The classic **"off by slash"** misconfiguration allows an attacker to traverse directories upward by one level due to path normalization rules.

#. From the Web Shell run the command: 'client 9'
#. Observe the response includes "OFF BY SLASH SECRET"
#. Modify the conf.d/lab09.conf configuration file to prevent this attack.
#. From the Web Shell re-run the command: 'client 9'
#. Observe the response no longer includes "OFF BY SLASH SECRET"

Key Takeaways
-------------
* Forgetting to add a trailing slash to the location directive can result in directory traversal attacks.


Step 10
*******
In multi-tenant environments, **allowing symlinks** can enable users to create symbolic links to files outside their own directory, potentially exposing sensitive data to unauthorized parties.

Config file: /etc/nginx/conf.d/lab10.conf

#. From the Web Shell run the command: 'client 10'
#. Observe there are multiple requests and responses made in this step.
#. Observe the part 1 response includes "401 Authorization Required" as the client did not send the correct credentials.
#. Observe the part 2 response includes "tenant01.local SECRET LOCATION" as the client did send the correct credentials.
#. Observe the part 3 response includes "tenant01.local SECRET LOCATION" but the client did not send the correct credentials.
#. Observe the part 4 response includes "tenant02.local PUBLIC LOCATION" but the client did not send the correct credentials.
#. Observe the part 5 response includes the contents of /etc/passwd.
#. Modify the conf.d/lab10.conf configuration file to prevent this attack. Also experiment with different settings and observe the results.
#. From the Web Shell re-run the command: 'client 10'
#. Observe the part 3, 4, and 5 responses no longer include the contents as before.

Key Takeaways
-------------
* If you allow users to create symbolic links, consider using the disable_symlinks directive to prevent users from creating symbolic links to files outside their own directory.

=========================================
Congratulation, you've completed the lab!
=========================================

We hope you enjoyed it and would love to hear your feedback. The lab proctors will be providing you with information on how you can provide us your thoughts.

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

