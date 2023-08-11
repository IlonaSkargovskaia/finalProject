import React, { useState, useEffect, useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const UserDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [purchasedTickets, setPurchasedTickets] = useState([]);
    const { token } = useContext(AppContext);

    const getName = async () => {
        const storageToken = localStorage.getItem("token");

        try {
            const res = await fetch(`/dashboard/`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });

            const data = await res.json();

            setUsername(data.username);
            setRole(data.role);

            // Check if the toast has been shown before
            const toastShown = localStorage.getItem("toastShown");
            if (!toastShown) {
                toast("Login successfully!");
                localStorage.setItem("toastShown", "true"); // Mark as shown
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getPurchasedTickets = async () => {
        const storageToken = localStorage.getItem("token");
        try {
            const decodedToken = jwt.decode(token || storageToken);
            console.log("Decoded token in UserDash:", decodedToken);

            const res = await fetch(`/api/tickets/user/${decodedToken.user}`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch purchased tickets");
            }

            const data = await res.json();
            console.log("Data in userDash: ", data);

            if (Array.isArray(data)) {
                const updatedTickets = await Promise.all(
                    data.map(async (ticket) => {
                        const eventDetails = await fetch(
                            `/api/events/${ticket.eventid}`
                        );
                        const eventData = await eventDetails.json();
                        const updatedTicket = {
                            ...ticket,
                            eventTitle: eventData.title,
                        };
                        return updatedTicket;
                    })
                );
                setPurchasedTickets(updatedTickets);
            } else {
                console.log("Invalid data format received from server:", data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getName();
        getPurchasedTickets();
    }, []);

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
            <Row>
                <Col lg={4} md={12} sm={12} className="mb-4">
                    <h1>Hello, {username}</h1>
                    <p>You authorized as "{role}"</p>

                    <button className="btn purple" onClick={(e) => logout(e)}>
                        Logout
                    </button>
                </Col>
                <Col lg={8} md={12} sm={12} className="mb-4">
                    <div>
                        <Row>
                            <Col>
                                <h2>Your orders on "TicketPRO":</h2>
                            </Col>
                            <Col style={{textAlign: 'right'}}>
                                <Link className="btn purple" to="/">
                                    Choose new event
                                </Link>
                            </Col>
                        </Row>

                        {purchasedTickets.length === 0 ? (
                            <p>You have not purchased any tickets yet.</p>
                        ) : (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Event</th>
                                        <th>Date</th>
                                        <th>Total price</th>
                                        <th>Quantity</th>
                                        <th>Row</th>
                                        <th>Seat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedTickets.map((ticket) => (
                                        <tr key={ticket.id}>
                                            <td>{ticket.eventTitle}</td>
                                            <td>
                                                {ticket.createdat.slice(0, 10)}
                                            </td>
                                            <td>{ticket.total_price} ILS</td>
                                            <td>{ticket.quantity}</td>
                                            <td>{ticket.row}</td>
                                            <td>{ticket.seat_number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDashboard;
