FROM node:22-slim as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run docs:build

FROM node:22-slim

WORKDIR /app

COPY --from=build-stage /app/docs/.vitepress/dist ./dist

EXPOSE 4173

CMD ["npx", "vitepress", "preview", "dist"]