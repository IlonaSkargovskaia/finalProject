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

  const fetchEvents = async (categoryId = '') => {
    try {
      const response = await axios.get(
        `http://localhost:3005/api/events/category/${categoryId}`
      );
      console.log(response.data);
      // Process the events data from the response if needed
      // For example, you can setEvents(response.data) if you want to update the state with the fetched events.
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    console.log(selectedCategoryId);
    setSelectedCategory(selectedCategoryId);
    fetchEvents(selectedCategoryId);
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
              <MenuItem value={1}>Music</MenuItem>
              <MenuItem value={2}>Movies</MenuItem>
              <MenuItem value={3}>Conference</MenuItem>
              <MenuItem value={4}>Humor</MenuItem>
              <MenuItem value={5}>Sport</MenuItem>
              <MenuItem value={6}>Children</MenuItem>
              
            </Select>
          </FormControl>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
