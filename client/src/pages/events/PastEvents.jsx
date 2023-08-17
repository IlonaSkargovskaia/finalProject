import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);

    useEffect(() => {
        fetchPastEvents();
    }, []);

    const fetchPastEvents = async () => {
        try {
            const response = await fetch("/api/past-events");
            const data = await response.json();
            setPastEvents(data);
        } catch (error) {
            console.error("Error fetching past events:", error);
        }
    };

    return (
        <Container>
            <h2>Past Events</h2>
            <div>
                {pastEvents.map((event) => (
                    <Row key={event.id}>
                        <Card>
                            <div class="row no-gutters">
                                <div class="col-sm-5 past-img">
                                    <img src={event.image} alt={event.title} />
                                </div>
                                <div class="col-sm-7">
                                    <div class="card-body">
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                        <p>Date: {event.date.slice(0, 10)}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Row>
                ))}
            </div>
        </Container>
    );
};

export default PastEvents;
