#!/bin/sh

# deploy new changes to our server
set -xe

BRANCH=devops

cd ~/Time_Manager && \
git pull && \
git checkout ${BRANCH} && \
docker-compose build && \
docker-compose up -d
