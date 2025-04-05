
FROM node:22-slim As production

RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install -y python3 make g++

ENV NODE_ENV=development

WORKDIR /code
COPY package.json /code/package.json
COPY yarn.lock /code/yarn.lock

RUN yarn

COPY . /code

RUN yarn build
RUN yarn install --frozen-lockfile --production && yarn cache clean

EXPOSE 3000

CMD [ "node", "--enable-source-maps", "dist/main.js"]
