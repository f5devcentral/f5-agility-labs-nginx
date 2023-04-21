Advanced WAF/ASM Policy Converter
=================================

Conversion tools in NGINX App Protect WAF
-----------------------------------------

The following section describes two tools available in the NGINX App Protect WAF compiler package.

.. note:: A hands-on example of converting BIG-IP WAF policies and user definied signatures is not yet included in this lab. 

The BIG-IP Advanced WAF security policies conversion tool
---------------------------------------------------------

One of the fastest ways to create a security policy is to start by already having one configured on a BIG-IP Advanced WAF system. The Policy Converter tool is used for converting XML formatted ASM and Advanced WAF policies to JSON. The converted JSON policy is based on the NGINX App Protect WAF policy base template and contains the minimal diff to it in JSON declarative policy format.

Elements in the XML policy that are not supported in the NGINX App Protect WAF environment will generate warnings. Note that any configuration that is invalid or irrelevant to the NGINX App Protect WAF environment is removed from the exported declarative policy. The conversion utility is installed alongside NGINX App Protect.

.. caution:: F5 recommends using the convert-policy tool that comes with the NGINX App Protect WAF installation to convert and deploy the security policy to the same NGINX App Protect WAF installation. You should not use the convert-policy tool from a different NGINX App Protect WAF version to do so.

The usage of the utility is as follows:

.. code-block:: text

   USAGE:
      /opt/app_protect/bin/convert-policy

   Required arguments:
      --outfile|o='/path/to/policy.json'
         File name for where to write exported policy.
         Can also be set via an environment variable: EXPORT_FILE
      --infile|i='/path/to/policy.xml'
         Advanced WAF/ASM Security Policy file to convert
         Can also be set via an environment variable: IMPORT_FILE

   Optional arguments:
      --format|f='json'
         Desired output format for signature file. Default 'json'
         Supported formats: 'json'
      --keep-full-configuration
         By default the exported policy will only contain elements that are valid for the environment in which this tool is run.
         If keep-full-configuration is enabled then the full configuration is retained, including elements that are not supported in NGINX App Protect WAF.
      --full-export
         By default the exported policy will only contain elements that are different from the default policy template.
         If full-export is enabled then all policy elements are included in the export file.
         When this option is selected, no warnings are generated when removing unsupported elements from the exported policy.

To perform the conversion, use the following command syntax:

.. code-block:: bash

  /opt/app_protect/bin/convert-policy -i /path/to/policy.xml -o /path/to/policy.json | jq

You may observe output similar to the following, which displays a list of settings and unsupported entities that the tool removed.

.. code-block:: text   

   {
      "warnings": [
         "Traffic Learning, Policy Building, and staging are unsupported",
         "Element '/plain-text-profiles' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_ASM_COOKIE_HIJACKING' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_BLOCKING_CONDITION' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_BRUTE_FORCE' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_CONVICTION' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_CROSS_ORIGIN_REQUEST' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_CSRF' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_CSRF_EXPIRED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_DYNAMIC_SESSION' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_FLOW' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_FLOW_DISALLOWED_INPUT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_FLOW_ENTRY_POINT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_FLOW_MANDATORY_PARAMS' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_GEOLOCATION' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_GRPC_FORMAT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_GRPC_METHOD' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_GWT_FORMAT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_GWT_MALFORMED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_HOSTNAME_MISMATCH' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_LOGIN_URL_BYPASSED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_LOGIN_URL_EXPIRED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_MALICIOUS_DEVICE' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_MALICIOUS_IP' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_PARAMETER_DYNAMIC_VALUE' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_PLAINTEXT_FORMAT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_REDIRECT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_SESSION_AWARENESS' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_VIRUS' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_BAD_REQUEST' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_BINARY_MESSAGE_LENGTH' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_BINARY_MESSAGE_NOT_ALLOWED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_EXTENSION' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_FRAMES_PER_MESSAGE_COUNT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_FRAME_LENGTH' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_FRAME_MASKING' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_FRAMING_PROTOCOL' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_TEXT_MESSAGE_NOT_ALLOWED' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_WEBSOCKET_TEXT_NULL_VALUE' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_XML_SCHEMA' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_XML_SOAP_ATTACHMENT' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_XML_SOAP_METHOD' is unsupported.",
         "/blocking-settings/violations/name value 'VIOL_XML_WEB_SERVICES_SECURITY' is unsupported.",
         "/blocking-settings/http-protocols/description value 'Unparsable request content' is unsupported.",
         "/general/enableEventCorrelation must be 'false' (was 'true').",
         "Element '/websocket-urls' is unsupported.",
         "/protocolIndependent must be 'true' (was 'false').",
         "Element '/redirection-protection' is unsupported.",
         "Element '/gwt-profiles' is unsupported.",
         "/signature-sets/learn value true is unsupported"
      ],
      "file_size": 24227,
      "completed_successfully": true,
      "filename": "/path/to/policy.json"
   }

