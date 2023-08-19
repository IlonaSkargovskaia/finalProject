import React, { useState, useContext } from "react";
import { BsPersonCheck, BsPersonCircle, BsPersonPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import {
    Navbar,
    NavDropdown,
    Nav,
    Stack,
    Container,
    Button,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import "./navbar.css";
import Breadcrumbs from "./Breadcrumbs";
import GoogleTranslate from "./GoogleTranslate";
import PastEvents from "../pages/events/PastEvents";
import { CiSettings } from "react-icons/ci";

const Navigation = ({
    setIsAuthenticated,
    isAuthenticated,
    username,
    userRole,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

     // Access context for user verification
    const { isVerify } = useContext(AppContext);

     // Navigate function for routing
    const navigate = useNavigate();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleLogout = () => {
        // Remove token from local storage
        localStorage.removeItem("token");

        // Set authentication status to false
        setIsAuthenticated(false);
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <>
            <Navbar expand="lg" className="nav__menu p-4">
               
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="logo" alt="ticketpro" />
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="navbarScroll"
                    className="white-toggle"
                />

                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link
                            href="/events"
                            style={{ marginRight: "15px" }}
                        >
                            All events{" "}
                        </Nav.Link>
                        <NavDropdown
                            title="Categories"
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item
                                as={Link}
                                to="/category/1"
                                value={1}
                                onClick={handleCategoryChange}
                            >
                                Music
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/2"
                                value={2}
                                onClick={handleCategoryChange}
                            >
                                Movies
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/3"
                                value={3}
                                onClick={handleCategoryChange}
                            >
                                Conference
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/4"
                                value={4}
                                onClick={handleCategoryChange}
                            >
                                Festivals
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/5"
                                value={5}
                                onClick={handleCategoryChange}
                            >
                                Sports
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/6"
                                value={6}
                                onClick={handleCategoryChange}
                            >
                                Kids
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title="Locations"
                            id="navbarScrollingDropdown"
                        >
                            <NavDropdown.Item
                                as={Link}
                                to="/location/1"
                                value={1}
                                onClick={handleLocationChange}
                            >
                                North
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/location/2"
                                value={2}
                                onClick={handleLocationChange}
                            >
                                South
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/location/3"
                                value={3}
                                onClick={handleLocationChange}
                            >
                                Center
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/reviews">Reviews </Nav.Link>
                        <Nav.Link href="/past-events">Past events </Nav.Link>
                    </Nav>

                    

                    <Stack direction="horizontal" gap={3}>
                    <GoogleTranslate />
                        {isAuthenticated ? (
                            <>
                                {userRole === "organizer" ? (
                                    <Button
                                        variant="light"
                                        as={Link}
                                        to="/organizerdashboard"
                                    >
                                        <CiSettings className="login-icon" />{" "}
                                        Org Dash
                                    </Button>
                                ) : (
                                    <Button
                                        variant="light"
                                        as={Link}
                                        to="/userdashboard"
                                    >
                                        <BsPersonCircle className="login-icon" />{" "}
                                        My profile
                                    </Button>
                                )}

                                <div className="vr" />

                                <Button
                                    variant="outline-light"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button variant="light" as={Link} to="/login">
                                    <BsPersonCheck className="login-icon" />
                                    Login
                                </Button>
                                <div className="vr" />
                                <Button
                                    variant="outline-light"
                                    as={Link}
                                    to="/register"
                                >
                                    <BsPersonPlus className="register-icon" />{" "}
                                    Sign up
                                </Button>
                            </>
                        )}
                    </Stack>
                </Navbar.Collapse>
            </Navbar>

            <Container>
                <Breadcrumbs />
            </Container>
        </>
    );
};

export default Navigation;
