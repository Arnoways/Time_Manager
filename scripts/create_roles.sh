#!/bin/bash

#use this script to create roles whenever you're using a NEW database

set -xe

ROLES_URL="http://localhost:3000/api/roles"

curl -X POST ${ROLES_URL} -H 'Content-Type: application/json' -d '{"label": "Administrator"}'
curl -X POST ${ROLES_URL} -H 'Content-Type: application/json' -d '{"label": "Manager"}'
curl -X POST ${ROLES_URL} -H 'Content-Type: application/json' -d '{"label": "Employee"}'