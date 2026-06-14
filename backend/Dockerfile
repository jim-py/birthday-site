FROM node:20-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npx tsc

EXPOSE 5000

CMD ["node", "dist/server.js"]