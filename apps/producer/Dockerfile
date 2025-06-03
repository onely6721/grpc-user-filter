FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Устанавливаем зависимости
RUN npm install

COPY apps/producer ./apps/producer
COPY libs ./libs

COPY apps/producer/src/data ./dist/apps/producer/src/data

RUN npx nest build apps/producer --config tsconfig.build.json

# Запуск
CMD ["node", "dist/apps/producer/src/main.js"]
