FROM node:lts-alpine
RUN npm install
CMD ["node", "index.js"]
EXPOSE 8080
COPY src/index.js .
