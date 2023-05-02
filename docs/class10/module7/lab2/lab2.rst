Step 12 - JWT authorization
###########################

In this lab we will configure our services to use JSON Web Tokens (JWTs) to authenticate requests.

.. note ::
   JSON Web Tokens (JWT) are an open, industry standard RFC 7519 method for representing claims securely between two parties. 

   OpenID Connect (OIDC) is an identity layer built on top of the OAuth 2.0 framework. It allows third-party applications to verify the identity of the end-user and to obtain basic user profile information.
   
   OAuth (short for "Open Authorization"[1][2]) is an open standard for access delegation, commonly used as a way for internet users to grant websites or applications access to their information on other websites but without giving them the passwords.
   
   OAUTH with OIDC issues JWTs for authentiction requests that your applications can leverage for authentication and authorization purposes. 
   
   In the following labs, Keycloak is already configured to issue JWT tokens for developers.

Add JWT Policy on API-Proxy
===========================

#. Edit the ``API-Proxy`` ``v2`` instance like previously (we will enable JWT auth only on version 2; version 1 will remain configured with API Key authentication)
#. In ``Policies``, ``remove`` both the **APIKey** and the **Rate Limit** polices.  Click ``Save and Publish`` after both policies have been removed.  
#. Add a new ``JSON Web Token Assertion`` policy
#. For JWKS Sets, choose ``Enter JSON Web Key Sets (JWKS)`` and paste the JSON below.

   .. note :: You can retrieve this JWKS from the Keycloak endpoint http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/certs

   .. code-block :: JSON

    {
        "keys": [
            {
            "kid": "7lVSKvEvLfUPne72Jjm_J0qKtokfhxozDLaFvGqvoO4",
            "kty": "RSA",
            "alg": "RS256",
            "use": "sig",
            "n": "uoiH5jIEuFaKjRMZB-8V17ay7tvv6EPPj_9synlFUgJ7FqD39lQ9Mw_6yM3rTIMKo-7G1m2gD3-pz_jg--J0kaikYIy_YMKWge2RJ9NaEzG76gtlb7Hlnc5hbI3ps3-xiMwOJR8Bv1mEFvKsZcyAvfE5UlIcmAwmT1ZkNfPyDxs2V2ry-GEPF4C6KBMuf2OniqpWxw5Dt53Jpzm2udZNj3F4DSA9QmIQg9YQ_B2nKjCTiB-DFrnaHC0OGRX0ejZYCA4hXeuJ1lhTL7rAaZabWU2hObMHg6jEtY_tFECpevpTcTvht1cKB-IHLtBW3jEu14KSqLpNq8BqFPZcwyPwuw",
            "e": "AQAB",
            "x5c": [
                "MIICoTCCAYkCBgGD6eoPGjANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAlkZXZwb3J0YWwwHhcNMjIxMDE4MDcwNDM0WhcNMzIxMDE4MDcwNjE0WjAUMRIwEAYDVQQDDAlkZXZwb3J0YWwwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQC6iIfmMgS4VoqNExkH7xXXtrLu2+/oQ8+P/2zKeUVSAnsWoPf2VD0zD/rIzetMgwqj7sbWbaAPf6nP+OD74nSRqKRgjL9gwpaB7ZEn01oTMbvqC2VvseWdzmFsjemzf7GIzA4lHwG/WYQW8qxlzIC98TlSUhyYDCZPVmQ18/IPGzZXavL4YQ8XgLooEy5/Y6eKqlbHDkO3ncmnOba51k2PcXgNID1CYhCD1hD8HacqMJOIH4MWudocLQ4ZFfR6NlgIDiFd64nWWFMvusBplptZTaE5sweDqMS1j+0UQKl6+lNxO+G3VwoH4gcu0FbeMS7XgpKouk2rwGoU9lzDI/C7AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAJISxPKqs1K2HrJ1GU00lavJM2LF1Dz1hvEs2FFkcmhq27SM7ziWh3NVM1J5U4zAPdOfJwkEf9ovF+O4Z5p/61rHlOP3k17VM54xWoz2XSWQRguDaqFIk6RMPni+zIZ2PRMUz2ZsPhNSBQciNjlfTajXI+HL2sNlvdPXlqfj1yDh7dOFgZBbWgp/jXQBEMJvZeLL+shMgAe478VFef1R53x22ZdPtSZtHIrNMrwPjuGMlVFoBeSQAh62JlxQXgg43GAzTf/n4y/dKzuraPAQ3TvD+g+BBoRaFnimHM6IWgXesUlPmVrQQzBKc4mxMhXaN1mywlnHhoa/ZaocLhjKgdY="
            ],
            "x5t": "FUc7qc4WAUbfI5rWJDI2P7VjLtc",
            "x5t#S256": "RLJDJ2UtPIGUVaUy5sszwVaKIVjusnMhVlNYnNEmgDw"
            },
            {
            "kid": "X5tnnuP61grNvVl6XKmo1wyfDul_tjBo4IYrsrlh778",
            "kty": "RSA",
            "alg": "RSA-OAEP",
            "use": "enc",
            "n": "rBkzP0h19c58RApzgGJGb8kJxSH4ZNxv3gjxRKFirxgp91EK-ectweYhMGa2FSQdk8bKkKidH_D-vkemjv2cjgeO7zmGH-tOsYCuJZ9Sugie6TDO4_Hq2QsjDiGz2wB54YlM4TzE9NEzZ7ULf3c8JLBc6IXNG0SgO3v2_Vqec6CzcH76EYgpRivHRjSP7yyWnQXkt-ca08tckwXV-CmYI0BvimEQrMkcWSU82K8889Rhl7Vf_3wYzMu2VLRshmUPVfrq3sWFEpTkiGRmuJskNhlvsJKbptNdDXSfJFv9TR9mFoPpBCYAEISiCl7mYKNf4yvffmjGNfJkk1UhswnJmw",
            "e": "AQAB",
            "x5c": [
                "MIICoTCCAYkCBgGD6eoQJDANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAlkZXZwb3J0YWwwHhcNMjIxMDE4MDcwNDM0WhcNMzIxMDE4MDcwNjE0WjAUMRIwEAYDVQQDDAlkZXZwb3J0YWwwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCsGTM/SHX1znxECnOAYkZvyQnFIfhk3G/eCPFEoWKvGCn3UQr55y3B5iEwZrYVJB2TxsqQqJ0f8P6+R6aO/ZyOB47vOYYf606xgK4ln1K6CJ7pMM7j8erZCyMOIbPbAHnhiUzhPMT00TNntQt/dzwksFzohc0bRKA7e/b9Wp5zoLNwfvoRiClGK8dGNI/vLJadBeS35xrTy1yTBdX4KZgjQG+KYRCsyRxZJTzYrzzz1GGXtV//fBjMy7ZUtGyGZQ9V+urexYUSlOSIZGa4myQ2GW+wkpum010NdJ8kW/1NH2YWg+kEJgAQhKIKXuZgo1/jK99+aMY18mSTVSGzCcmbAgMBAAEwDQYJKoZIhvcNAQELBQADggEBAKT9yLU9LL3lBWkimcohu9Bc/EsNtRi7FAPiaH3vttOCvuXShA4LD4qoIx4qPMWE9EIOywC7p+NH+piekD/YVg9mcoTWPG1rug2mzHfRdRRhJli6UnaX3uKGLis1Nqsob2k5elha67cEbPekLC8cHaB7poiV2T5uTEpwcOLM84U+eRBUCrKWAMnGmFt9vvl3MAb/vK5ObSZI0USUi0AjBDNw6FTpf3qzSK3E3wwbnMcgphIxfTJaGLWMAndNu7jxVw1FjGAPtx+dBY6nmoTrJDVkCmktIyItnF/RBt6MKwTmfPzAkbAqIOxiBG7ITON8DG0CypdEAHXOo5ageRzIZRA="
            ],
            "x5t": "hWnR0Dd0ovR_DrHIln2NDsMmdnE",
            "x5t#S256": "_NO4MyR8k8d6sIcRg2tK5NvJTY39DcvbiNtVgZ8ZzWg"
            }
        ]
    }

