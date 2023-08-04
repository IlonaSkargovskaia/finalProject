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

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
  };

  return (
    <>
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
              <MenuItem value={1}><Link to='/category/1'>Music</Link></MenuItem>
              <MenuItem value={2}><Link to='/category/2'>Movies</Link></MenuItem>
              <MenuItem value={3}><Link to='/category/3'>Conference</Link></MenuItem>
              <MenuItem value={4}><Link to='/category/4'>Humor</Link></MenuItem>
              <MenuItem value={5}><Link to='/category/5'>Sport</Link></MenuItem>
              <MenuItem value={6}><Link to='/category/6'>Children</Link></MenuItem>
              
            </Select>
          </FormControl>
        </Stack>
      </Toolbar>
    </AppBar>


    </>
  );
};

export default Navbar;
