import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Navbar, NavDropdown, Nav, Stack, Form, Container, Button } from 'react-bootstrap';
import logo from "../assets/logo.png";
import "./navbar.css";

const Navigation = () => {
    const [selectedCategory, setSelectedCategory] = useState("");


    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        
    };

    return (
        
        <Navbar expand="lg" className="nav__menu">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={logo} className="logo" alt="ticketpro" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" className="white-toggle"/>
                <Navbar.Collapse id="navbarScroll">

                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        <Nav.Link href="/">Home</Nav.Link>

                        <NavDropdown title= 'All events'
                                    id="navbarScrollingDropdown">

                            <NavDropdown.Item as={Link}
                                to="/category/1" value={1}
                                onClick={handleCategoryChange}
                            > Music</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                to="/category/2" value={2}
                                onClick={handleCategoryChange}
                            > Movies</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                to="/category/3" value={3}
                                onClick={handleCategoryChange}
                            > Conference</NavDropdown.Item>
                             <NavDropdown.Item as={Link}
                                to="/category/4" value={4}
                                onClick={handleCategoryChange}
                            > Humor</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                to="/category/5" value={5}
                                onClick={handleCategoryChange}
                            > Sport</NavDropdown.Item>
                            <NavDropdown.Item as={Link}
                                to="/category/6" value={6}
                                onClick={handleCategoryChange}
                            > Children</NavDropdown.Item>
                            
                        </NavDropdown>
                        
                    </Nav>

                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        
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
