import React, { useEffect, useRef } from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';
import { useTerminalState } from '../TerminalState/TerminalState';
import { useWebSocket } from "../WebSocketProvider/WebSocketProvider";

export default function TestTerminal() {
    const { instance, ref } = useXTerm();
    const { testHistory, appendTestHistory } = useTerminalState();
    const { sendTestData, subscribeTest } = useWebSocket();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!instance) { return; }

        // Restore history on mount
        if (testHistory && !isInitialized.current) {
            instance.write(testHistory);
            isInitialized.current = true;
        }

        // Subscribe to WebSocket messages
        const unsubscribe = subscribeTest((data) => {
            instance.write(data);
            appendTestHistory(data); // Only save server responses
        });

        // Handle user input
        const dispose = instance.onData((data) => {
            sendTestData(data);
        });

        // Focus terminal so user can type
        instance.focus();

        return () => {
            dispose.dispose();
            unsubscribe();
        };
    }, [instance, testHistory, appendTestHistory, sendTestData, subscribeTest]);

    return (
        <div
            ref={ref}
            tabIndex={0}
            style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '8px',
                textAlign: 'left',
            }}
        />
    );
}

