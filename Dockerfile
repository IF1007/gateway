FROM node:lts-alpine

COPY package.json .
COPY src/index.js .

RUN npm install

EXPOSE 8081

CMD ["node", "index.js"]
