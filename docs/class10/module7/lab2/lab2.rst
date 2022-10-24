Step 13 - JWT authorization
###########################

JWT is based on Oauth and OIDC. Keycloak is the Oauth Authorization Server.
Keycloak is already configured to issue JWT token for developers.

.. warning :: Currently, NMS ACM does not support multi authentication mecanisms on the same API-Proxy. We must remove the APIKEY policy before enabling the JWT policy.

Clean-up APIKEY configuration
=============================

#. In the Developer Portal, ``delete`` all APIKeys

   .. image:: ../pictures/lab2/delete-key.png
      :align: center

#. When all APIKeys are deleted, ``delete`` the organisation

   .. image:: ../pictures/lab2/delete-org.png
      :align: center




Add JWT Policy on API-Proxy
===========================

#. Edit ``API-Proxy`` ``v2`` like previously
#. In ``Policies``, delete the APIKey policy
#. Add a new ``JSON Web Token Assertion`` policy
#. For JWKS Sets, choose ``Enter JSON Web Key Sets (JWKS)``and paste the JSON below.

   .. note :: You can retrieve this JWKS from Keycloak endpoint http://10.1.1.4:8080/realms/devportal/protocol/openid-connect/certs

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

Test it out with postman
========================

#. In Postman, select the call ``GET Colors`` and check the version is ``v2`` http://api.sentence.com/v2/api/colors
#. In Authorization, select type ``Oauth 2.0``

   .. note :: As you can notice, the Postman Oauth v2.0 client is already set to request JWT against keycloak

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

.. note :: Congratulation, you configured your API Gateway to validate JWT token from Keycloak.

    