# backend/Dockerfile

FROM node:20.10.0

WORKDIR /src

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "start:prod"]
