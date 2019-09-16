#!/bin/bash

set -xe

sequelize db:seed:all && \
sequelize db:migrate && \
exec npm start
