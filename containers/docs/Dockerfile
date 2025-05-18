FROM node:22-slim as build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run docs:build

EXPOSE 4173

CMD ["npm", "run", "docs:preview"]