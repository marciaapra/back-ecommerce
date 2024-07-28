FROM node:20

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3001

CMD ["yarn", "start:dev"]