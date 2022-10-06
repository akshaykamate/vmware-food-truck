FROM node:18-alpine AS stage
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

# The instructions for second stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
COPY --from=stage /app/node_modules /app/node_modules
COPY --from=stage /app/dist /app/dist
COPY --from=stage /app/.env /app/.env
CMD [ "npm", "start" ]
EXPOSE 3000
