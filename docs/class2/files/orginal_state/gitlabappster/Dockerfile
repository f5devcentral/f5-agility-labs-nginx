FROM alpine:3.11

LABEL maintainer="armand@nginx.com"

# Install prerequisite packages:
# none

## Install Nginx Plus
# Download certificate and key from the customer portal https://cs.nginx.com
# and copy to the build context
COPY etc/ssl/nginx/nginx-repo.crt /etc/apk/cert.pem
COPY etc/ssl/nginx/nginx-repo.key /etc/apk/cert.key
RUN chmod 644 /etc/apk/cert*

# Prepare repo config and install NGINX Plus (https://cs.nginx.com/repo_setup)
# Remove the cert/keys from the image
RUN wget -O /etc/apk/keys/nginx_signing.rsa.pub https://nginx.org/keys/nginx_signing.rsa.pub \
 && printf "https://plus-pkgs.nginx.com/alpine/v`egrep -o '^[0-9]+\.[0-9]+' /etc/alpine-release`/main\n" | tee -a /etc/apk/repositories \
 && apk add nginx-plus \
 ## Optional: Install NGINX Plus Modules from repo
 # See https://www.nginx.com/products/nginx/modules
 # nginx-plus modsecurity
 # && apk add nginx-plus-module-modsecurity \
 # nginx-plus geoip module
 # && apk add nginx-plus-module-geoip \
 # nginx-plus NGINX Javascript module
 # && apk add nginx-plus-module-njs
 # Remove default nginx config
 && rm /etc/nginx/conf.d/default.conf \
 ## Forward request logs to docker log collector
 && ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log \
 # Remove the cert/keys from the image
 && rm /etc/apk/cert.pem /etc/apk/cert.key

# Optional: Create cache folder and set permissions for proxy caching
#CMD mkdir -p /var/cache/nginx \
#&& chown -R nginx /var/cache/nginx

# COPY /etc/nginx (Nginx configuration) directory
COPY etc/nginx /etc/nginx
RUN chown -R nginx:nginx /etc/nginx

# Optional: COPY over any of your SSL certs for HTTPS servers
# e.g.
#COPY etc/ssl/www.example.com.crt /etc/ssl/www.example.com.crt
#COPY etc/ssl/www.example.com.key /etc/ssl/www.example.com.key



# EXPOSE ports, HTTP 80, HTTPS 443 and, Nginx status page 8080
EXPOSE 80 443 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]