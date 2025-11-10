# JavaBeans

## Architecture Overview

JavaBeans is a multi-container Docker Compose application consisting of three main components:

1. **Frontend** - React application served by Nginx (production build)
   - Serves the user interface on port 3000
   - Proxies WebSocket connections to the backend
   - Built with React 19, Xterm.js for terminal emulation

2. **Backend** - Spring Boot application with WebSocket support
   - Handles WebSocket connections for terminal sessions on port 9090
   - Spawns shell processes for interactive terminal access
   - Manages Java exercises execution and testing

3. **Exercises** - Shared volume for persistent student work
   - Contains Java exercises organized by topic
   - Preserves student code across container restarts
   - Accessible via terminal for editing and testing

## Getting Started

### Prerequisites
- Docker and Docker Compose installed

### Usage

Use the `manage.sh` script to manage the Docker Compose lifecycle:

```
./manage.sh <command>
```

This script is written using POSIX-compliant syntax to ensure compatibility
with multiple shells, including bash and fish.

### Available Commands

```
build    : Builds all Docker images (frontend, backend).
run      : Starts all application containers.
stop     : Stops and removes all application containers.
rebuild  : Rebuilds and restarts all containers.
restart  : An alias for the 'rebuild' command.
logs     : Shows the logs of all running containers.
clean    : Stops all containers and deletes the persistent data volume.
```

### Quick Start

1. Build the images:
   ```
   ./manage.sh build
   ```

2. Start the application:
   ```
   ./manage.sh run
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:9090

4. View logs:
   ```
   ./manage.sh logs
   ```

5. Stop the application:
   ```
   ./manage.sh stop
   ```

## Container Communication

The containers communicate through a dedicated Docker bridge network:

```
┌─────────────────────────────────────────────┐
│  Frontend Container (Nginx)                 │
│  - Serves React application (port 3000)     │
│  - Proxies WebSocket to backend             │
└──────────────────┬──────────────────────────┘
                   │
                   │ WebSocket Proxy
                   │ (/micro, /test endpoints)
                   │
┌──────────────────▼──────────────────────────┐
│  Backend Container (Spring Boot)            │
│  - WebSocket handlers (port 9090)           │
│  - Spawns shell processes                   │
│  - Executes commands in exercises volume    │
└──────────────────┬──────────────────────────┘
                   │
                   │ Volume Mount
                   │
┌──────────────────▼──────────────────────────┐
│  Exercises Volume (java-beans-data)         │
│  - Persistent Java exercises                │
│  - Student code and progress                │
└─────────────────────────────────────────────┘
```

## Health Checks

The backend container includes health check monitoring via Spring Boot Actuator:
- Endpoint: http://localhost:9090/actuator/health
- The frontend container waits for the backend to be healthy before starting

Use of AI In the project:
1. Dockerfile and manage.sh are predominantly AI generated using Google Gemini
   1. This allowed us to get started with the right configuration of Ubuntu, Docker, Java, and React to have the components interact properly so we could have a foundation to work from.
2. Claude CLI assisted us in the connection between the frontend terminal emulators and the actual Ubuntu OS terminals.
   1. This allowed us to run programs like Micro for text editing, running tests correctly with Maven, and structuring the workflow of these connections so the parts of the tests and the exercises work cohesively.
3. ChatGPT assisted us with what terminal emulator would be best for our project. We were deciding between React-Terminal and Xterm.js, but chatGPT helped us figure out which one to use. We decided to go with Xterm.js because it's more compatible to connecting to the backend, whereas React-Terminal is more front-end friendly.
   3. This helped us to not spend too much time on the React-Terminal, because we initially started out with that React component. We were able to move on quickly and get changes done for the Xterm.js component.