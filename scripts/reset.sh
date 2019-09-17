#!/bin/sh

set -xe

#deletes containers, networks and volumes 

docker-compose down -v --remove-orphans && \
docker volume prune --force && \
docker-compose up -d bdd && \
docker-compose build && \
docker-compose up -d
