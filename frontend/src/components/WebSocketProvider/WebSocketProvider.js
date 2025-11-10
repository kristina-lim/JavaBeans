import React, { createContext, useContext, useRef, useEffect, useState } from 'react';

// Create Context object to share websocket functionality
const WebSocketContext = createContext();

// Custom hook for child components to access WebSocket context
export const useWebSocket = () => useContext(WebSocketContext);

export default function WebSocketProvider({ children }) {
    const microWs = useRef(null);
    const testWs = useRef(null);
    const [microMessages, setMicroMessages] = useState([]);
    const [testMessages, setTestMessages] = useState([]);
    const microListeners = useRef(new Set());
    const testListeners = useRef(new Set());

    // Initialize WebSocket connections once
    useEffect(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

        // Micro WebSocket
        const microUrl = `${protocol}//${window.location.host}/micro`;
        microWs.current = new WebSocket(microUrl);

        // Handle successful connection
        microWs.current.onopen = () => {
            const msg = '> Connected to Java backend.\r\n';
            notifyMicroListeners(msg);
        };

        // Handle incoming messages
        microWs.current.onmessage = (event) => {
            notifyMicroListeners(event.data);
        };

        // Handle closed connection
        microWs.current.onclose = () => {
            const msg = '\r\n> Connection closed.';
            notifyMicroListeners(msg);
        };

        // Handle connection errors
        microWs.current.onerror = (err) => {
            console.error('Micro WebSocket error:', err);
            const msg = '\r\n> Connection error.';
            notifyMicroListeners(msg);
        };

        // Test WebSocket
        const testUrl = `${protocol}//${window.location.host}/test`;
        testWs.current = new WebSocket(testUrl);

        testWs.current.onopen = () => {
            const msg = '> Connected to Java backend.\r\n';
            notifyTestListeners(msg);
        };

        testWs.current.onmessage = (event) => {
            notifyTestListeners(event.data);
        };

        testWs.current.onclose = () => {
            const msg = '\r\n> Connection closed.';
            notifyTestListeners(msg);
        };

        testWs.current.onerror = (err) => {
            console.error('Test WebSocket error:', err);
            const msg = '\r\n> Connection error.';
            notifyTestListeners(msg);
        };

        return () => {
            if (microWs.current) microWs.current.close();
            if (testWs.current) testWs.current.close();
        };
    }, []);

    const notifyMicroListeners = (data) => {
        microListeners.current.forEach(listener => listener(data));
    };

    const notifyTestListeners = (data) => {
        testListeners.current.forEach(listener => listener(data));
    };

    const sendMicroData = (data) => {
        if (microWs.current?.readyState === WebSocket.OPEN) {
            microWs.current.send(data);
        }
    };

    const sendTestData = (data) => {
        if (testWs.current?.readyState === WebSocket.OPEN) {
            testWs.current.send(data);
        }
    };

    const subscribeMicro = (listener) => {
        microListeners.current.add(listener);
        return () => microListeners.current.delete(listener);
    };

    const subscribeTest = (listener) => {
        testListeners.current.add(listener);
        return () => testListeners.current.delete(listener);
    };

    // The context value exposes functions that child components can use to send data or subscribe to incoming messages
    const value = {
        sendMicroData,
        sendTestData,
        subscribeMicro,
        subscribeTest,
    };

    // Provide the WebSocket context to all child components
    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}