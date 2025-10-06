import React, { useEffect, useRef } from 'react';
import { useXTerm } from 'react-xtermjs';
import '@xterm/xterm/css/xterm.css';

export default function XTerm() {
//    const { instance, ref } = useXTerm();
    const { instance, ref } = useXTerm({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: 'monospace',
        theme: {
            background: '#000000',
            foreground: '#00FF00',
            cursor: '#00FF00'
        },
    });

    const input = useRef('');
    const handleCommand = (command) => {
        if (command.toLowerCase() == 'hello') {
            instance.writeln('Hello back!');
        } else if(command.toLowerCase() == 'clear') {
            instance.clear();
        }
    }

    useEffect(() => {
        if (instance) {
            instance.writeln('> Welcome to JavaBeans! Start learning :)');
            instance.write('> ');

            const dispose = instance.onData((data) => {
                // if user pressed enter, 13, move to a new line
                if (data.charCodeAt(0) == 13) {
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

            return () => dispose.dispose();
        }
    }, [instance]);

    return (
        <div
            ref={ref}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
            }}
        />
    );
}