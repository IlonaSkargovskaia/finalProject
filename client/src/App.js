import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import Home from "./pages/home/Home";
import Navigation from "./components/Nav";
import EventListPageCat from "./pages/events/EventListPageCat";
import EventDetail from "./pages/events/EventDetail";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import LocationPage from "./pages/locations/LocationPage";
import Footer from "./components/Footer";
import AddNewEvent from "./pages/events/AddNewEvent";
import SearchResults from "./components/SearchResults";
import { Spinner } from "react-bootstrap";
import UserDashboard from "./pages/dashboards/UserDashboard";
import OrganizerDashboard from "./pages/dashboards/OrganizerDashboard";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import UpdateEvent from "./pages/events/UpdateEvent";
import jwt from "jsonwebtoken";
import EventsList from "./pages/events/EventsList";
import Reviews from "./pages/reviews/Reviews";
import ScrollButton from "./components/ScrollButton";
import { toast } from "react-toastify";
import TicketDetails from "./components/TicketDetails";
import TicketPDF from "./components/TicketPDF";
import PastEvents from "./pages/events/PastEvents";

// Create a context for sharing state between components
export const AppContext = createContext();



const App = () => {
    // State for loading spinner 
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    // State for username, token, user role, and verification status
    const [username, setUsername] = useState("");
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userRole, setUserRole] = useState(""); 
    const [isVerify, setIsVerify] = useState(false);

    const navigate = useNavigate(); 

    // update authentication status
    const setAuth = (boolean) => {
        setToken(boolean ? localStorage.getItem("token") : ""); // Clear token on logout
    };

    const isAuth = async () => {
        const storageToken = localStorage.getItem("token");
    
        try {
            const res = await fetch(`/auth/is-verify`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });
    
            const data = await res.json();
    
            if (data === true) {

                // Decode the token to get user information
                const decodedToken = jwt.decode(storageToken);
                console.log('decoded token', decodedToken);


                if (decodedToken) {
                    const { role } = decodedToken;
    
                    setUserRole(role.trim());

                    console.log('Role from App: ', role)
                    setIsVerify(true);
                }
            }
            else {
                setIsVerify(false);
                toast.error('Access time out. Log in again');
            }
        } catch (error) {
            console.log(error);
        }
    };
    
 // Check authentication status when the component mounts
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
        <AppContext.Provider value={{ token, setToken, setUserRole,userRole,isAuth, isVerify, setIsVerify}}>
            <div className="wrapper">
                <header>
                    <Navigation
                        events={events}
                        isAuthenticated={token} 
                        setIsAuthenticated={setAuth}
                        username={username}
                        userRole={userRole}
                    />

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
                        <Route path="/reviews" element={<Reviews />} />
                        <Route path="/create-event" element={<AddNewEvent />} />
                        <Route path="/past-events" element={<PastEvents />} />
                        <Route path="/ticket/:ticketId" element={<TicketPDF />} />
                        
                        <Route
                            path="/search"
                            element={<SearchResults events={events} />}
                        />
                        <Route
                            path="/organizerdashboard"
                            element={
                                token && userRole === "organizer" ? (
                                    <OrganizerDashboard setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/userdashboard"
                            element={
                                token && userRole === 'user' ? (
                                    <UserDashboard setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                !token ? (
                                    <Login setAuth={setAuth}/>
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                        <Route
                            path="/register"
                            element={
                                !token ? (
                                    <Register setAuth={setAuth} />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        
                        <Route path="/events" element={<EventsList />} />
                        <Route path="/update-event/:eventId" element={<UpdateEvent />} />
                    </Routes>
                </main>

                <footer className="footer">
                    <Footer />
                    <ScrollButton />
                </footer>
            </div>
        </AppContext.Provider>
    );
};

export default App;
