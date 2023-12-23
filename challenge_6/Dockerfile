# Stage 1: Build Image
FROM node:18-alpine as build-image
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
COPY ./config ./config
COPY ./src ./src
COPY knexfile.ts ./
COPY .dockerignore .dockerignore
RUN npm install
RUN npx tsc

# Stage 2: Production Image
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=build-image ./usr/src/app/dist ./dist
RUN npm install
COPY . .
EXPOSE 8084
CMD [ "node", "dist/src/server.js" ]
