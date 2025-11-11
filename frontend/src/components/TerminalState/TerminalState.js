import React, { createContext, useContext, useState, useCallback } from 'react';

// create the context
const TerminalContext = createContext();

// custom hook to easily access state and setters
export const useTerminalState = () => useContext(TerminalContext);

// provide component to hold and manage the state
export default function TerminalState({ children }) {
    // store full text history for both terminals
    const [microHistory, setMicroHistory] = useState('');
    const [testHistory, setTestHistory] = useState('');

    // function to append new data to the micro terminal history
    const appendMicroHistory = useCallback((data) => {
        setMicroHistory(prev => prev + data);
    }, []);

    // function to append new data to the test terminal history
    const appendTestHistory = useCallback((data) => {
        setTestHistory(prev => prev + data);
    }, []);

    const value = {
        microHistory,
        testHistory,
        appendMicroHistory,
        appendTestHistory,
    };

    return (
        <TerminalContext.Provider value={value}>
            {children}
        </TerminalContext.Provider>
    );
}