Step 18 - A.WAF/ASM Policy Converter
####################################

What is the Policy Converter tool ?
***********************************

NGINX App Protect includes a number of tools that can be used to facilitate the process of porting existing resources or configuration files from the BIG-IP for use in the NGINX App Protect environment. 
Note that these tools are available in the compiler package, and do not require a full installation of NGINX App Protect or NGINX Plus.

.. note :: The goal here is to converter an XML policy for Sharepoint 2016 exported from an A.WAF to a Declarative NAP policy


Steps for the lab
*****************

First of all, the ``Sharepoint 2016 XML policy`` from A.WAF is already imported in the ``Docker App Protect + Docker repo`` machine.

This converter tool is not a bash or shell utility. It a docker image we will run with the XML policy as ``input`` and JSON policy as ``output``.

**Steps**

#. SSH to the docker VM

#. If you didn't build a docker image of app-protect in Module 3, then follow these steps to build a docker image of app protect:
   #. Change directory to ``cd /home/ubuntu/lab-files``

      .. note:: Feel free to replace the date with the current date, but be sure to be consistent or commands will fail.

   #. Run the command:

      .. code-block:: bash
       
         docker build --tag app-protect:04-aug-2021 .

      .. note:: There is a "." (dot) at the end of the command (which is an alias for ``$PWD`` current directory). This tells docker the that the resources for building the image are in the current directory.

      .. note:: By default, when you run the docker build command, it looks for a file named ``Dockerfile`` in the current directory. To target a different file, pass -f flag.

#. Go to directory ``/home/ubuntu/lab-files/awaf-policy``

   .. code-block:: bash

      cd /home/ubuntu/lab-files/awaf-policy

#. You can see the ``sharepoint-awaf.xml`` policy file from A.WAF.
#. Now, execute de Docker run command to convert this XML policy to JSON Declarative policy

   .. code-block:: bash

      docker run --rm -v /home/ubuntu/lab-files/awaf-policy/:/tmp/convert app-protect:04-aug-2021 /opt/app_protect/bin/convert-policy -i /tmp/convert/sharepoint-awaf.xml -o /tmp/convert/sharepoint-nap.json|jq

   .. note:: Look at the command. You can notice the ``input`` and the ``output``

#. After few second, you can see the results. In the output, the converter confirms what has been converted and what has NOT been converted (because not supported by NAP). The policy json file will be in the ``/home/ubuntu/lab-files/awaf-policy`` directory.

   .. code-block:: js
 
         {
         "warnings": [
            "Default header '*-bin' cannot be deleted.",
            "Traffic Learning, Policy Building, and staging are unsupported",
            "Element '/methods/actAsMethod' is unsupported.",
            "Element '/plain-text-profiles' is unsupported.",
            "/csrf-urls/enforcementAction value 'verify-csrf-token' is unsupported.",
            "Element '/blocking-settings/web-services-securities' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_BLOCKING_CONDITION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_BRUTE_FORCE' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_CONVICTION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_CROSS_ORIGIN_REQUEST' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_GEOLOCATION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_HOSTNAME_MISMATCH' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_MALICIOUS_DEVICE' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_MALICIOUS_IP' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_SESSION_AWARENESS' is unsupported.",
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
            "Element '/session-tracking' is unsupported.",
            "/data-guard/lastSsnDigitsToExpose must be '4' (was '0').",
            "/data-guard/lastCcnDigitsToExpose must be '4' (was '0').",
            "/general/enableEventCorrelation must be 'false' (was 'true').",
            "/xml-profiles/followSchemaLinks must be 'false' (was 'true').",
            "Element '/websocket-urls' is unsupported.",
            "Element '/deception-settings' is unsupported.",
            "Element '/behavioral-enforcement' is unsupported.",
            "/character-sets/characterSetType value 'plain-text-content' is unsupported.",
            "/cookies/performStaging value true is unsupported",
            "Element '/brute-force-attack-preventions' is unsupported.",
            "Element '/gwt-profiles' is unsupported.",
            "/signature-sets/learn value true is unsupported"
         ],
         "file_size": 50137,
         "filename": "/tmp/convert/sharepoint-nap.json",
         "completed_successfully": true
         }

#. Look at the JSON policy generated

   .. code-block:: bash

      cat /home/ubuntu/lab-files/awaf-policy/sharepoint-nap.json 

.. note:: Congratulations, you converted an XML ASM/AWAF policy to a Declarative NAP policy. You can assign this JSON policy to a NAP configuration.

