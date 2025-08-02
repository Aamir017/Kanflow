# Stage 1: Build frontend
FROM node:current-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client ./
RUN npm run build

# Stage 2: Backend
FROM node:current-alpine

WORKDIR /app

COPY server/package*.json ./server/
RUN cd server && npm install

# Copy backend code
COPY server ./server

# Copy frontend build from stage 1
# Frontend build stage
FROM node:current-alpine AS frontend-builder

WORKDIR /app/client

COPY client/package*.json ./
RUN npm install

COPY client/ ./

RUN npm run build

# Backend stage
FROM node:current-alpine AS backend

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
