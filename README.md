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

Use of AI In the project:
1. Dockerfile and manage.sh are predominantly AI generated using Google Gemini
   1. This allowed us to get started with the right configuration of Ubuntu, Docker, Java, and React to have the components interact properly so we could have a foundation to work from.
2. Claude CLI assisted us in the connection between the frontend terminal emulators and the actual Ubuntu OS terminals.
   1. This allowed us to run programs like Micro for text editing, running tests correctly with Maven, and structuring the workflow of these connections so the parts of the tests and the exercises work cohesively.
3. ChatGPT assisted us with what terminal emulator would be best for our project. We were deciding between React-Terminal and Xterm.js, but chatGPT helped us figure out which one to use. We decided to go with Xterm.js because it's more compatible to connecting to the backend, whereas React-Terminal is more front-end friendly.
   3. This helped us to not spend too much time on the React-Terminal, because we initially started out with that React component. We were able to move on quickly and get changes done for the Xterm.js component.