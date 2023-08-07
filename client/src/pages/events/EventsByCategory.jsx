import React from "react";
import CardEvent from "../../components/CardEvent";
import { Row, Col } from "react-bootstrap";


const EventsByCategory = (props) => {
    const { events } = props;
    return (
        <div>
            
            <Row xs={1} md={2} lg={4} className="g-4">
                {events && events.length > 0 ? (
                    events.map((item, index) => (
                        <Col key={index}>
                            <CardEvent key={item.id} event={item} />
                        </Col>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </Row>
        </div>
    );
};

export default EventsByCategory;
