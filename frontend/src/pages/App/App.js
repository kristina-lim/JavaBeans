//import { BrowserRouter, Routes, Route} from 'react-router-dom';
//import './App.css';
//import NavBar from '../../components/NavBar/NavBar';
//import Home from '../Home/Home';
//import About from '../About/About';
//import Faq from '../Faq/Faq';
//
//export default function App() {
//  return (
//    <BrowserRouter>
//        <div className="App">
//            <NavBar />
//            <Routes>
//                <Route path='/' element={<Home />} />
//                <Route path='/about' element={<About />} />
//                <Route path='/faq' element={<Faq />} />
//            </Routes>
//        </div>
//    </BrowserRouter>
//  );
//}
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import Home from '../Home/Home';
import About from '../About/About';
import Faq from '../Faq/Faq';
import TerminalState from '../../components/TerminalState/TerminalState';
import WebSocketProvider from '../../components/WebSocketContext/WebSocketContext';

export default function App() {
  return (
    <BrowserRouter>
      <WebSocketProvider>
        <TerminalState>
          <div className="App">
              <NavBar />
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/faq' element={<Faq />} />
              </Routes>
          </div>
        </TerminalState>
      </WebSocketProvider>
    </BrowserRouter>
  );
}