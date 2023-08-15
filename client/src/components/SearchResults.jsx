import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CardEvent from "./CardEvent";

const SearchResults = ({ events }) => {
    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get("q");

    // Use the search query from the URL param to filter events
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Container>
                <h2>Search Results for: {searchQuery}</h2>
                <Row>
                    
                        {filteredEvents && filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                                <Col key={index}>
                                    <CardEvent event={event} />
                                </Col>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                   
                    
                </Row>
            </Container>
        </div>
    );
};

export default SearchResults;
