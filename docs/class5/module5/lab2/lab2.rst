BIG-IP User Defined Signatures Converter
========================================

**User-Defined Signature Definitions**
--------------------------------------

A useful expansion to the customization capabilities of NGINX App Protect is the ability to create user-defined signatures. This capability allows the user to define new signatures, configure how they behave in terms of enforcement, and categorize them in user-defined signature sets (using tags) for ease of management.

The process of creating and implementing a user policy that contains user-defined signatures is a three-fold process:

- Creating the user-defined signature definitions in separate JSON files.
- Adding the relevant references (names, tags, signature sets) to the user-defined signatures in the policy file.
- Adding the definitions and referencing the relevant policy file in the nginx.conf file.

The user-defined signature definition file is a JSON file where the signatures themselves are defined and given their properties and tags. The format of the user-defined signature definition is as follows:

.. code-block:: json

   {
      "name": "unique_name",
      "description": "Add your description here",
      "rule": "content:\"string\"; nocase;",
      "signatureType": "request",
      "attackType": {
         "name": "Buffer Overflow"
      },
      "systems": [
         {
               "name": "Microsoft Windows"
         },
         {
               "name": "Unix/Linux"
         }
      ],
      "risk": "medium",
      "accuracy": "medium"
   }

Here is a brief explanation about each of the above items in the signature definition:

- ``name`` - is the unique name to be given to the user-defined signature.
- ``description`` - is an optional item where you can add a human-readable text to describe the functionality or purpose of the signature.
- ``rule`` - is the rule by which the enforcement will be done. The rule uses Snort syntax: a keyword to look for in a certain context, such as URL, header, parameter, content, and optionally one or more regular expressions. For full details on how to create a rule and the possible permutations, check the `Rule Syntax <https://techdocs.f5.com/kb/en-us/products/big-ip_asm/manuals/product/asm-bot-and-attack-signatures-13-0-0/7.html#guid-797a0c69-a859-45cd-be11-fd0e1a975780>`_ page.
- ``signatureType`` - defines whether the signature is relevant to the request or the response.
- ``attackType`` - this field gives an indication of the attack type the signature is intended to prevent. This field is mostly useful for signature set enforcement and logging purposes. A full list of the available attack types can be found in the `Attack Types <https://docs.nginx.com/nginx-app-protect-waf/configuration-guide/configuration/#attack-types>`_ document.
- ``systems`` - is a list of systems (operating systems, programming languages, etc.) that the signature should be applicable for. Note that ``systems`` have the same meaning and use as ``server technologies`` although the overlap between both terms is not perfect. For more information, review the `Server Technologies <https://docs.nginx.com/nginx-app-protect-waf/configuration-guide/configuration/#server-technologies>`_ documentation.
- ``risk`` - defines the risk level associated with this signature. Possible values are: low, medium, high.
- ``accuracy`` - defines the accuracy level of the signature. Note that the value of this field contributes to the value of the `Violation Rating <https://docs.nginx.com/nginx-app-protect-waf/configuration-guide/configuration/#server-technologies>`_. Possible values are: low, medium, high.

While you can create signatures in your NGINX App Protect environment, many users migrating or augmenting existing BIG-IP WAF policies with NGINX App Protect need to convert their existing signatures.

**User Defined Signatures Converter**
-------------------------------------

For those that have Advanced WAF/ASM deployed on BIG-IP, the User Defined Signatures Converter tool takes a User Defined Signatures XML file, exported from a BIG-IP, as input and exports the content as a JSON file suitable for use in an NGINX App Protect WAF environment.

The tool can optionally accept a tag argument as an input. Otherwise, the default tag value user-defined-signatures is assigned to the exported JSON file.

.. note:: A hands-on example of converting user definied signatures is not yet included in this lab. 

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

Using this tool can help SecOps teams keep track of the signature sets in use by policies without the need to access production instances.