#. Click ``Add``
#. Click ``Save and Publish``


Check what happened in the Dev Portal
=====================================

#. In the Dev Portal, check what happened for the API Key on Version 2
#. As you can see, as the API Key policy has been deleted, the API Key for Version 2 has been removed from the Dev Portal, and a warning is displayed

   .. image:: ../pictures/lab2/key-deleted.png
      :align: center


Test JWT auth out with Postman
==============================

#. In Postman, select the call ``GET Colors`` and check the version is ``v2`` http://api.sentence.com/v2/api/colors
#. In Authorization, select type ``OAuth 2.0``

   .. note :: As you can notice, the Postman OAuth v2.0 client is already set to request JWT against Keycloak

#. Scroll down and click on ``Get New Access Token``

   .. image:: ../pictures/lab2/get-access.png
      :align: center

#. Authenticate as ``dev1`` and password ``dev1``

   .. image:: ../pictures/lab2/login.png
      :align: center
      :scale: 50%

#. Click ``Proceed``, then ``Use Token``

   .. image:: ../pictures/lab2/use-token.png
      :align: center
      :scale: 50%

#. Send the request. It should pass.

   .. image:: ../pictures/lab2/send.png
      :align: center

.. note:: Congratulations, you configured your API Gateway to validate the JWT token from Keycloak.

.. note:: Check your Version 1 is still using API Key authentication.  Note the ``/colors`` endpoint is not available v1.