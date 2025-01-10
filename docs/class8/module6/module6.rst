Security Hardening Techniques and Best Practices
################################################

This section guides you in identifying and patching common security vulnerabilities. You are encouraged to modify configurations from an insecure state to a secure state.

===================================
General goals and learning outcomes
===================================

* Identify mis-configurations which may expose security issues.
* Identify and apply resolution for mis-configurations where applicable.

========
Overview
========

You will use the following systems, already deployed in previous sections of the lab:

* Client System ("Locust Worker") - Contains the "~/appworld2025/client.py" script, which will run the tests for you. All it does is make the request and return the response. It takes number of the step in this guide as an argument. For example, Step 7 is "/appworld2025/client.py 7".
* NGINX Proxy - Each step in this guide is designed to help you identify mis-configurations that may result in undesired security implications for your deployment. Given that, configurations will start off in an insecure state. Each step will be available to the client instance on a different port. For example, step 7 is listening on TCP port 87 and 4437.
* Upstream Server ("App Server") - Contains a python application written in Flask that reflects the headers as observed after the request has proxied through NGINX to the upstream. This will allow you to monitor headers that may have been smuggled past the proxy.

In each step, you will run the client requests for the lab, observe results, modify the NGINX configuration and repeat the process. Configuration changes are done on the NGINX Instance Manager system. Each step has its number as the filename, preceeded by "lab". For example, the step 7 configuration file is /etc/nginx/conf.d/lab07.conf.

* Insecure settings will have a comment above them starting with the UNSAFE keyword.
* Secure settings will have a comment above them starting with SAFE keyword. There are also map configuration directives which can be used to secure the configuration. These are located in /etc/nginx/nginx.conf

=========
Lab Steps
=========

0. **Connectivity Test**

This step tests for basic connectivity to the NGINX Proxy. Estimated time: under 5 minutes.
Configuration file: /etc/nginx/conf.d/lab00.conf

* From locust worker (client) run the command: ./client.py 0.
* Success will show as below. If this is not the case troubleshoot why or ask a lab helper.

|
|

1. **$uri vs $document_uri vs $request_uri vs ?**

This step will show you the differences between commonly used variables and how misuse can result in security impact. Estimated time: 10 minutes.

$uri and $document_uri represent the normalized form of the request uri. This sounds positive, however normalized means it will interpret special characters instead of representing them only as a string. When used in certain configurations, security issues can be exposed. One of those is http response injection, sometimes used in cache poisoning attacks.

Config file: /etc/nginx/conf.d/lab01.conf

* Overall procedures

From locust worker (client) run the command and observe the results.

Modify the configuration to use the different variables and observe the results.

* $uri and $document_uri

From locust worker (client) run the command: './client.py 1'

Observe the response includes "INJECTED: TRUE" as an HTTP response header.

* $request_uri

From locust worker (client) run the command: './client.py 1'

Observe the response no longer includes the injected header.

|
|

2. **client controlled variables directory traversal**

This lab will show you how client controlled HTTP headers can result in Path Traversal. Estimated time: 5 minutes.

Config file: /etc/nginx/conf.d/lab02.conf

From locust worker (client) run the command: './client.py 2'

Observe the results. You should see the contents of /etc/passwd file. Due to the use of a client controlled variable, the attacker can basically request any file nginx worker processes can read. Luckily, the worker processes don't run as root normally.

Bonus question: Can you think of a way that /etc/shadow (only readable by root) could be exposed with this configuration ?

Bonus answer: Run 'master_process off;' or 'user root' make this issue worse.

|
|

3. **client controlled variables with sub_filter**

This lab shows sub_filter replacement with client controlled variables. Estimated time: 5 minutes. Config file: /etc/nginx/conf.d/lab03.conf

From locust worker (client) run the command: './client.py 3'

Observe the results. You should observe "INJECTED=TRUE" in places on the page. There really is no safe way to change this other than using pre-defined, static variables for sub_filter. One can write a map that only allows alphanum characters.

|
|

4. **client controlled variables with Server Name Indicator**

This lab will show you how ssl_server_name misuse can result in HTTP Request Smuggling. ssl_server_name is a variable that contains the value passed in Server Name Indicator. This value is most likely to be a hostname, however the purpose of it is to locate a certificate to use for the client, so hostnames are not always gaurenteed. If one uses the hostname is an upstream request, http request smuggling can occur. Estimated time: 5 minutes. Config file: /etc/nginx/conf.d/lab04.conf

From locust worker (client) run the command: './client.py 4'

Observe the response includes "INJECTED: TRUE", even though the HTTP request header set this to FALSE..... this is b/c the ssl_server_name can contain many different characters in their raw form.

Modify the configuration on the mangment device to take action if the '$contains_ctrl_chars' variable is true. You can do this be uncommenting one of the desired "return" lines in the configuration just below this check.

Bonus: Observe the contains_ctrl_chars map in /etc/nginx/nginx.conf.

|
|

5. **client controlled variables with server_tokens**

Content injection when using server_tokens variable. Normally, this is not client controlled but it's possible to configure nginx to use a client controlled variable in the response. Estimated time: < 5 minutes. Config file: /etc/nginx/conf.d/lab05.conf

From locust worker (client) run the command: './client.py 9'

Observe the results. You should observe an HTTP response header injected. This will be due to unsafe use of server_tokens.

Modify configuration to SAFE option and re-test.

|
|

6. **client controlled variables and regex negation**

This lab will show you how regex negation can expose HTTP response injection, useful for cache poisoning. Config file: /etc/nginx/conf.d/lab06.conf

From locust worker (client) run the command: './client.py 2'

Observe the response includes "INJECTED: TRUE" as an HTTP response header.

Review the configuration on the management system (NIM)

Modify the configuration to use a SAFE directive and retest. The results will be different. The response should be 404 not found.

|
|

7. **Client controlled variables with an Open Proxy**

This lab shows how configuration can allow for a basic open proxy. Config file: /etc/nginx/conf.d/lab07.conf

From locust worker (client) run the command: './client.py 6'

Observe the results. You should see content from "example.com". Why did this work ?

TODO: make a map for checking hostnames that are valid.

TODO: make a directive that restricts the listener to 127.x network only.

|
|

8. **Client controlled variables and leading dot hostname**

This lab shows how client controlled variables and a leading dot hostname can lead to un-authorized access. Config file: /etc/nginx/conf.d/lab08.conf

|
|

9. **Off by slash**

Directory traversal is possible when a classic mis-configuration called 'off by slash' is present. When locations are defined, the trailing slash missing can create situations where an attacker can traversal one directory up from the alias/root. This doesn't require any use of client controlled variables in the configuration and < TODO CHECK > when "merge_slashes on" (default) is set in the configuration context, only one directory traverse up is possible. When "merge_slashes off" (non-default), it's possible to access other files. Config file: /etc/nginx/conf.d/lab09.conf

|
|

10. **Using disable_symlinks**

When setups are supporting multi-tenancy use case, file system symlink creation may allow nginx to access files outside a tenant webroot. This lab shows how to mitigate this from occuring. Config file: /etc/nginx/conf.d/lab10.conf

|
|

=========================================
Congratulation, you've completed the lab!
=========================================

We hope you enjoyed it and would love to hear your feedback. The lab proctors will be providing you with information on how you can provide us your thoughts.

.. toctree::
   :maxdepth: 2
   :hidden:
   :glob:

