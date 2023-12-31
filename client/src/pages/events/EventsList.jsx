import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CardEvent from "../../components/CardEvent";


const EventsList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `/api/events/`
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
            <h2 className="text-center mb-4">All events on "TicketPRO"</h2>
            <Row xs={1} md={3} lg={4} xl={5} className="g-4 px-3">
            
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

export default EventsList;
