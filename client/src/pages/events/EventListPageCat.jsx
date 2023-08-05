import React, { useEffect, useState } from "react";
import axios from "axios";
import EventsByCategory from "./EventsByCategory";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const BASE_URL = 'http://localhost:3005'

const EventListPageCat = () => {
    const { categoryId } = useParams();
    const [eventsByCategory, setEventsByCategory] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        fetchCategoryAndEvents(categoryId);
    }, [categoryId]);

    const fetchCategoryAndEvents = async (categoryId) => {
        try {
            const categoryResponse = await axios.get(
                `${BASE_URL}/api/categories/${categoryId}`
            );
            setCategoryName(categoryResponse.data.name);

            const eventsResponse = await axios.get(
                `${BASE_URL}/api/events/category/${categoryId}`
            );
            setEventsByCategory(eventsResponse.data);
        } catch (error) {
            console.error("Error fetching category and events:", error);
        }
    };

    return (
        <div>
            <Container >
            <h1>All avaliable events in category "{categoryName}"</h1>
            
            <EventsByCategory events={eventsByCategory} />
            </Container>
        </div>
    );
};

export default EventListPageCat;
