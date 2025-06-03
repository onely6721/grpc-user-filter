FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json nest-cli.json ./

RUN npm install

COPY apps/consumer ./apps/consumer
COPY libs ./libs

RUN npx nest build apps/consumer --config tsconfig.build.json

CMD ["node", "dist/apps/consumer/src/main.js"]
