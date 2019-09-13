FROM node:8.16-jessie-slim

# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
COPY package.json /usr/app/time_manager/

WORKDIR /usr/app/time_manager

RUN npm install && \
    npm install -g sequelize sequelize-cli pg

COPY . .

RUN chmod +x ./entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/app/time_manager/entrypoint.sh"]