#!/bin/bash

set -xe

API_URL="http://localhost:3000/api"

TOKEN=$(curl -s -X POST -H 'Accept: application/json' -H 'Content-Type: application/json' --data '{"email": "admin@admin.com", "password": "admin"}' ${API_URL}/users/sign_in | jq -r .token)

# create a new user with a clock
curl -X POST ${API_URL}/users/sign_up \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TOKEN}" -d '{"first_name": "dummy", "last_name": "user", "email": "dummy.dummy@timepool.me", "password": "password"}' 
