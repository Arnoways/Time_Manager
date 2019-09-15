#!/bin/sh

set -xe

BRANCH=devops

git pull && \
git checkout ${BRANCH} && \
docker-compose build && \
docker-compose up -d