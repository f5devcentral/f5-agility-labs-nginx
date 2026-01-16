#!/usr/bin/env bash

set -x

COMMAND=(/bin/bash -c "sudo pip install -r requirements.txt -U ; make -C docs clean html")

. ./containthedocs-image

exec docker run --platform linux/amd64 --rm -it \
  -v "$PWD":"$PWD" --workdir "$PWD" \
  ${DOCKER_RUN_ARGS} \
  -e "LOCAL_USER_ID=$(id -u)" \
  ${DOC_IMG} "${COMMAND[@]}"
