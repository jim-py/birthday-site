# build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# run stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

# SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf
