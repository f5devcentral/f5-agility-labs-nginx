Class 13 - Maximize ROI with F5 NGINX App Protect(NAP) using Observability
==========================================================================

Module 1: 

Get familiar/review the components in this F5 Unified Demotration Framework(UDF) environment. Realize that because different F5 Solution Engineers and Architects build these labs out, the blueprints will 
differ in products used between different labs(i.e. number of instances of guests, types of software/services etc.). 

We will explore the following:

- UDF locations to launch these services
- GitLabs console
- ArgoCD UI
- N+ instances shell
- Grafana dashboards for NAP

Module 2: 

You will launch a simulated attack on a “standard” or default policy NAP & observe telemetry\

- After each policy type flow has been completed. Have students answer the following questions for each policy type's behavior:
- What are some key insights? What is working well; not working well (false positives vs comprehensive coverage)?
- Students edit policy files and improve on the yaml to add future optimizations
- Observe new behavior: What changed?

Module 3: 

After using Module 2 above, we will dive deeper into some DoS attacks against NGNIX NAP

.. toctree::
   :maxdepth: 1
   :caption: Content:
   :glob:

   intro
   module*/module*
