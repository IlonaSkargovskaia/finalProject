import React, { useState, useEffect, createContext } from "react";
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

export const AppContext = createContext();

const App = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [username, setUsername] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    

    const setAuth = (boolean) => {
        setIsAuthenticated(boolean);
    };

    const isAuth = async () => {
        
        const storageToken = localStorage.getItem('token');

        try {
            const res = await fetch(`/auth/is-verify`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });

            const data = await res.json();
            //console.log(data);

            if (data === true) {
                setIsAuthenticated(true);

                // Fetch the user data including the username
                const userRes = await fetch(`/dashboard`, {
                    method: "GET",
                    headers: { token: localStorage.token },
                });

                const userData = await userRes.json();
                //console.log(userData.username);
                setUsername(userData.username); 

            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isAuth();
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`/api/events/`);
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
        <AppContext.Provider value={{token, setToken}}>
        <div className="wrapper">
            <header>
                <Navigation events={events} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} username={username}/>
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
                                <Login setAuth={setAuth} />
                            ) : (
                                <Navigate to="/userdashboard" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !isAuthenticated ? (
                                <Register setAuth={setAuth} />
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route
                        path="/userdashboard"
                        element={
                            isAuthenticated ? (
                                <UserDashboard setAuth={setAuth} />
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
        </AppContext.Provider>
)};

export default App;
