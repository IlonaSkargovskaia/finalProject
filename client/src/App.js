import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/home/Home";
import Navigation from "./components/Nav";
import EventListPageCat from "./pages/events/EventListPageCat";
import EventDetail from "./pages/events/EventDetail";
import { Routes, Route, Navigate } from "react-router-dom";
import LocationPage from "./pages/locations/LocationPage";
import Footer from "./components/Footer";
import AddNewEvent from "./pages/events/AddNewEvent";
import SearchResults from "./components/SearchResults";
import { Spinner } from "react-bootstrap";
import UserDashboard from "./pages/dashboards/UserDashboard";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";

const BASE_URL = "http://localhost:3005";

const App = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean)
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/events/`);
                setEvents(response.data);
                setLoading(false); // Set loading to false once the data is fetched
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        // Render the loading spinner if loading is true
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

                    <Route
                        path="/login"
                        element={
                            !isAuthenticated ? (
                                <Login setAuth={setAuth}/>
                            ) : (
                                <Navigate to="/userdashboard" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !isAuthenticated ? (
                                <Register setAuth={setAuth}/>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/userdashboard"
                        element={
                            isAuthenticated ? (
                                <UserDashboard setAuth={setAuth}/>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
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
