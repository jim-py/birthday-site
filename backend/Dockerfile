FROM node:20-bookworm

WORKDIR /app

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  pkg-config \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

ENV npm_config_build_from_source=true

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/server.js"]