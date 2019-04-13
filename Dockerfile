FROM node:8.15.1-jessie

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

EXPOSE 3000

CMD [ "npm", "run", "seed"]

CMD [ "npm", "run", "start" ]