Testing the App Security
########################

We will go through testing steps to verify that our application has been successfully protected.

1. Let's test the **Web Application Firewall**, browse to :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/?a=&lt;script`

2. Test the **API protection**:

   a) Browse to :ext_link:`http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/api`

   b) Run the bellow cURL command:

      .. code-block:: none

         curl -H "Content-Type: application/json;charset=UTF-8" \
           --data-raw "{\"email\":112233,\"password\":\"bitcoin\"}" \
           http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login        

3. Test that the **ChatBot** is protected from mallicious Bots

   .. code-block:: none

     # Login and get JWT token
     JWT_TOKEN=$(curl -s -X POST "http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/login" \
         -H "Content-Type: application/json" \
         -d '{"email":"sorin@nginx.com","password":"nginx"}' \
         | grep -o '"jwt":"[^"]*' | cut -d'"' -f4)

     echo "JWT Token: $JWT_TOKEN"

     # Send a message to AI chat
     curl -s -X POST "http://arcadia-re-$$makeId$$.workshop.emea.f5se.com/v1/ai/chat" \
         -H "Content-Type: application/json" \
         -H "Authorization: Bearer $JWT_TOKEN" \
         -d '{"newQuestion":"Tell me about the current market trends for cryptocurrencies."}'

