#!/bin/sh

# A script to manage the Docker Compose lifecycle of the JavaBeans application.
# This script is written using POSIX-compliant syntax to ensure compatibility
# with multiple shells, including bash and fish.
#
# Commands:
#   build    : Builds the Docker images for all services.
#   run      : Starts all containers in the background.
#   stop     : Stops and removes all running containers.
#   rebuild  : Stops, rebuilds the images, and runs the new containers.
#   restart  : An alias for the 'rebuild' command.
#   logs     : Follows the logs of all running containers.
#   clean    : Stops all containers AND deletes the persistent data volume.

set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
COMPOSE_FILE="docker-compose.yml"
VOLUME_NAME="java-beans-data"

# --- Main Logic ---
COMMAND=$1

# --- Functions ---
show_usage() {
    echo "Usage: ./manage.sh [command]"
    echo ""
    echo "Available commands:"
    echo "  build    : Builds all Docker images (frontend, backend)."
    echo "  run      : Starts all application containers."
    echo "  stop     : Stops and removes all application containers."
    echo "  rebuild  : Rebuilds and restarts all containers."
    echo "  restart  : Alias for rebuild."
    echo "  logs     : Shows the logs of all running containers."
    echo "  clean    : Stops all containers and deletes all exercise data."
}

build_images() {
    echo "Building Docker images using Docker Compose..."
    docker-compose -f "$COMPOSE_FILE" build
    echo "Build complete."
}

run_containers() {
    echo "Starting all containers with Docker Compose..."
    docker-compose -f "$COMPOSE_FILE" up -d
    echo "Containers are running."
    echo "Access JavaBeans Frontend at http://localhost:3000"
    echo "Backend API is running at http://localhost:9090"
}

stop_containers() {
    echo "Stopping all containers..."
    docker-compose -f "$COMPOSE_FILE" down
    echo "Containers stopped and removed."
}

# --- Command Execution ---
case "$COMMAND" in
    build)
        build_images
        ;;
    run)
        run_containers
        ;;
    stop)
        stop_containers
        ;;
    rebuild|restart) # Added restart as an alias here
        echo "Rebuilding application..."
        stop_containers
        build_images
        run_containers
        echo "Rebuild complete."
        ;;
    logs)
        echo "Tailing logs for all containers. Press Ctrl+C to exit."
        docker-compose -f "$COMPOSE_FILE" logs -f
        ;;
    clean)
        echo "This will stop all containers and permanently delete the '$VOLUME_NAME' volume."
        # Use POSIX-compliant 'echo' and 'read' for the prompt
        echo "Are you sure you want to continue? (y/n) "
        read -r REPLY

        # Use POSIX-compliant 'case' for input validation
        case "$REPLY" in
            [Yy]*)
                echo "Stopping all containers and removing volumes..."
                docker-compose -f "$COMPOSE_FILE" down -v
                echo "All clean."
                ;;
            *)
                echo "Aborted."
                ;;
        esac
        ;;
    *)
        show_usage
        exit 1
        ;;
esac