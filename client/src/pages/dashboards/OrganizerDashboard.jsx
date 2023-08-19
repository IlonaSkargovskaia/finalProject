import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import Table from "react-bootstrap/Table";
import { CiCalendarDate, CiMedal, CiStar } from "react-icons/ci";
import { PiTicketLight } from "react-icons/pi";
import axios from "axios";
import { format } from "date-fns";
import { BsPlusCircle } from "react-icons/bs";
import { MdEventAvailable } from "react-icons/md";

const OrganizerDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [role, setRole] = useState("");
    const [mail, setMail] = useState("");
    const { token, isAuth } = useContext(AppContext);
    const [ticketCounts, setTicketCounts] = useState({});
    const [totalPurchasedTickets, setTotalPurchasedTickets] = useState(0);
    const [ticketsLeftCount, setTicketLeftCount] = useState(0);
    const [desc, setDesc] = useState("");
    const [totalEventCount, setTotalEventCount] = useState(0); 
    const [eventCounter, setEventCounter] = useState(0);

    useEffect(() => {
        isAuth();
    }, []);

    const getName = async () => {
        // Retrieve token from local storage
        const storageToken = localStorage.getItem("token");

        try {
            // Decode the token to get user information
            const decodedToken = jwt.decode(token || storageToken);
            //console.log("Decoded token in OrgDash:", decodedToken);

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

                const { username, role, description, email } = data;
                setUsername(username);
                setRole(role);
                setDesc(description);
                setMail(email);

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

                     // Update the total event count based on the length of userEventsData
                     setTotalEventCount(userEventsData.length);
                     setEventCounter(userEventsData.length); // Update the counter
                } catch (error) {
                    console.log(error);
                }

                setTotalEventCount(userEvents.length);

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

                    // Fetch purchased ticket counts for each event
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
                    setTotalPurchasedTickets(totalTickets);
                    setTicketLeftCount(totalTicketsLeft);
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
            <h1 className="org-title"> Organizer Dashboard </h1>
            <Row>
                <Col lg={6}>
                    <Row className="org-details">
                        <Col >
                            <p>
                                <b>Welcome, "{username}"</b>
                            </p>
                            <p>Email: {mail}</p>
                            <p>Role: {role}</p>
                        </Col>
                        <Col style={{ textAlign: "right" }}>
                            <Link to="#">
                                <div className="btn bg-light">
                                    Update profile
                                </div>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="org-details">
                        <h4>About organizer: </h4>
                        <p style={{ fontSize: "11px" }}>"{desc}"</p>
                    </Row>
                </Col>
                <Col>
                    <Row className="org__block" style={{    textAlign: 'center'}}>
                        <Col md={6} style={{borderRight: '1px solid black'}}>
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
                        </Col>
                        <Col md={6}>
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
                        </Col>
                    </Row>
                    <Row className="org__block" style={{    textAlign: 'center'}}>
                        <Col md={6} style={{borderRight: '1px solid black'}}>
                        Total Events 
                            <p style={{ fontSize: "45px" }}>
                                <CiCalendarDate
                                    style={{
                                        fontSize: "50px",
                                        marginBottom: "8px",
                                    }}
                                />
                                <span>{eventCounter}</span>
                            </p>
                        </Col>
                        <Col md={6}>
                            Rating
                            <p style={{ fontSize: "45px" }}>
                                <CiStar
                                    style={{
                                        fontSize: "50px",
                                        marginBottom: "8px",
                                    }}
                                />
                                <CiStar
                                    style={{
                                        fontSize: "50px",
                                        marginBottom: "8px",
                                    }}
                                />
                                <CiStar
                                    style={{
                                        fontSize: "50px",
                                        marginBottom: "8px",
                                    }}
                                />
                                
                            </p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* <h3 className="org-titleh3">Your published events</h3> */}
            <div className="org-events__search">
                <input
                    type="text"
                    placeholder="Search events by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="me-2 form-control"
                />

                <h3>Your published events</h3>

                <Link to="/create-event">
                    <div
                        className="btn btn-success"
                        style={{ backgroundColor: "#c0dcca", color: "#0c5d37" }}
                    >
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
                                    <td>
                                        {format(
                                            new Date(event.date),
                                            "d MMMM yyyy"
                                        )}
                                    </td>

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
                                                style={{
                                                    fontSize: "13px",
                                                    backgroundColor:
                                                        "antiquewhite",
                                                }}
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
