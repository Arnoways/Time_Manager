#!/bin/sh

# deploy new changes to our server
set -xe

BRANCH=prod

cd ~/Time_Manager && \
git pull && \
git checkout ${BRANCH} && \
git submodule init && \
git submodule update --remote && \
docker-compose build && \
docker-compose up -d
