import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Stack,
    Button,
    MenuItem,
    Select,
    FormControl,
} from "@mui/material";

import logo from "../assets/logo.png";
import axios from "axios";
import "./navbar.css";

const Navbar = () => {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3030/api/categories")
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Link to="/">
                    <img src={logo} className="logo" alt="ticketpro" />
                </Link>

                <Stack direction="row" spacing={2}>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>

                    <FormControl>
                        <Select
                            className="nav__categories"
                            label="Categories"
                            value={selectedCategory}
                            displayEmpty
                            onChange={handleCategoryChange}
                            style={{ color: "white", marginLeft: "10px" }}
                        >
                            <MenuItem value="">All events</MenuItem>
                            {categories.map(({ id, name }) => {
                                return (
                                    <MenuItem key={id} value={id}>
                                        {name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
