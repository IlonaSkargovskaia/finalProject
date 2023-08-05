import React, { useEffect, useState } from "react";
import axios from "axios";
import EventsByLocation from "../events/EventsByLocation";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const EventListPageCat = () => {
    const { locationId } = useParams();
    const [eventsByLocation, setEventsByLocation] = useState([]);
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        fetchLocationsAndEvents(locationId);
    }, [locationId]);

    const fetchLocationsAndEvents = async (locationId) => {
        try {
            const locationResponse = await axios.get(
                `http://localhost:3005/api/locations/${locationId}`
            );
            setLocationName(locationResponse.data.city);

            const eventsResponse = await axios.get(
                `http://localhost:3005/api/events/location/${locationId}`
            );
            setEventsByLocation(eventsResponse.data);
        } catch (error) {
            console.error("Error fetching location and events:", error);
        }
    };

    //console.log(eventsByLocation);

    return (
        <div>
            <Container >
            <h1>All avaliable events in location "{locationName}"</h1>
            
            <EventsByLocation events={eventsByLocation} />
            </Container>
        </div>
    );
};

export default EventListPageCat;
