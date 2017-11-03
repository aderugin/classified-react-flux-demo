FROM node:8.8

RUN apt-get -y update
RUN npm i -g yarn

RUN mkdir -p /frontend
COPY ./package.json yarn.lock /frontend/

WORKDIR /frontend

RUN yarn