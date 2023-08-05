import React, { useEffect, useState } from "react";
import NewEventForm from "../../components/NewEventForm";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const AddNewEvent = () => {
    const [locations, setLocations] = useState(null);
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchLocationsAndCategories = async () => {
            try {
                const resLocations = await axios.get(
                    "http://localhost:3005/api/locations"
                );
                setLocations(resLocations.data);

                const resCategories = await axios.get(
                    "http://localhost:3005/api/categories"
                );
                setCategories(resCategories.data);
            } catch (error) {
                console.log("Error fetching locations and categories", error);
            }
        };
        fetchLocationsAndCategories();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col sm={8}>
                        {locations && categories ? (
                            <NewEventForm locations={locations} categories={categories} />
                        ) : (
                            <p>Loading ...</p>
                        )}
                    </Col>
                    <Col sm={4}>
                      Right column (think about it later)
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddNewEvent;
