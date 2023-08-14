import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CiStar } from "react-icons/ci";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import QRCode from "react-qr-code";

const UserDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [purchasedTickets, setPurchasedTickets] = useState([]);
    const [userReviews, setUserReviews] = useState([]);
    const { token } = useContext(AppContext);

    const getUserReviews = async () => {
        const storageToken = localStorage.getItem("token");
        try {
            const decodedToken = jwt.decode(token || storageToken);
            const res = await fetch(`/api/reviews/user/${decodedToken.user}`, {
                method: "GET",
                headers: {
                    Authorization: token || storageToken,
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch user reviews");
            }

            const data = await res.json();

            // Fetch event details for each review
            const reviewsWithEventTitles = await Promise.all(
                data.map(async (review) => {
                    const eventDetailsRes = await fetch(
                        `/api/events/${review.eventid}`
                    );
                    const eventDetails = await eventDetailsRes.json();
                    return {
                        ...review,
                        eventTitle: eventDetails.title,
                    };
                })
            );

            console.log("Reviews in userDash: ", reviewsWithEventTitles);
            setUserReviews(reviewsWithEventTitles); // Store the user's reviews
        } catch (error) {
            console.log(error);
        }
    };

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
            //console.log("Decoded token in UserDash:", decodedToken);

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

            const updatedTickets = [];

            for (const ticket of data) {
                console.log("Ticket:", ticket);
                const eventDetailsRes = await fetch(
                    `/api/events/${ticket.eventid}`
                );
                const eventData = await eventDetailsRes.json();
                console.log("eventData:", eventData);

                const placeDetailsRes = await fetch(`/api/places/${ticket.id}`);

                const placeData = await placeDetailsRes.text();
                console.log("Place Data:", placeData);

                if (placeData) {
                    const parsedPlaceData = JSON.parse(placeData);
                    console.log("Parsed Place Data:", parsedPlaceData);

                    const updatedTicket = {
                        ...ticket,
                        eventTitle: eventData.title,
                        row: parsedPlaceData.row,
                        seat: parsedPlaceData.seat,
                    };

                    updatedTickets.push(updatedTicket);
                } else {
                    console.log(
                        "Empty or invalid place data received from API."
                    );
                }
            }
            console.log("Updated Tickets:", updatedTickets);
            setPurchasedTickets(updatedTickets);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getName();
        getPurchasedTickets();
        getUserReviews();
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
                    <Card className="p-3 mb-3 user-dash-prof">
                        <h1>Hello, {username}</h1>
                        <p>You authorized as "{role}"</p>
                    </Card>

                    <h3> Your last comments: </h3>

                    {userReviews.map((review, index) => {
                        return (
                            <Card
                                className="my-3 review-user-card"
                                key={review.id}
                            >
                                <div className="d-flex gap-4">
                                    <div>
                                        Event: <b>{review.eventTitle}</b>
                                    </div>
                                    <div>
                                        Your rating: {review.rating} <CiStar />
                                    </div>
                                </div>

                                <hr />
                                <div className="review-comment">
                                    <i style={{ fontSize: "13px" }}>
                                        {review.comment}
                                    </i>
                                </div>
                            </Card>
                        );
                    })}

                    <button className="btn purple" onClick={(e) => logout(e)}>
                        Logout
                    </button>
                </Col>
                <Col lg={8} md={12} sm={12} className="mb-4">
                    <div>
                        <Row>
                            <Col md={8} sm={6}>
                                <h2>Your orders on "TicketPRO":</h2>
                            </Col>
                            <Col style={{ textAlign: "right" }}>
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
                                        <th>Quantity</th>
                                        <th>Row</th>
                                        <th>Seat</th>
                                         <th>Total price</th>
                                        {/*<th>QRCodes</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {purchasedTickets.map((ticket) => (
                                        
                                        <tr key={ticket.id}>
                                            <td>{ticket.eventTitle}</td>
                                            <td>
                                                {ticket.createdat.slice(0, 10)}
                                            </td>
                                            <td>{ticket.quantity}</td>
                                            <td>{ticket.row}</td>
                                            <td>{ticket.seat}</td>
                                            <td>{ticket.total_price} ILS</td>
                                            {/*<td>
                                                 <div
                                                    style={{ maxWidth: "50px" }}
                                                >
                                                    <QRCode
                                                        value={ticket.uuid_id}
                                                        size={50}
                                                    />
                                                </div> 
                                            </td>*/}
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
