#!/bin/bash

set -xe

docker-compose down --rmi all -v --remove-orphans && \
docker volume prune --force && \
docker-compose up -d bdd && \
docker-compose build && \
docker-compose up -d
