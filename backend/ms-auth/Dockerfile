FROM node:lts-alpine

WORKDIR /app

COPY ./ms-auth /app/ms-auth
COPY ./common /app/common

RUN npm --prefix ./ms-auth install
RUN npm --prefix ./common install

CMD npm --prefix ./ms-auth run prod