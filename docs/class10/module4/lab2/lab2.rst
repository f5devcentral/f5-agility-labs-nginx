Step 8 - Onboard as a Dev API
#############################

The goal of an Developer Portal is not only to provide with API Documentation. A Developer Portal offers the possiblity to ``try out`` the API directly from it.
It means the Developers will ask for API Keys from this portal, and use these keys to ``try out`` APIs. The Developer Portal will send request to the API Gateway with the API-KEY generated.

In this lab, ``Infrastructure`` and ``API`` teams will modify the NMS ACM configurations in order to:

   * ``Infra`` team action : Enalbe Authentication for developers on the Dev Portal with OIDC (Keycloak as Identity Provider) 
   * ``API`` team action : Enable API-Key authentication on the Sentence API proxy (so far, there is no authentication on the API Gateway). So that Developer can use the API-KEY created by the Developer Portal.



