import React, { useState, useEffect } from "react";
import EventsNewest from "../events/EventsNewest";
import { Link } from "react-router-dom";
import EventsByDate from "../events/EventsByDate";
import { Col, Container, Row } from "react-bootstrap";
import { CiLocationOn } from "react-icons/ci";
import { GoCommentDiscussion } from "react-icons/go";
import Header from "../../components/Header";
import LastReviews from "../reviews/LastReviews";
import axios from "axios";

const Home = () => {
    const [selectedLocation, setSelectedLocation] = useState("");
    const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date

    const [filteredEvents, setFilteredEvents] = useState([]); // State for filtered events

    // Function to fetch filtered events by date range
    const fetchFilteredEvents = async () => {
        try {
            const response = await axios.get(`/api/events-by-date`, {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                },
            });
            setFilteredEvents(response.data);
        } catch (error) {
            console.error("Error fetching filtered events:", error);
        }
    };

    // Fetch filtered events whenever startDate or endDate changes
    useEffect(() => {
        if (startDate && endDate) {
            fetchFilteredEvents();
        }
    }, [startDate, endDate]);

    return (
        <div className="home__page">
            <Header />

            <section className="home__filter-date">
                <Container>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            fetchFilteredEvents();
                        }}
                    >
                        <label>
                            Choose Start Date:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <label>
                            Choose End Date:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="btn purple">
                            Find events
                        </button>
                    </form>
                </Container>
            </section>

            {/* Display filtered events or a message if no events found */}
            <section className="home__filtered-events">
                <Container>
                    {/* <h3>Filtered Events</h3> */}
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <div key={event.id}>
                                <h4>{event.title}</h4>
                                {/* Display other event information */}
                            </div>
                        ))
                    ) : (
                        <p>No events found for the selected date.</p>
                    )}
                </Container>
            </section>

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
