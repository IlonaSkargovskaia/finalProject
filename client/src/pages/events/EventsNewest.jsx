import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Container } from "react-bootstrap";
import CardEvent from "../../components/CardEvent";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { BsLightningCharge } from "react-icons/bs";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1200 },
        items: 4,
    },
    smalldesktop: {
        breakpoint: { max: 1200, min: 900 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 900, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const EventsNewest = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`/api/events-last/`);
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <section className="events__new-home">
            <Container>
                <h2><BsLightningCharge />New on "TicketPRO"</h2>
                {/* <Row xs={1} md={2} lg={4} className="g-4"> */}
                <Carousel responsive={responsive} swipeable={true}>
                    {events.map((event, index) => {
                        return (
                            <Col key={index}>
                                <CardEvent event={event} />
                            </Col>
                        );
                    })}
                </Carousel>
                {/* </Row> */}
            </Container>
        </section>
    );
};

export default EventsNewest;
