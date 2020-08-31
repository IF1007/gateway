FROM node:lts-alpine
COPY src/index.js .

RUN npm install

EXPOSE 8080

CMD ["node", "index.js"]
