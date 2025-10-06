import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

export default function MicroTerminal() {
    // ref for the div
    const ref = useRef(null);
    // ref for the terminal instance
    const termRef = useRef(null);
    // no duplicate terminals
    const initialized = useRef(false);
    // store user input
    const input = useRef('');

    useEffect(() => {
        if (initialized.current) {
            return;
        }
        initialized.current = true;

        const instance = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            fontFamily: 'monospace',
            theme: {
                background: '#1e1e1e',
                foreground: '#00ff00',
                cursor: '#00ff00',
            },
        });

        // attach fitaddon
        const fitAddon = new FitAddon();
        instance.loadAddon(fitAddon);
        // open terminal in container
        instance.open(ref.current);
        // fit terminal to container
        fitAddon.fit();
        // focus terminal
        instance.focus();

        instance.writeln('> Welcome to JavaBeans! Start learning :)');
        instance.write('> ');

        const handleCommand = (command) => {
            const cmd = command.trim().toLowerCase();
            if (cmd === 'hello') {
                instance.writeln('Hello back!');
            } else if (cmd === 'clear') {
                instance.clear();
            } else if (cmd.length > 0) {
                instance.writeln(`Unknown command: ${command}`);
            }
        }

        const handleInput = instance.onData((data) => {
            const code = data.charCodeAt(0);
            if (code === 13) {
                instance.writeln('');
                handleCommand(input.current);
                input.current = '';
                instance.write('> ');
            } else if (code === 127) {
                if (input.current.length > 0) {
                    instance.write('\b \b');
                    input.current = input.current.slice(0, -1);
                }
            } else {
                instance.write(data);
                input.current += data;
            }
        });

        // save instance
        termRef.current = instance;

        // cleanup
        return() => {
            handleInput.dispose();
            instance.dispose();
        };
    }, []);

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
            }}
        />
    );
}