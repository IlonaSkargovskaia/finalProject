import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { CiMedal } from "react-icons/ci";
import { PiTicketLight } from "react-icons/pi";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { BsPlusCircle } from "react-icons/bs";

const OrganizerDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState("");
    const [ticketsLeftCount, setTicketLeftCount] = useState(0);
    const [desc, setDesc] = useState("");
    const { token, isAuth } = useContext(AppContext);
    const [ticketCounts, setTicketCounts] = useState({});
    const [totalPurchasedTickets, setTotalPurchasedTickets] = useState(0);

    useEffect(() => {
        isAuth();
    }, []);

    const getName = async () => {
        // Retrieve token from local storage
        const storageToken = localStorage.getItem("token");

        try {
            // Decode the token to get user information
            const decodedToken = jwt.decode(token || storageToken);
            // console.log("Decoded token in OrgDash:", decodedToken);

            if (decodedToken) {
                // Fetch user's information
                const res = await fetch(`/dashboard/`, {
                    method: "GET",
                    headers: {
                        Authorization: token || storageToken,
                    },
                });

                const data = await res.json();
                //console.log("data from OrganizerDash: ", data);

                const { username, role, description } = data;
                setUsername(username);
                setRole(role);
                setDesc(description);

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

    // Fetch user's information and events when the component mounts or the token changes
    useEffect(() => {
        const storageToken = localStorage.getItem("token");
        const decodedToken = jwt.decode(token || storageToken);

        if (decodedToken) {
            getName();

            // Fetch events with search query
            const fetchUserEvents = async () => {
                let totalTickets = 0;
                let totalTicketsLeft = 0;
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

                    const ticketCountsMap = {};
                    for (const event of userEventsData) {
                        try {
                            const ticketCountResponse = await fetch(
                                `/api/places/purchased-ticket-counts/event/${event.id}`,
                                {
                                    method: "GET",
                                    headers: {
                                        Authorization: token || storageToken,
                                    },
                                }
                            );

                            const ticketCountData =
                                await ticketCountResponse.json();
                            ticketCountsMap[event.id] = ticketCountData.count;

                            // Update the total count of purchased tickets
                            totalTickets += parseInt(ticketCountData.count);

                            // Update the total count of tickets left
                            totalTicketsLeft += parseInt(
                                event.quantity_available
                            );
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    setTicketCounts(ticketCountsMap);
                    setTotalPurchasedTickets(totalTickets); // Set the total count
                    setTicketLeftCount(totalTicketsLeft);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchUserEvents();
        }
    }, [token]);

    const deleteEvent = async (eventId) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        //block code if false
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
            <h1 className="org-title">Organizer Dashboard for "{username}" </h1>
            <Row>
                <Col></Col>
                <Col style={{ textAlign: "right" }}>
                    <Link to="#">
                        <div className="btn bg-light">Update profile</div>
                    </Link>
                </Col>
            </Row>

            <Row className="org__block">
                <Col>
                    <p>
                        Purchased Tickets
                        <p style={{ fontSize: "45px" }}>
                            <CiMedal
                                style={{
                                    fontSize: "50px",
                                    marginBottom: "8px",
                                }}
                            />
                            <span>{totalPurchasedTickets}</span>
                        </p>
                    </p>
                </Col>
                <Col>
                    <p>
                        Tickets Left
                        <p style={{ fontSize: "45px" }}>
                            <PiTicketLight
                                style={{
                                    fontSize: "50px",
                                    marginBottom: "8px",
                                }}
                            />
                            <span>{ticketsLeftCount}</span>
                        </p>
                    </p>
                </Col>
                <Col lg={7}>
                    <p style={{fontSize: '14px'}}>"{desc}"</p>
                </Col>
            </Row>

            <h3 style={{ textAlign: "center" }}>Your published events</h3>
            <div className="org-events__search">
                <input
                    type="text"
                    placeholder="Search events by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="me-2 form-control"
                />
                <Link to="/create-event">
                    <div className="btn btn-success">
                        <BsPlusCircle />
                        Add new event
                    </div>
                </Link>
            </div>

            <Table striped bordered hover className="org-table">
                <thead>
                    <tr>
                        <th>Tickets sold</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Prices (ILS)</th>
                        <th>Address</th>
                        <th>Tickets left</th>
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
                                    <td
                                        className={
                                            ticketCounts[event.id] === "0"
                                                ? "td-red"
                                                : "td-green"
                                        }
                                    >
                                        {ticketCounts[event.id] || 0} /
                                        {event.total_places}
                                    </td>
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
                                            <div
                                                className="btn btn-warning"
                                                style={{ fontSize: "13px" }}
                                            >
                                                <GoPencil /> Update
                                            </div>
                                        </Link>
                                    </td>
                                    <td style={{ textAlign: "center" }}>
                                        <Button
                                            className=" btn btn-danger "
                                            onClick={() =>
                                                deleteEvent(event.id)
                                            }
                                            style={{ fontSize: "13px" }}
                                        >
                                            <AiOutlineDelete /> Delete
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
