import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const NewEventForm = (props) => {
    const { locations, categories } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEvent = {
            title,
            description,
            date,
            time,
            location_id: selectedLocation,
            category_id: selectedCategory,
            price,
        };

        try {
            const res = await axios.post(
                "http://localhost:3005/api/events",
                newEvent
            );
            console.log("New event added successfully", res.data);

            // Clear the form fields after successful submission
            setTitle("");
            setDescription("");
            setDate("");
            setTime("");
            setSelectedLocation("");
            setSelectedCategory("");
            setPrice("");
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <>
                <h3>Create new event: </h3>
                <Form onSubmit={handleSubmit} className="add__form">
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Title:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Description:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Date:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Time:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Location:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                value={selectedLocation}
                                onChange={(e) =>
                                    setSelectedLocation(e.target.value)
                                }
                            >
                                <option value="">Select location:</option>
                                {locations.map((item, index) => (
                                    <option value={item.id} key={index}>
                                        {item.city}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Category:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) =>
                                    setSelectedCategory(e.target.value)
                                }
                            >
                                <option value="">Select category</option>
                                {categories.map((item, index) => (
                                    <option value={item.id} key={index}>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="2">
                            Price:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Col>
                    </Form.Group>

                    <Button type="submit">Add Event</Button>
                </Form>
            
        </>
    );
};

export default NewEventForm;
