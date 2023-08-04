import Home from './pages/home/Home';
import Navbar from './components/Navbar';
import EventListPageCat from './pages/events/EventListPageCat';
import {Routes, Route} from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryId" element={<EventListPageCat />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
