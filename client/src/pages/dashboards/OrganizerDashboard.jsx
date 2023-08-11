import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

const OrganizerDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState("");
    const { token } = useContext(AppContext);

    const getName = async () => {
        const storageToken = localStorage.getItem("token");

        try {
            const decodedToken = jwt.decode(token || storageToken); 
            console.log("Decoded token in OrgDash:", decodedToken);

            if (decodedToken) {
                const res = await fetch(`/dashboard/`, {
                    method: "GET",
                    headers: {
                        Authorization: token || storageToken,
                    },
                });

                const data = await res.json();
                console.log("data from OrganizerDash: ", data);

                const { username, role } = data;
                setUsername(username);
                setRole(role);

                // Check if the toast has been shown before
                const toastShown = localStorage.getItem("toastShown");
                if (!toastShown) {
                    toast("Login successfully!");
                    localStorage.setItem("toastShown", "true"); // Mark as shown
                }

                // Fetch events created by the user
                try {
                    const userEventsResponse = await fetch(
                        `/api/events/user/${decodedToken.user}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: token || storageToken,
                            },
                        }
                    );

                    const userEventsData = await userEventsResponse.json();
                    setUserEvents(userEventsData);
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const storageToken = localStorage.getItem("token");
        const decodedToken = jwt.decode(token || storageToken);

        if (decodedToken) {
            getName(); 

            // Fetch events with search query
            const fetchUserEvents = async () => {
                try {
                    const userEventsResponse = await fetch(
                        `/api/events/user/${decodedToken.user}`,
                        {
                            method: "GET",
                            headers: {
                                Authorization: token || storageToken,
                            },
                        }
                    );

                    const userEventsData = await userEventsResponse.json();

                    setUserEvents(userEventsData);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUserEvents(); // Call the function
        }
    }, [token]);

    const deleteEvent = async (eventId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        if (!isConfirmed) {
            return;
        }
        try {
            const response = await axios.delete(`/api/events/${eventId}`);
            if (response.status === 200) {
                // Remove the deleted event from the userEvents state
                const updatedEvents = userEvents.filter(
                    (event) => event.id !== eventId
                );
                setUserEvents(updatedEvents);
                toast.success("Event deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting event:", error);
            toast.error("Error deleting event");
        }
    };

    const logout = (e) => {
        e.preventDefault();

        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("toastShown");
        setAuth(false);
    };

    return (
        <Container>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className="org-title">Organizer Dashboard</h1>

            <Row className="org__block">
                <Col>
                    <h3>Hello, {username}</h3>
                    <p>"{role}"</p>
                </Col>
                <Col>
                    <Link to="#">
                        <div className="card bg-light">
                            Update profile
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to="/create-event">
                        <div className="card bg-success text-white">
                            Add new event
                        </div>
                    </Link>
                </Col>
            </Row>

            <div className="org-events__search">
                <h3>Your events:</h3>
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="me-2 form-control"
                />
            </div>

            <Table striped bordered hover className="org-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Prices (ILS)</th>
                        <th>Address</th>
                        <th>Tickets</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userEvents.map((event) => {
                        if (
                            event.title
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                        ) {
                            return (
                                <tr key={event.id}>
                                    <td>{event.title}</td>
                                    <td>{event.date.slice(0, 10)}</td>
                                    <td>{event.time.slice(0, 5)}</td>
                                    <td>
                                        {event.price} - {event.max_price}
                                    </td>
                                    <td>{event.address}</td>
                                    <td>{event.quantity_available}</td>
                                    <td>
                                        <Link to={`/update-event/${event.id}`}>
                                            <div className="card bg-warning update-btn">
                                                Update event
                                            </div>
                                        </Link>
                                    </td>
                                    <td>
                                        <Button
                                            className="card bg-danger text-white danger-btn"
                                            onClick={() =>
                                                deleteEvent(event.id)
                                            }
                                        >
                                            Delete event
                                        </Button>
                                    </td>
                                </tr>
                            );
                        }
                        return null;
                    })}
                </tbody>
            </Table>

            <div className="org-logout">
                <button className="btn purple" onClick={(e) => logout(e)}>
                    Logout
                </button>
            </div>
        </Container>
    );
};

export default OrganizerDashboard;
