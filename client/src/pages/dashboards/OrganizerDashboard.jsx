import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";

const OrganizerDashboard = ({ setAuth }) => {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
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

    useEffect(() => {
        getName();
    }, []);

    const logout = (e) => {
        e.preventDefault();

        toast.success("Logged out successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("isAuthenticated");
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
            <h1>Hello, {username}</h1>
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

            <p>ADD LIST OF EVENTS CREATED BY THIS ORG !!!!</p>

            <button className="btn purple" onClick={(e) => logout(e)}>
                Logout
            </button>
        </Container>
    );
};

export default OrganizerDashboard;
