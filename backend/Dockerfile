FROM node:20-slim

WORKDIR /app

# системные зависимости для node-gyp + sqlite3 build
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  pkg-config \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

# сначала только package.json (для кеширования слоя install)
COPY package*.json ./

# ВАЖНО: заставляем собирать sqlite3 из исходников
RUN npm install --build-from-source=sqlite3

# теперь весь код
COPY . .

# сборка TypeScript (если используешь ts)
RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/server.js"]