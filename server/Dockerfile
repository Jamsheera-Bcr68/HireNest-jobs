# ---------- Stage 1: Build ----------
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Install tools required to build native npm packages
RUN apk add --no-cache python3 make g++

# Copy package files first
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy the rest of the project
COPY . .

# Build the TypeScript application
RUN npm run build


# ---------- Stage 2: Production ----------
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Install tools required by native production dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy the compiled application from the build stage
COPY --from=build /app/dist ./dist

# The port your Express server listens on
EXPOSE 7000

# Start the production server
CMD ["npm", "run", "start:prod"]