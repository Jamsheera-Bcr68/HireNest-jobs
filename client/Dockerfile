# # ---------- Stage 1: Build ----------
# FROM node:20-alpine AS build

# # Set working directory
# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the frontend source code
# COPY . .

# # Build React application
# RUN npm run build


# # ---------- Stage 2: Production ----------
# FROM nginx:alpine

# # Copy Vite's production build to Nginx
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy our Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Nginx listens on port 80
# EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend source code
COPY . .

# Receive Vite environment variables
ARG VITE_BACKEND_URL
ARG VITE_GOOGLE_CLIENT_ID

# Make them available to Vite during the build
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

# Build React application
RUN npm run build


# ---------- Stage 2: Production ----------
FROM nginx:alpine

# Copy Vite's production build to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy our Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx listens on port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]