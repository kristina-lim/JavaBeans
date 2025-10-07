import MicroTerminal from '../../components/MicroTerminal/MicroTerminal';
import TestTerminal from '../../components/TestTerminal/TestTerminal';

export default function Terminals() {
  return (
    <div>
      <h2>Micro Terminal</h2>
      <MicroTerminal />
      <h2>Testing Terminal</h2>
      <TestTerminal />
    </div>
  );
}