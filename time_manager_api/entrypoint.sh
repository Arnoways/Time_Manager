#!/bin/bash

set -xe

sequelize db:migrate && \
exec npm start
