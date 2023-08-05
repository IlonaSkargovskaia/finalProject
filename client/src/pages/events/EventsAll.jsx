import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CardEvent from "../../components/CardEvent";

const EventsAll = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3005/api/events/`
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <Row xs={1} md={2} lg={4} className="g-4">
                {events.map((event, index) => {
                    return (
                        <Col key={index}>
                            <CardEvent event={event} />
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default EventsAll;
