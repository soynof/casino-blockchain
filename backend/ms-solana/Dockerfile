FROM node:lts-alpine

WORKDIR /app

COPY ./ms-solana /app/ms-solana
COPY ./common /app/common

RUN npm --prefix ./ms-solana install
RUN npm --prefix ./common install

CMD npm --prefix ./ms-solana run prod