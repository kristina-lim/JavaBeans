# JavaBeans Frontend

This is the React frontend for the JavaBeans application, built with Create React App and served in production using Nginx.

## Architecture

The frontend is deployed as a Docker container with the following structure:

- **Build Stage**: Uses Node.js 20 to build an optimized production bundle
- **Runtime Stage**: Uses Nginx Alpine to serve static files and proxy WebSocket connections
- **Port**: Exposed on port 80 internally, mapped to port 3000 on the host

## Production Build

The Dockerfile (`frontend/Dockerfile`) performs a multi-stage build:

1. **Stage 1 (Build)**:
   - Uses `node:20-slim` base image
   - Installs dependencies via `npm ci`
   - Builds production bundle with `npm run build`

2. **Stage 2 (Runtime)**:
   - Uses `nginx:alpine` base image
   - Copies built static files to nginx html directory
   - Configures nginx for routing and WebSocket proxying

## Nginx Configuration

The nginx configuration (`frontend/nginx.conf`) handles:

1. **Static File Serving**: Serves React application with client-side routing support
2. **WebSocket Proxying**: Proxies WebSocket connections to the backend service:
   - `/micro` endpoint - Terminal for Micro text editor
   - `/test` endpoint - Terminal for running tests
3. **API Proxying**: Optional `/api/` endpoint for future REST API calls

## WebSocket Connection

The terminal components (`MicroTerminal.js`, `TestTerminal.js`) connect to the backend via WebSocket using dynamic URLs:

```javascript
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}/micro`;
```

This approach ensures:
- WebSocket URLs adapt to the current host and protocol
- No hardcoded backend URLs
- Works seamlessly with nginx reverse proxy
- Supports both HTTP and HTTPS deployments

## Components

- **MicroTerminal**: Terminal emulator for the Micro text editor
- **TestTerminal**: Terminal emulator for running Maven tests
- **NavBar**: Navigation component with Bootstrap styling
- **TerminalState**: Context provider that manages terminal history state for both Micro and Test terminals
  - **NOTE**: Make sure to reload the page after some time to access both terminals at the same time.
- **WebSocketProvider**: Context provider that manages WebSocket connections to the backend. Establishes and maintains persistent connections for both `/micro` and `/test` endpoints.

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
