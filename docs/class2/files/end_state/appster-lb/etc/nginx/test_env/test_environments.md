# Localhost testing

Place test loopback virtual server here: `upstreams_prod.conf`

We will enable this in NGINX.conf by uncommenting `#include /etc/nginx/test_env/*.conf;` and
replacing the variable `_upstream_` to `http_appster_test`

i.e. we replace `_upstream_` in `www.appster.com.conf` and `www2.appster.com.conf` using `sed`:

```bash
find etc/nginx -type f -name "*.conf" -exec sed -i -e 's/\${appster_upstream}/http_appster_test/g' {} \;
```

```ini
# www.appster.com.conf and www2.appster.com.conf

location {
        #...
        
        # Set Variable for dynamic templating (CICD)
        # Sed replace ${appster_upstream} with "http_appster_test" or "http_appster_prod"
        proxy_pass http://${appster_upstream};
}

# becomes:

location {
        #...
        
        # Set Variable for dynamic templating (CICD)
        # Sed replace ${appster_upstream} with "http_appster_test" or "http_appster_prod"
        proxy_pass http://${appster_upstream};
}

```
