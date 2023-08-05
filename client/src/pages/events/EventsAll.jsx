import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import CardEvent from "../../components/CardEvent";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

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
            {/* <Row xs={1} md={2} lg={4} className="g-4"> */}
            <Carousel responsive={responsive} swipeable={true} >
                {events.map((event, index) => {
                    return (
                        <Col key={index}>
                            <CardEvent event={event} />
                        </Col>
                    );
                })}
            </Carousel>
            {/* </Row> */}
        </div>
    );
};

export default EventsAll;
