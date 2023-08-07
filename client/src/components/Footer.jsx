import React from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Col,
    Container,
    Row,
} from "react-bootstrap";
import { FaFacebookF, FaGithub, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./footer.css";

const Footer = () => {
    return (
        <Container>
            <Row xs={1} md={2} lg={4} gap={4}>
                <Col>
                    <img src={logo} className="footer__logo" alt="ticketpro" />
                    <div className="footer__list-about">
                        <ul>
                            <li>
                                <Link>About us</Link>
                            </li>
                            <li>
                                <Link>Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link>Contacts</Link>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col>
                    <h4>Organizers</h4>
                    <ul>
                        <li>
                            <Link>Organizers dashboard</Link>
                        </li>
                        <li>
                            <Link>How to add new event?</Link>
                        </li>
                        <li>
                            <Link>General information</Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <h4>Help & Contact</h4>
                    <ul>
                        <li>
                            <Link>FAQ</Link>
                        </li>
                        <li>
                            <Link>How can you buy tickets?</Link>
                        </li>
                        <li>
                            <Link>Return the ticket</Link>
                        </li>
                    </ul>
                </Col>
                <Col>
                    <h4>Services</h4>
                    <ul>
                        <li>
                            <Link>Payment methods</Link>
                        </li>
                        <li>
                            <Link>Info about QR</Link>
                        </li>
                        <li>
                            <Link>Gift voucher</Link>
                        </li>
                    </ul>
                </Col>
            </Row>

            <Row xs={1} md={2} lg={2} gap={4} className="my-3">
                <Col>
                    <span style={{color: '#7b1ea2'}}>Sign up now and we'll keep you up to date!</span>
                    <form className="d-flex gap-4 align-items-center">
                        <input
                            type="email"
                            className="form-control my-3 w-50"
                            placeholder="E-mail"
                        />
                        <Button className="btn purple btn-block">Submit</Button>
                    </form>
                </Col>
                <Col className="d-flex align-items-center ">
                    <h4 className="socials__title">Follow us: </h4>
                    <div className="contact__socials mx-4">
                        <a
                            href="https://www.facebook.com/ilonaskars/"
                            className="contact__social-link"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://github.com/IlonaSkargovskaia"
                            className="contact__social-link"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ilona-skargovskaya/"
                            className="contact__social-link"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </Col>
                
            </Row>
        </Container>
    );
};

export default Footer;
