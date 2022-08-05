FROM node:lts-alpine

WORKDIR /app

COPY ./ms-test /app/ms-test
COPY ./common /app/common

RUN npm --prefix ./ms-test install
RUN npm --prefix ./common install

CMD npm --prefix ./ms-test run prod