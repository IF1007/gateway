FROM node:lts-alpine

COPY . .

# add git to alpine
RUN apk add --no-cache git

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]
