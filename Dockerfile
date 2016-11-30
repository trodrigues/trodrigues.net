FROM node:6-alpine
RUN apk update && apk add build-base && apk add python
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install -g yarn
RUN yarn install
CMD ["yarn", "run", "prod"]
