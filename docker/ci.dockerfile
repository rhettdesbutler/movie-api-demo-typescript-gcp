FROM node:23-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

#COPY ../docker/db/10-init.sql /docker-entrypoint-initdb.d/10-init.sql

RUN npm run build

EXPOSE 8080
EXPOSE 5432

RUN npm ci