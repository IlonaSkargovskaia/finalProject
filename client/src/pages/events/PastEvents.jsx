import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container } from "react-bootstrap";
import { format } from "date-fns";
import RightCategories from "../../components/RightCategories";
import ReviewForm from "../reviews/ReviewForm";
import ReviewFormPast from "../reviews/ReviewFormPast";
import { AiOutlineComment } from "react-icons/ai";

const PastEvents = () => {
    const [pastEvents, setPastEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        fetchPastEvents();
    }, []);

    const fetchPastEvents = async () => {
        try {
            const response = await fetch("/api/past-events");
            const data = await response.json();

            const adjustedEvents = data.map((event) => ({
                ...event,
                // Parse date string to Date object
                date: new Date(event.date), // Assuming event.date is a string in a format recognized by Date.parse()
            }));
            setPastEvents(adjustedEvents);
        } catch (error) {
            console.error("Error fetching past events:", error);
        }
    };

    const handleAddComment = (event) => {
        setSelectedEvent(event);
    };

    return (
        <Container>
            <h2>Past Events</h2>
            <Row>
                <Col>
                    {pastEvents.map((event) => (
                        <Row key={event.id}>
                            <Col>
                                <Card style={{ marginBottom: "20px" }}>
                                    <div className="row no-gutters">
                                        <div className="col-lg-5 past-img">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                            />
                                        </div>
                                        <div className="col-lg-7">
                                            <div className="card-body">
                                                <h3>{event.title}</h3>
                                                <p>
                                                    Date:{" "}
                                                    {format(
                                                        event.date,
                                                        "yyyy-MM-dd"
                                                    )}
                                                </p>
                                                <hr />
                                                <p>{event.description}</p>
                                            </div>
                                            <Button
                                                variant="primary purple"
                                                onClick={() =>
                                                    handleAddComment(event)
                                                }
                                                style={{
                                                    margin: "0 0 20px 15px",
                                                }}
                                            >
                                                <AiOutlineComment />
                                                Add comment
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                                {selectedEvent && (
                                    <ReviewFormPast
                                        selectedEvent={selectedEvent}
                                        setSelectedEvent={setSelectedEvent}
                                    />
                                )}
                            </Col>
                        </Row>
                    ))}
                </Col>

                <Col lg={4}>
                    <RightCategories />

                    <Card className="mt-3 p-3">
                        <h3>Last news:</h3>
                    </Card>

                    <Card className="mt-3 p-3">
                        <h3>About organizer:</h3>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PastEvents;
