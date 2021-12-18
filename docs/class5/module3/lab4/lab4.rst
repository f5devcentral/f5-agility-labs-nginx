Step 9 - Use External References to make your policy dynamic
############################################################

External references in policy are defined as any code blocks that can be used as part of the policy without being explicitly pasted within the policy file. This means that you can have a set of pre-defined configurations for parts of the policy, and you can incorporate them as part of the policy by simply referencing them. This reduces the complexity of having to concentrate everything into a single policy file.

A perfect use case for external references is when you wish to build a dynamic policy that depends on moving parts. You can have code create and populate specific files with the configuration relevant to your policy, and then compile the policy to include the latest version of these files, ensuring that your policy is always up-to-date when it comes to a constantly changing environment.

.. note :: To use the external references capability, in the policy file the direct property is replaced by “xxxReference” property, where xxx defines the replacement text for the property. For example, “modifications” section is replaced by “modificationsReference”.

In this lab, we will create a ``custom blocking page`` and host this page in Gitlab. 

.. note :: In this configuration, we are completely satisfied with the basic base policy we created previously ``/arcadia-waf-policy/policy_base.json``, and we wish to use it as is. However, we wish to define a custom response page using an external file located on an HTTP web server (Gitlab). The external reference file contains our custom response page configuration.

In the last step, this is the ajax policy we created:

.. code-block:: js

            {
                "name": "policy_name",
                "template": { "name": "POLICY_TEMPLATE_NGINX_BASE" },
                "applicationLanguage": "utf-8",
                "enforcementMode": "blocking",
                "response-pages": [
                        {
                            "responsePageType": "ajax",
                            "ajaxEnabled": true,
                            "ajaxPopupMessage": "My customized popup message! Your support ID is: <%TS.request.ID()%><br>You can use this ID to find the reason your request was blocked in Kibana."
                        }
                        ]
            }

Steps :

#.  RDP to ``jump host`` and connect to ``GitLab`` (root / F5twister$)
#.  Click on the project named ``NGINX App Protect / nap-reference-blocking-page``

    .. image:: ../pictures/lab5/gitlab-1.png
       :align: center
       :scale: 50%
       :alt: gitlab1



#.  Check the file ``blocking-custom-1.txt``

    .. code-block :: js

        [
            {
                "responseContent": "<html><head><title>Custom Reject Page</title></head><body><p>This is a <strong>custom response page</strong>, it is supposed to overwrite the default page for the <strong>base NAP policy.&nbsp;</strong></p><p>This page can be <strong>modified</strong> by a <strong>dedicated</strong> team, which does not have access to the WAF policy.<br /><br /></p><p><img src=https://media.giphy.com/media/12NUbkX6p4xOO4/giphy.gif></p><br>Your support ID is: <%TS.request.ID()%><br><br><a href='javascript:history.back();'>[Go Back]</a></body></html>",
                "responseHeader": "HTTP/1.1 302 OK\\r\\nCache-Control: no-cache\\r\\nPragma: no-cache\\r\\nConnection: close",
                "responseActionType": "custom",
                "responsePageType": "default"
            }
        ]

#.  This is a custom Blocking Response config page. We will refer to it into the ``policy_base.json``



#.  View our new policy file referencing the new blocking message on Gitlab.

    .. code-block:: bash

       cat /home/ubuntu/lab-files/external-reference-policy/gitlab-reference-policy.json

    .. code-block:: js

        {
            "name": "policy_name",
            "template": { "name": "POLICY_TEMPLATE_NGINX_BASE" },
            "applicationLanguage": "utf-8",
            "enforcementMode": "blocking",
            "responsePageReference": {
                "link": "http://10.1.1.7/ngnix-app-protect/nap-reference-blocking-page/-/raw/master/blocking-custom-1.txt"
            }
        }

    .. note :: You can notice the reference to the TXT file in Gitlab

#.  From the Docker VM, delete the running container with ``<ctrl-c>`` and test our new policy.

    .. code-block:: bash

            docker rm -f app-protect
            docker run --interactive --tty --rm --name app-protect -p 80:80 \
                --volume /home/ubuntu/lab-files/nginx.conf:/etc/nginx/nginx.conf \
                --volume /home/ubuntu/lab-files/external-reference-policy:/etc/nginx/conf.d \ 
                app-protect:04-aug-2021-tc

#.  In the ``jump host``, open the browser and connect to ``Arcadia Links>Arcadia NAP Docker`` bookmark

#.  Add this to the end of the URL to simulate an XSS attack ``?a=<script>``

#.  You can see your new custom blocking page

    .. image:: ../pictures/lab4/custom-blocking-page.png
       :align: center




**Video of this lab (force HD 1080p in the video settings)**

.. raw:: html

    <div style="text-align: center; margin-bottom: 2em;">
    <iframe width="1120" height="630" src="https://www.youtube.com/embed/gHaauG3E1kI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>

