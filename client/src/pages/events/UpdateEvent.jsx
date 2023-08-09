import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

const UpdateEvent = ({ eventId }) => {
    const [eventData, setEventData] = useState({});

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/api/events/${eventId}`);
                setEventData(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleUpdateEvent = async () => {
        try {
            await axios.put(`/api/events/${eventId}`, eventData);
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <div>
            <Container>
                <h2>Update Event</h2>
                <input
                    type="text"
                    name="title"
                    value={eventData.title}
                    onChange={handleInputChange}
                />
                <button onClick={handleUpdateEvent} className="btn 0purple">Update Event</button>
            </Container>
        </div>
    );
};

export default UpdateEvent;
