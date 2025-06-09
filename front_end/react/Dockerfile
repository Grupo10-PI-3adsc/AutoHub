FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

RUN npm install -g typescript

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

#sudo docker build -t autohub-front .
#sudo docker tag autohub-front matteusnogueira/autohub-front:latest
#sudo docker push matteusnogueira/autohub-front:latest