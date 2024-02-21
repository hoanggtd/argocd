FROM node:21.5 AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build 

FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html/web
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build .
RUN  chown -R nginx. *
CMD ["nginx", "-g", "daemon off;"]
