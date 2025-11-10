import MicroTerminal from '../../components/MicroTerminal/MicroTerminal';
import TestTerminal from '../../components/TestTerminal/TestTerminal';

export default function Terminals() {
    const styles =  {
        container: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        padding: '20px',
        height: '100vh',
        },

    terminal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    terminalFontSize: {
        fontSize: '1.2rem',
    }
  };

    return (
        <div style={styles.container}>
            <div style={styles.terminal}>
                <h2 style={styles.terminalFontSize}>Micro Terminal</h2>
                <MicroTerminal />
            </div>
            <div style={styles.terminal}>
                <h2 style={styles.terminalFontSize}>Testing Terminal</h2>
                <TestTerminal />
            </div>
        </div>
    );
}