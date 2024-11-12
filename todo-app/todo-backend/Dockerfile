FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

ENV MONGO_URL=mongodb://localhost:27017/todo-app
ENV REDIS_URL=redis://localhost:6379

CMD ["npm", "start"]
