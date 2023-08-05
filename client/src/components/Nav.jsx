import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

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

const Navigation = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleLocationChange = (event) => {
        
        setSelectedLocation(event.target.value);
    };

    return (
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
                                {" "}
                                Music
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/2"
                                value={2}
                                onClick={handleCategoryChange}
                            >
                                {" "}
                                Movies
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/3"
                                value={3}
                                onClick={handleCategoryChange}
                            >
                                {" "}
                                Conference
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/4"
                                value={4}
                                onClick={handleCategoryChange}
                            >
                                {" "}
                                Humor
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/5"
                                value={5}
                                onClick={handleCategoryChange}
                            >
                                {" "}
                                Sport
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/category/6"
                                value={6}
                                onClick={handleCategoryChange}
                            >
                                {" "}
                                Children
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
                                {" "}
                                North
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/location/2"
                                value={2}
                                onClick={handleLocationChange}
                            >
                                {" "}
                                South
                            </NavDropdown.Item>
                            <NavDropdown.Item
                                as={Link}
                                to="/location/3"
                                value={3}
                                onClick={handleLocationChange}
                            >
                                {" "}
                                Center
                            </NavDropdown.Item>
                            
                        </NavDropdown>

                        <Nav.Link href="/create-event">Add event</Nav.Link>
                    </Nav>

                    <Form className="d-flex">
                        <InputGroup>
                            <InputGroup.Text className="bg-white">
                                <CiSearch />
                            </InputGroup.Text>
                            <FormControl
                                type="search"
                                className="me-2"
                                placeholder="Search"
                            />
                        </InputGroup>
                    </Form>

                    <Stack direction="horizontal" gap={3}>
                        <Button variant="light">Log in</Button>
                        <div className="vr" />
                        <Button variant="outline-light">Sign in</Button>
                    </Stack>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
