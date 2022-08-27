FROM node:18-alpine

RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json tsconfig.json ./
COPY src ./src

RUN npm install 

EXPOSE 8080

CMD npm start