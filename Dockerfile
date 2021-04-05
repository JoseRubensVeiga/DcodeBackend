FROM node:10-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

expose 3333

CMD ["yarn", "dev:server"]