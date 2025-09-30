# ---- Stage 1: Build the Java Backend Application ----
FROM maven:3-eclipse-temurin-21 AS java-builder

WORKDIR /usr/src/app
COPY . .
# Build the backend JAR
RUN mvn package -pl backend -am

# ---- Stage 2: Build the Frontend Dependencies ----
# Use an official, slim Node.js image for a fast and clean npm install.
FROM node:20-slim AS frontend-builder

WORKDIR /usr/src/app
# Copy only the package files first to leverage Docker caching
COPY frontend/package.json frontend/package-lock.json ./
# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ ./


# ---- Stage 3: Create the Final, Self-Contained Image ----
FROM eclipse-temurin:21-jdk-jammy

# Install Supervisor and Node.js from the faster NodeSource repository
RUN apt-get update && \
    apt-get install -y curl supervisor && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/* # Clean up apt cache

WORKDIR /app

# Copy the compiled backend JAR from the java-builder stage
COPY --from=java-builder /usr/src/app/backend/target/*.jar /app/backend/target/app.jar

# Copy the exercises
COPY exercises/ ./exercises/

# Copy the fully installed frontend from the frontend-builder stage
COPY --from=frontend-builder /usr/src/app/ ./frontend/

# Copy the Supervisor configuration file
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose both the frontend and backend ports
EXPOSE 3000

# The entrypoint is Supervisor, which will start both apps
ENTRYPOINT ["/usr/bin/supervisord", "-c", "/etc/supervisor/supervisord.conf"]