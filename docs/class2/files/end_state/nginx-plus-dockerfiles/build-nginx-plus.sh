#!/bin/bash
# Usage EXAMPLE: ./build-nginx-plus.sh ubuntu18.04
distro="$(tr [A-Z] [a-z] <<< "$1")" # set to lowercase

# Pull changes
git pull --no-edit

# remove Dockerfile here
rm Dockerfile

# copy desired Dockerfile
cp Dockerfiles/$distro/Dockerfile .

# Build and tag it as "nginx-plus-[distro]"
docker build -t nginx-plus-$distro . --pull --no-cache # No caching
# docker build -t nginx-plus-$distro

# Show all docker containers build with names containing "nginx-plus-"
printf "\n"
printf "Nginx Plus containers built:"
printf "\n"
docker images | grep nginx-plus-