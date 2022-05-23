Module 1 - HTTP/2 and GRPC DoS Attack on Unprotected Application
######################################################

| In this module you will generate **good** and malicious traffic.
| The malicious traffic will cause the good traffic to error out. We
| will utilize HTTP/2 and gRPC as part of this module.

Demonstrate the effects of an HTTP/2 and gRPC attacks on an unprotected application
-----------------------------------------------------------------------------------

- Generate legitimate traffic 
   
   - In UDF, Click on Access for the **legitimate traffic** VM and select WebShell 
   
   - At the CLI prompt start the good shell script  
  
 .. code:: shell

    ./good.sh
   
    
Output from the script: 

.. code:: shell 
 
   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points 

- Start HTTP/2 Flood attack

   - Back in the UDF class Access on the **Attacker** VM and select WebShell
   - At CLI prompt start the HTTP/2 Flood: 

.. code:: shell 
   
    ./scripts/http2flood.sh 


Attack script Output

.. code:: shell 

   finished in 1.07s, 9350.31 req/s, 2.09MB/s
  requests: 10000 total, 10000 started, 10000 done, 0 succeeded, 10000 failed, 0 errored, 0 timeout
  status codes: 0 2xx, 0 3xx, 0 4xx, 10000 5xx
  traffic: 2.23MB (2339000) total, 527.34KB (540000) headers (space savings 45.45%), 1.50MB (1570000) data
                       min         max         mean         sd        +/- sd
  time for request:      625us       1.02s     52.83ms     25.29ms    85.84%
  time for connect:     9.42ms     28.08ms     20.14ms      4.61ms    70.10%
  time to 1st byte:    35.60ms       1.04s     96.07ms     66.04ms    99.60%
  req/s           :       9.56       21.66       17.79        1.69    72.90%
  starting benchmark...
  spawning thread #0: 1000 total client(s). 10000 total requests
  Application protocol: h2c
  progress: 10% done
  progress: 20% done
  progress: 30% done
  progress: 40% done
  progress: 50% done
  progress: 60% done
  progress: 70% done
  progress: 80% done
  progress: 90% done
  progress: 100% done

- Click back on to the WebShell on the legitimate VM. Did the output from
   the script change? Output now shows the HTTP/2 service is
   experiencing an outage.

.. code:: shell

  JUICESHOP HTTP Code:200
        details = "Received http2 header with status: 502"
        debug_error_string = "{"created":"@1650395963.222837020","description":"Received http2 :status header with non-200 OK status","file":"src/core/ext/filters/http/client/http_client_filter.cc","file_line":134,"grpc_message":"Received http2 header with status: 502","grpc_status":14,"value":"502"}"

- Stop the HTTP2Flood attack, by pressing Ctrl-C


