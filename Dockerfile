FROM node:0.10
RUN mkdir /src
WORKDIR /src
COPY * /src/
RUN npm install
CMD npm start
