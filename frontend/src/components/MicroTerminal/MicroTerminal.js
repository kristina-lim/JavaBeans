import React, { useEffect, useRef } from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';
import { useTerminalState } from '../TerminalState/TerminalState';
import { useWebSocket } from "../WebSocketProvider/WebSocketProvider";

export default function MicroTerminal() {
    const { instance, ref } = useXTerm();
    const { microHistory, appendMicroHistory } = useTerminalState();
    const { sendMicroData, subscribeMicro } = useWebSocket();
    const isInitialized = useRef(false);

    useEffect(() => {
        if (!instance) { return; }

        // Restore history on mount
        if (microHistory && !isInitialized.current) {
            instance.write(microHistory);
            isInitialized.current = true;
        }

        // Subscribe to WebSocket messages
        const unsubscribe = subscribeMicro((data) => {
            instance.write(data);
            appendMicroHistory(data); // Only save server responses
        });

        // Handle user input
        const dispose = instance.onData((data) => {
            sendMicroData(data);
        });

        // focus terminal so user can type
        instance.focus();

        return () => {
            dispose.dispose();
            unsubscribe();
        };
    }, [instance, microHistory, appendMicroHistory, sendMicroData, subscribeMicro]);

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