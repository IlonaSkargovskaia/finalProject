import React, { useState,useContext } from "react";
import { CiSearch, CiUser } from "react-icons/ci";
import { BsPersonCheck, BsPersonCircle, BsPersonPlus } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import {
    Navbar,
    NavDropdown,
    Nav,
    Stack,
    Form,
    Container,
    Button,
    InputGroup,
    FormControl,
} from "react-bootstrap";
import logo from "../assets/logo.png";
import "./navbar.css";
import Breadcrumbs from "./Breadcrumbs";

const Navigation = ({
    setIsAuthenticated,
    isAuthenticated,
    username,
    userRole,
}) => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    

    const navigate = useNavigate();

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handleSearchInput = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();

        navigate(`/search?q=${searchQuery}`);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");

        setIsAuthenticated(false);
        // Redirect to the login page
        navigate("/login");
    };

    return (
        <>
            <Navbar expand="lg" className="nav__menu">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={logo} className="logo" alt="ticketpro" />
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="navbarScroll"
                        className="white-toggle"
                    />

                    <Navbar.Collapse id="navbarScroll">
                        <Nav.Link href="/events" style={{marginRight: '15px'}}>All events </Nav.Link>
                        <Nav className="me-auto my-2 my-lg-0" navbarScroll>
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
                            <Nav.Link href="/reviews" >Reviews </Nav.Link>
                        </Nav>
                        

                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <InputGroup className="search__top">
                                <InputGroup.Text className="bg-white">
                                    <CiSearch />
                                </InputGroup.Text>
                                <FormControl
                                    type="search"
                                    className="me-2"
                                    placeholder="Search events.."
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                />
                            </InputGroup>
                        </Form>

                        <Stack direction="horizontal" gap={3}>
                            {isAuthenticated ? (
                                <>
                                    {userRole === "organizer" ? (
                                        <Button
                                            variant="light"
                                            as={Link}
                                            to="/organizerdashboard"
                                        >
                                            <BsPersonCircle className="login-icon"/> Profile
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="light"
                                            as={Link}
                                            to="/userdashboard"
                                        >
                                            <BsPersonCircle className="login-icon"/> Profile
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
                                    <Button
                                        variant="light"
                                        as={Link}
                                        to="/login"
                                    >
                                        <BsPersonCheck className="login-icon"/>Login
                                    </Button>
                                    <div className="vr" />
                                    <Button
                                        variant="outline-light"
                                        as={Link}
                                        to="/register"
                                    >
                                        <BsPersonPlus className="register-icon"/> Sign up
                                    </Button>
                                </>
                            )}
                        </Stack>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <Breadcrumbs />
            </Container>
        </>
    );
};

export default Navigation;
