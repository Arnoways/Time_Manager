#!/bin/sh

set -xe

#deletes containers, networks and volumes 

docker-compose -f docker-compose-prod.yml down -v --remove-orphans && \
docker volume prune --force && \
docker-compose -f docker-compose-prod.yml up -d bdd && \
docker-compose -f docker-compose-prod.yml build && \
docker-compose -f docker-compose-prod.yml up -d
