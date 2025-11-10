# Stage 1: Build the Java Backend Application
FROM maven:3-eclipse-temurin-21 AS builder

WORKDIR /build

# Copy parent pom.xml and both modules (exercises is needed for Maven reactor build)
COPY pom.xml ./pom.xml
COPY backend/ ./backend/
COPY exercises/ ./exercises/

# Build the backend JAR (also builds exercises module as dependency)
RUN mvn package -pl backend -am

# Stage 2: Create the Runtime Image
FROM eclipse-temurin:21-jdk-jammy

# Install Maven, Micro text editor, and curl (for health checks)
RUN apt-get update && \
    apt-get install -y curl maven && \
    curl https://getmic.ro | bash && \
    mv micro /usr/local/bin/ && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled backend JAR from the builder stage
COPY --from=builder /build/backend/target/*.jar /app/backend/target/app.jar

# Copy the root pom.xml (needed as parent POM for exercises)
COPY pom.xml ./pom.xml

# Copy the exercises to a template location (will be copied to volume on first run)
COPY exercises/ ./exercises-template/

# Copy entrypoint script
COPY backend/docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create empty exercises directory for volume mount
RUN mkdir -p /app/exercises

# Expose backend port
EXPOSE 9090

# Use custom entrypoint that initializes volume and starts Spring Boot
ENTRYPOINT ["/app/docker-entrypoint.sh"]
