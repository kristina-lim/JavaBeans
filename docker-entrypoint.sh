#!/bin/sh
set -e

# Initialize the exercises volume with the built-in exercises if empty
if [ ! -f "/app/exercises/.initialized" ]; then
    echo "Initializing exercises volume with base exercises..."
    cp -r /app/exercises-template/* /app/exercises/
    touch /app/exercises/.initialized
    echo "Exercises initialized."
fi

# Start supervisor to run both frontend and backend
exec /usr/bin/supervisord -c /etc/supervisor/supervisord.conf
