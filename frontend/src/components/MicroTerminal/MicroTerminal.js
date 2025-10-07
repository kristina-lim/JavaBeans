import React, { useEffect, useRef } from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';

export default function MicroTerminal() {
    const { instance, ref } = useXTerm({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'monospace',
        theme: {
            background: '#1e1e1e',
            foreground: '#00ff00',
            cursor: '#00ff00',
        },
    });
    const input = useRef('');
    const ws = useRef(null);

    useEffect(() => {
        if (!instance) { return; }

         // Connect to backend WebSocket
        ws.current = new WebSocket('ws://localhost:9090/micro');
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

        instance.writeln('> Welcome to JavaBeans! Start learning :)');
        instance.write('> ');

        const handleCommand = (command) => {
            if (command.toLowerCase() === 'hello') {
                instance.writeln('Hello back!');
            } else if(command.toLowerCase() === 'clear') {
                instance.clear();
            } else {
                instance.writeln(`Unknown command: ${command}`);
            }
        };

        const dispose = instance.onData((data) => {
            ws.current?.send(data);
            // if user pressed enter, 13, move to a new line
            if (data.charCodeAt(0) === 13) {
                instance.writeln('');
                handleCommand(input.current);
                // clears the terminal once user types "clear"
                input.current = '';
                instance.write('> ');
            } else if (data.charCodeAt(0) == 127) {
                if (input.current.length > 0) {
                    instance.write('\b \b');
                    // erase character in buffer
                    input.current = input.current.slice(0, -1);
                }
            } else {
                instance.write(data);
                input.current += data;
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
                width: '80%',
                height: '400px',
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                padding: '8px',
                margin: '0 auto',
            }}
        />
    );
}
