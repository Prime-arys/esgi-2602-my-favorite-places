FROM node:25.8.2-alpine3.23 as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY tsconfig.json tsconfig.json
COPY src src

RUN ["yarn", "build"]

FROM node:25.8.2-alpine3.23 as deps

WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install --production=true


FROM node:25.8.2-alpine3.23

WORKDIR /app

COPY --from=builder /app/dist /app/dist
COPY --from=deps /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/yarn.lock /app/yarn.lock

EXPOSE 3000

CMD ["yarn", "start"]