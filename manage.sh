#!/bin/sh

# A script to manage the Docker lifecycle of the JavaBeans application.
# This script is written using POSIX-compliant syntax to ensure compatibility
# with multiple shells, including bash and fish.
#
# Commands:
#   build    : Builds the Docker image.
#   run      : Runs the container in the background.
#   stop     : Stops and removes the running container.
#   rebuild  : Stops, rebuilds the image, and runs the new container.
#   restart  : An alias for the 'rebuild' command.
#   logs     : Follows the logs of the running container.
#   clean    : Stops the container AND deletes the persistent data volume.

set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
IMAGE_NAME="java-beans"
VOLUME_NAME="java-beans-data"
CONTAINER_NAME="java-beans-app"

# --- Main Logic ---
COMMAND=$1

# --- Functions ---
show_usage() {
    echo "Usage: ./manage.sh [command]"
    echo ""
    echo "Available commands:"
    echo "  build    : Builds the Docker image."
    echo "  run      : Runs the application container."
    echo "  stop     : Stops and removes the application container."
    echo "  rebuild  : Rebuilds and restarts the application."
    echo "  restart  : Alias for rebuild."
    echo "  logs     : Shows the logs of the running container."
    echo "  clean    : Stops the container and deletes all exercise data."
}

build_image() {
    echo "Building Docker image: $IMAGE_NAME..."
    docker build -t "$IMAGE_NAME" .
    echo "Build complete."
}

run_container() {
    echo "Checking for persistent volume: $VOLUME_NAME..."
    docker volume create "$VOLUME_NAME" > /dev/null

    echo "Starting container: $CONTAINER_NAME..."
    # Map ports and bind mount local exercises folder for live updates
    docker run -d --name "$CONTAINER_NAME" \
      -p 3000:3000 \
      -p 9090:9090 \
      -v "$(pwd)/exercises:/app/exercises" \
      "$IMAGE_NAME"

    echo "Container is running."
    echo "Access React Frontend at http://localhost:3000"
}

stop_container() {
    # Check if the container exists and is running
    if [ -n "$(docker ps -q -f name="$CONTAINER_NAME")" ]; then
        echo "Stopping container: $CONTAINER_NAME..."
        docker stop "$CONTAINER_NAME"
    fi
    # Check if the container exists in any state (stopped)
    if [ -n "$(docker ps -aq -f name="$CONTAINER_NAME")" ]; then
        echo "Removing container: $CONTAINER_NAME..."
        docker rm "$CONTAINER_NAME"
    fi
    echo "Container stopped and removed."
}

# --- Command Execution ---
case "$COMMAND" in
    build)
        build_image
        ;;
    run)
        run_container
        ;;
    stop)
        stop_container
        ;;
    rebuild|restart) # Added restart as an alias here
        echo "Rebuilding application..."
        stop_container
        build_image
        run_container
        echo "Rebuild complete."
        ;;
    logs)
        echo "Tailing logs for $CONTAINER_NAME. Press Ctrl+C to exit."
        docker logs -f "$CONTAINER_NAME"
        ;;
    clean)
        echo "This will stop the container and permanently delete the '$VOLUME_NAME' volume."
        # Use POSIX-compliant 'echo' and 'read' for the prompt
        echo "Are you sure you want to continue? (y/n) "
        read -r REPLY

        # Use POSIX-compliant 'case' for input validation
        case "$REPLY" in
            [Yy]*)
                stop_container
                echo "Deleting volume: $VOLUME_NAME..."
                docker volume rm "$VOLUME_NAME"
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