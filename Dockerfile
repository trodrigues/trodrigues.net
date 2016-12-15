FROM node:6-alpine
RUN apk update && \
    apk add build-base && \
    apk add python && \
    npm install -g yarn
COPY package.json /tmp/package.json
RUN cd /tmp && yarn install
RUN mkdir /app
RUN mv /tmp/node_modules /app/ && mv /tmp/yarn.lock /app/
COPY . /app
WORKDIR /app
RUN yarn run client:build
CMD ["yarn", "run", "server:prod"]
