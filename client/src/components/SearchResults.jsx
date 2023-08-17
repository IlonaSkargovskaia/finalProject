import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CardEvent from "./CardEvent";
import RightCategories from "./RightCategories";

const SearchResults = ({ events }) => {
    // Get the current location object from react-router-dom
    const location = useLocation();

    // Extract the search query parameter from the URL
    const searchQuery = new URLSearchParams(location.search).get("q");

    // Filter events based on the search query
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <Container>
                <h2>Search results for: {searchQuery}</h2>
                <Row>
                    <Col>
                        {filteredEvents && filteredEvents.length > 0 ? (
                            filteredEvents.map((event, index) => (
                                <Col key={index}>
                                    <CardEvent event={event} />
                                </Col>
                            ))
                        ) : (
                            <p>No events found.</p>
                        )}
                   </Col>
                   <Col md={4}>
                        <RightCategories />
                   </Col>
                    
                </Row>
            </Container>
        </div>
    );
};

export default SearchResults;
