import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {AppBar, Toolbar, Stack, Button} from '@mui/material';
import logo from '../assets/logo.png';
import './navbar.css'



const Navbar = () => {
  return (
    <AppBar position='static'>
        <Toolbar>
            <Link to='/'>
            <img src={logo} className='logo' alt='ticketpro'/>
            </Link>
            <Stack direction='row' spacing={2}>
                <Button color='inherit' component={Link} to='/events'>Home</Button>
            </Stack>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar