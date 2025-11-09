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
      }
    };

  return (
    <div style={styles.container}>
      <h2>Micro Terminal</h2>
      <MicroTerminal />
      <h2>Testing Terminal</h2>
      <TestTerminal />
    </div>
  );
}