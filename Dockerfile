# Stage 1: Build frontend
FROM node:18 AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build

# Stage 2: Backend
FROM node:18

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend code
COPY server ./server

# Copy frontend build from stage 1
# Frontend build stage
FROM node:18-alpine as frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./

RUN npm run build

# Backend stage
FROM node:18-alpine as backend

WORKDIR /app/server

COPY server/package*.json ./
RUN npm install

# Copy frontend build output (dist folder) from frontend-builder
COPY --from=frontend-builder /app/client/dist ./public

COPY server/ ./

EXPOSE 5000
CMD ["node", "index.js"]

WORKDIR /app/server

EXPOSE 5000

CMD ["npm", "start"]
