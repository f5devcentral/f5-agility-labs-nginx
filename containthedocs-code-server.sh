#!/usr/bin/env bash

set -x


COMMAND="scripts/code-server.sh"
DOCKER_RUN_ARGS="--name code-server -p 3000:8080"
ARCH=`uname -m`

. ./containthedocs-image-$ARCH

exec docker run --rm -it \
  -v "$PWD":"$PWD" --workdir "$PWD" \
  ${DOCKER_RUN_ARGS} \
  -e "LOCAL_USER_ID=$(id -u)" \
  ${DOC_IMG} ${COMMAND}
