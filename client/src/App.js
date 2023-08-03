import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import Events from './pages/events/Events';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div>
      <header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/events" element={<Events />}/>
        </Routes>
          
      </header>
      
    </div>
  );
}

export default App;
