Advanced WAF/ASM Policy Converter
=================================

Conversion tools in NGINX App Protect WAF
-----------------------------------------

The following section describes two tools available in the NGINX App Protect WAF compiler package. You can use them without a full installation of NGINX App Protect or NGINX Plus.

The BIG-IP Advanced WAF security policies conversion tool
---------------------------------------------------------

One of the fastest ways to create a security policy is to start by already having one configured on a BIG-IP Advanced WAF system. NGINX App Protect WAF provides a conversion tool, convert-policy, to convert security policies exported from BIG-IP Advanced WAF in XML format to JSON format, to use in NGINX App Protect WAF. If you used the default installation settings, the file is saved as /opt/app_protect/bin/convert-policy. 

.. warning:: F5 recommends using the convert-policy tool that comes with the NGINX App Protect WAF installation to convert and deploy the security policy to the same NGINX App Protect WAF installation. You should not use the convert-policy tool from a different NGINX App Protect WAF version to do so.

To perform the conversion, use the following command syntax:

.. code-block:: bash
   /opt/app_protect/bin/convert-policy -i <filename of exported policy>.xml -o <filename of new policy>.json | jq

You may observe output similar to the following, which displays a list of settings and entities that the tool removed, which are not supported on NGINX App Protect WAF.

.. code-block:: json   
   {
   "file_size": 21364,
   "completed_successfully": true,
   "warnings": [
      "Default header '*-bin' cannot be deleted.",
      [...]
      "Traffic Learning, Policy Building, and staging are unsupported",
      [...]
      "/blocking-settings/http-protocols/description value 'Bad host header value' is unsupported.",
      "/whitelist-ips/trustedByPolicyBuilder must be '0' (was '1').",
      "Element '/websocket-urls' is unsupported."
   ],
   "filename": "/root/nginx_base.json"
   }

The output file is based on the default security base template and is ready to use. You can retain all settings, saving them in the output file, including those not supported on NGINX App Protect WAF, by including the --keep-full-configuration switch. Note, however, that when you do so, the system reports unsupported features as errors when you attempt to load the resulting output policy into NGINX App Protect WAF and fail.

The user-defined signatures conversion tool
-------------------------------------------

When you have your own user-defined signatures in XML format, such as one exported from a BIG-IP Advanced WAF system, NGINX App Protect provides the user-defined signatures tool to convert your XML file to JSON format so you can incorporate the file into an App Protect security policy. If you used the default installation settings, the file is saved in /opt/app_protect/bin/convert-signatures. For more information, refer to User Defined Signatures Converter in the NGINX documentation.

.. code-block:: bash
   /opt/app_protect/bin/convert-signatures -i <filename of exported signatures>.xml -o <filename of new signature>.json | jq

The process of converting a WAF policy from XML to JSON is not yet covered in this lab. 