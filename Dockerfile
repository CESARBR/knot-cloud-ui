FROM node:10

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 80
HEALTHCHECK CMD curl --fail http://localhost:80/healthcheck || exit 1

CMD ["yarn", "start:server"]