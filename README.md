# JavaBeans

Usage for Docker with this project:

```
./manage.sh <command>
```

A script to manage the Docker lifecycle of the JavaBeans application.
This script is written using POSIX-compliant syntax to ensure compatibility
with multiple shells, including bash and fish.
```
Commands:
build    : Builds the Docker image.
run      : Runs the container in the background.
stop     : Stops and removes the running container.
rebuild  : Stops, rebuilds the image, and runs the new container.
restart  : An alias for the 'rebuild' command.
logs     : Follows the logs of the running container.
clean    : Stops the container AND deletes the persistent data volume.
```
