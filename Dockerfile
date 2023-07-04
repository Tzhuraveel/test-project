FROM node:18-alpine

MAINTAINER timofii

RUN mkdir /app

COPY backend/package.json /app

WORKDIR /app

RUN npm install --production
