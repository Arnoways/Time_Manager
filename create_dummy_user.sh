#!/bin/bash

#use this script to create a new dummy user
set -xe

USERS_URL="http://localhost:3000/api/users"

curl -X POST ${USERS_URL} -H 'Content-Type: application/json' -d \
'{"username": "Dummy User", "password": "Dummy_Pass", "email": "dummy.email@test.com", "roleId": "3"}'