The output file is based on the default security base template and is ready to use. You can retain all settings, saving them in the output file, including those not supported on NGINX App Protect WAF, by including the --keep-full-configuration switch. Note, however, that when you do so, the system reports unsupported features as errors when you attempt to load the resulting output policy into NGINX App Protect WAF and fail. If you used the default installation settings, the file is saved as /opt/app_protect/bin/convert-policy. 

Using the converter tool, let's now exapnd the *NginxDefaultPolicy.json* found on **NGINX-PLUS-1** instance. 

.. code-block:: bash 

   sudo /opt/app_protect/bin/convert-policy -i /etc/app_protect/conf/NginxDefaultPolicy.json -o view_base.json --full-export

   {"warnings":[],"completed_successfully":true,"filename":"/home/lab/view_base.json","file_size":35859}

You can open the file ``cat view_base.json`` to see all the settings of the *default* policy.

User Defined Signatures Converter
---------------------------------

The User Defined Signatures Converter tool takes a User Defined Signatures XML file as input and exports the content as a JSON file suitable for use in an NGINX App Protect WAF environment.

The tool can optionally accept a tag argument as an input. Otherwise, the default tag value user-defined-signatures is assigned to the exported JSON file.

Note that the User Defined signatures XML file can be obtained by exporting the signatures from a BIG-IP device.

The usage of the utility is as follows:

.. code-block:: bash

   USAGE:
      /opt/app_protect/bin/convert-signatures

   Required arguments:
      --outfile|o='/path/to/signatures.json'
         File name to write JSON format export
         Can also be set via an environment variable: EXPORT_FILE
      --infile|i='/path/to/signatures.xml'
         Advanced WAF/ASM User Defined Signatures file to Convert
         Can also be set via an environment variable: IMPORT_FILE

   Optional arguments:
      --tag|t='mytag'
         Signature Tag to associate with User Defined Signatures.
         If no tag is specified in the XML file, a default tag of 'user-defined-signatures' will be assigned.
         Can also be set via an environment variable: TAG
      --format|f='json'
         Desired output format for signature file. Default 'json'
         Supported formats: 'json'

To perform the conversion, use the following command syntax:

.. code-block:: bash

   /opt/app_protect/bin/convert-signatures -i /path/to/signatures.xml -o /path/to/signatures.json | jq

You may observe output similar to the following, which displays a list of settings and unsupported entities that the tool removed.

.. code-block:: json

   {
      "file_size": 1003,
      "filename": "/path/to/signatures.json",
      "completed_successfully": true
   }

An example of the contents of the output: 

.. code-block:: json

   {
      "signatures": [
         {
               "attackType": {
                  "name": "Buffer Overflow"
               },
               "name": "my_first_sig",
               "lastUpdateMicros": 1606014750000000,
               "rule": "content:\"first_sig\"; nocase;",
               "description": "This is the first user defined signature",
               "revision": "1",
               "systems": [
                  {
                     "name": "Microsoft Windows"
                  }
               ],
               "accuracy": "low",
               "signatureId": "300000002",
               "signatureType": "request",
               "risk": "low"
         },
         {
               "attackType": {
                  "name": "Command Execution"
               },
               "name": "my_second_sig",
               "lastUpdateMicros": 1606014818000000,
               "rule": "uricontent:\"second_sig\"; nocase; objonly;",
               "description": "Short description of the signature",
               "revision": "1",
               "systems": [
                  {
                     "name": "Unix/Linux"
                  }
               ],
               "accuracy": "medium",
               "signatureId": "300000003",
               "signatureType": "request",
               "risk": "medium"
         }
      ],
      "tag": "user-defined-signatures"
   }

Using these tools, you can easily migrate BIG-IP Advanced WAF and ASM configurations into NGINX App Protect. 