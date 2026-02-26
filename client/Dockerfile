FROM node:25.6.1-alpine3.23 as builder

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY index.html index.html
COPY vite.config.ts vite.config.ts
COPY tsconfig.json tsconfig.json
COPY tsconfig.app.json tsconfig.app.json
COPY tsconfig.node.json tsconfig.node.json
COPY src src

RUN ["yarn", "build"]

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]