FROM node:latest AS builder

WORKDIR /app

COPY . .

RUN npm install && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/WebApp /usr/share/nginx/html

# $ docker build -t web-app:v1 .
# $ docker run -p 80:80 web-app:v1