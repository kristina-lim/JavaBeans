import React, { useEffect, useRef } from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';
import { useTerminalState } from '../TerminalState/TerminalState';

export default function MicroTerminal() {
    const { instance, ref } = useXTerm();
    const input = useRef('');
    const ws = useRef(null);

    useEffect(() => {
        if (!instance) { return; }

         // Connect to backend WebSocket (via nginx proxy)
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/micro`;
        ws.current = new WebSocket(wsUrl);
        ws.current.onopen = () => {
            instance.writeln('> Connected to Java backend.\r\n');
        };

        ws.current.onmessage = (event) => {
            // Data from backend (shell output)
            instance.write(event.data);
        };

        ws.current.onclose = () => {
            instance.writeln('\r\n> Connection closed.');
        };

        ws.current.onerror = (err) => {
            console.error('WebSocket error:', err);
            instance.writeln('\r\n> Connection error.');
        };

        // focus terminal so user can type
        instance.focus();

        const dispose = instance.onData((data) => {
            // Send all input directly to backend
            if (ws.current?.readyState === WebSocket.OPEN) {
                ws.current.send(data);
            }
        });

        return () => {
            dispose.dispose();
            instance.dispose();
        };
    }, [instance]);

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
