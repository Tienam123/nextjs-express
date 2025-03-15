FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm","run","dev"]