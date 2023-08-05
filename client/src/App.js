import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/home/Home";
import Navigation from "./components/Nav";
import EventListPageCat from "./pages/events/EventListPageCat";
import EventDetail from "./pages/events/EventDetail";
import { Routes, Route } from "react-router-dom";
import LocationPage from "./pages/locations/LocationPage";
import Footer from "./components/Footer";
import AddNewEvent from "./pages/events/AddNewEvent";
import SearchResults from "./components/SearchResults";
import { Spinner } from "react-bootstrap";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3005/api/events/`
                );
                setEvents(response.data);
                setLoading(false); // Set loading to false once the data is fetched
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false); // Set loading to false once the data is fetched
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
      // Render the loading indicator if loading is true
      return (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
        </div>
      );
    }

    return (
        <div className="wrapper">
            <header>
                <Navigation events={events} />
            </header>

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/location/:locationId"
                        element={<LocationPage />}
                    />
                    <Route
                        path="/category/:categoryId"
                        element={<EventListPageCat />}
                    />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/create-event" element={<AddNewEvent />} />
                    <Route
                        path="/search"
                        element={<SearchResults events={events} />}
                    />
                </Routes>
            </main>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
};

export default App;
