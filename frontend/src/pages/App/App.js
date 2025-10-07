import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import MicroTerminal from '../../components/Terminals/MicroTerminal';
import Home from '../Home/Home';
import About from '../About/About';
import Faq from '../Faq/Faq';

export default function App() {
  return (
    <BrowserRouter>
        <div className="App">
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/faq' element={<Faq />} />
            </Routes>
        </div>
    </BrowserRouter>
  );
}

