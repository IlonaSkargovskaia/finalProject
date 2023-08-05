import Home from './pages/home/Home';
import Navigation from './components/Nav';
import EventListPageCat from './pages/events/EventListPageCat';
import {Routes, Route} from 'react-router-dom';
import LocationPage from './pages/locations/LocationPage';

const App = () => {
  return (
    <div>
      <header>
      
        <Navigation />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location/:locationId" element={<LocationPage />} />
          <Route path="/category/:categoryId" element={<EventListPageCat />} />
        </Routes>
        
      </header>
    </div>
  );
}

export default App;
