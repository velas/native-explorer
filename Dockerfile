FROM node:14-alpine as build-stage

WORKDIR /app

COPY . /app

RUN apk add git openssh
RUN npm i
RUN npm run build 

FROM nginx:stable-alpine as production-stage
ADD nginx_config/default.conf /etc/nginx/conf.d/default.conf
COPY nginx_config/error.html /usr/share/nginx/html/

COPY --from=build-stage /app/build/ usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
