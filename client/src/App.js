import Home from './pages/home/Home';
import Navigation from './components/Nav';
import EventListPageCat from './pages/events/EventListPageCat';
import {Routes, Route} from 'react-router-dom';
import LocationPage from './pages/locations/LocationPage';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='wrapper'>
      <header>
        <Navigation />
      </header>

      <main className='main'>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/location/:locationId" element={<LocationPage />} />
          <Route path="/category/:categoryId" element={<EventListPageCat />} />
        </Routes>
        
      </main>
      <footer className='footer'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
