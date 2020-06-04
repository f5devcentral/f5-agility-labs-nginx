# NGINX Plus Dockerfiles

A Bunch of Dockerfiles for [NGINX Plus](https://www.nginx.com/products/nginx/).
**Just add licenses**

#### Requirements

1. **Just add [licenses](https://www.nginx.com/free-trial-request/)**
2. Continuous Integration: Setup a [Gitlab CICD]((https://docs.gitlab.com/ee/ci/quick_start/)) continuous integration service
3. A Linux build server with a [Gitlab Runner](https://docs.gitlab.com/ee/ci/runners/README.html), running Dind (Docker in Docker)

#### Other setup Instructions:
 1. Place `nginx-repo.crt` and `nginx-repo.crt` files following files as Gitlab Variables
    * Retrieve your NGINX Plus Key and Certificate from the NGINX [customer portal](https://cs.nginx.com/) or from an activated evaluation
 2. Automate a [CICD pipeline using gitlab](https://docs.gitlab.com/ee/ci/pipelines.html). A example gitlab CI/CD pipeline file (`.gitlab-ci.yml`) is provided.
 3. Optional: Modify the `Dockerfile` as necessary, e.g. To install addtional NGINX Plus [Dynamic modules](https://docs.nginx.com/nginx/admin-guide/dynamic-modules/dynamic-modules/)

## Demos

SEE LAB GUIDE FOR DETAILED INSTRUCTIONS