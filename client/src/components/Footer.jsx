import React from 'react'
import { Container } from 'react-bootstrap';
import logo from "../assets/logo.png";
import './footer.css';

const Footer = () => {
  return (
    <Container>
      <img src={logo} className='footer__logo'/>
    </Container>
  )
}

export default Footer