Step 16 - A.WAF/ASM Policy Converter
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
#. Go to directory ``/home/ubuntu/awaf-policy``

   .. code-block:: bash

      cd /home/ubuntu/awaf-policy

#. You can see the ``sharepoint-awaf.xml`` policy file from A.WAF.
#. Now, execute de Docker run command to convert this XML policy to JSON Declarative policy

   .. code-block:: bash

      docker run --rm -v /home/ubuntu/awaf-policy/:/tmp/convert policy-converter:latest /opt/app_protect/bin/convert-policy -i /tmp/convert/sharepoint-awaf.xml -o /tmp/convert/sharepoint-nap.json | jq

   .. note:: Look at the command. You can notice the ``input`` and the ``output``

#. After few second, you can see the results. In YELLOW, the converter confirms what has been converted and what has NOT been converted (because not supported by NAP)

   .. code-block:: js
      :emphasize-lines: 2-29
 
        {
          "warnings": [
            "Default header '*-bin' cannot be deleted.",
            "Traffic Learning, Policy Building, and staging are unsupported",
            "Element '/methods/actAsMethod' is unsupported.",
            "Element '/plain-text-profiles' is unsupported.",
            "Element '/blocking-settings/web-services-securities' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_BLOCKING_CONDITION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_BRUTE_FORCE' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_CONVICTION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_CROSS_ORIGIN_REQUEST' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_CSRF' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_GEOLOCATION' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_HOSTNAME_MISMATCH' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_MALICIOUS_DEVICE' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_MALICIOUS_IP' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_SESSION_AWARENESS' is unsupported.",
            "/blocking-settings/violations/name value 'VIOL_XML_SCHEMA' is unsupported.",
            "Element '/session-tracking' is unsupported.",
            "/data-guard/lastSsnDigitsToExpose must be '4' (was '0').",
            "/data-guard/lastCcnDigitsToExpose must be '4' (was '0').",
            "/general/enableEventCorrelation must be 'false' (was 'true').",
            "/xml-profiles/followSchemaLinks must be 'false' (was 'true').",
            "Element '/deception-settings' is unsupported.",
            "Element '/behavioral-enforcement' is unsupported.",
            "/cookies/performStaging value true is unsupported",
            "Element '/brute-force-attack-preventions' is unsupported.",
            "Element '/gwt-profiles' is unsupported.",
            "/signature-sets/learn value true is unsupported"
          ],
          "file_size": 50199,
          "filename": "/tmp/convert/sharepoint-nap.json",
          "completed_successfully": true
        }

#. Look at the JSON policy generated

   .. code-block:: bash

      more sharepoint-nap.json

.. note:: Congratulations, you converted an XML ASM/AWAF policy to a Declarative NAP policy. You can assign this JSON policy to a NAP configuration.

