import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import jwt from "jsonwebtoken";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const OrganizerDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [userEvents, setUserEvents] = useState([]);
    const [role, setRole] = useState("");
    const { token } = useContext(AppContext);

    const getName = async () => {
        const storageToken = localStorage.getItem("token");

        try {
            const decodedToken = jwt.decode(token || storageToken); // Decode the token

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

                setUsername(data.username);
                setRole(data.role);

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
                    console.log(
                        "userEventsData from OrgDash: ",
                        userEventsData
                    );
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
        getName();
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
            <h3>Hello, {username}</h3>
            <p>You authorized as "{role}"</p>

            <Row className="org__block">
                <Col>
                    <Link to="/create-event">
                        <div className="card bg-success text-white mb-4">
                            Add event
                        </div>
                    </Link>
                </Col>

                <Col>
                    <Link to="/update-event">
                        <div className="card bg-warning text-white mb-4">
                            Update event
                        </div>
                    </Link>
                </Col>

                <Col>
                    <Link to="/create-event">
                        <div className="card bg-danger text-white mb-4">
                            Delete event
                        </div>
                    </Link>
                </Col>
            </Row>

            <h3>Your events:</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Prices (ILS)</th>
                        <th>Address</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userEvents.map((event) => (
                        <tr key={event.id}>
                            <td>{event.title}</td>
                            <td>{event.date.slice(0, 10)}</td>
                            <td>{event.time.slice(0, 5)}</td>
                            <td>
                                {event.price} - {event.max_price}
                            </td>
                            <td>{event.address}</td>
                            <td>
                                <Link to="/update-event">
                                    <div className="card bg-warning">
                                        Update event
                                    </div>
                                </Link>
                            </td>
                            <td>
                                <Link to="/update-event">
                                    <div className="card bg-danger text-white">
                                        Delete event
                                    </div>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <button className="btn purple" onClick={(e) => logout(e)}>
                Logout
            </button>
        </Container>
    );
};

export default OrganizerDashboard;
