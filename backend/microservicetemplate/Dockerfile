FROM node:lts-alpine

WORKDIR /app

COPY ./anymicroservice /app/anymicroservice
COPY ./common /app/common

RUN npm --prefix ./anymicroservice install
RUN npm --prefix ./common install

CMD npm --prefix ./anymicroservice run prod