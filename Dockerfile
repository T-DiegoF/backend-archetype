FROM node:18 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
