import React, { useState } from "react";
import EventsNewest from "../events/EventsNewest";
import { Link } from "react-router-dom";
import EventsByDate from "../events/EventsByDate";
import { Col, Container, Row } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { GoCommentDiscussion } from "react-icons/go";
import Header from "../../components/Header";
import LastReviews from "../reviews/LastReviews";

const Home = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    return (
        <div className="home__page">
            <Header />

            <EventsByDate />

            <section className="home__locations">
                <Container>
                    <div className="choose-location-section">
                        <Row className="location-links">
                            <Col>
                                <h3>
                                    {" "}
                                    <CiLocationOn /> Choose location:{" "}
                                </h3>
                            </Col>

                            <Col>
                                <Link
                                    to="/location/1"
                                    onClick={() => setSelectedLocation(1)}
                                    className="location__north"
                                >
                                    North
                                </Link>
                            </Col>
                            <Col>
                                <Link
                                    to="/location/3"
                                    onClick={() => setSelectedLocation(3)}
                                    className="location__center"
                                >
                                    Center
                                </Link>
                            </Col>
                            <Col>
                                <Link
                                    to="/location/2"
                                    onClick={() => setSelectedLocation(2)}
                                    className="location__south"
                                >
                                    South
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>

            <EventsNewest />

            <Container style={{ padding: "50px 0 30px 0" }}>
                <LastReviews />
                <div style={{ textAlign: "center" }}>
                    <Link
                        to="/reviews"
                        className="btn btn-outline-dark"
                        style={{ maxWidth: "200px", margin: "auto" }}
                    >
                        <GoCommentDiscussion /> Add new comment
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Home;
