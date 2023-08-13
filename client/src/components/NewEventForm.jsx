import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { AppContext } from "../App";
import jwt from "jsonwebtoken";

const NewEventForm = (props) => {
    const { locations, categories } = props;
    const { token ,isAuth} = useContext(AppContext);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [quantityAvailable, setQuantityAvailable] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [totalPlaces, setTotalPlaces] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        isAuth()
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const storageToken = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const uploadResponse = await axios.post(`/upload`, formData, {
                headers: {
                    Authorization: token || storageToken,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            const imageUrl = uploadResponse.data.result.url;

            const newEvent = {
                title,
                description,
                date,
                time,
                location_id: selectedLocation,
                category_id: selectedCategory,
                price,
                address,
                quantity_available: quantityAvailable,
                max_price: maxPrice,
                total_places: totalPlaces,
                image: imageUrl, // Add the image URL to the newEvent object
            };

        
            const decodedToken = jwt.decode(token || storageToken);
            //console.log(decodedToken);

            if (decodedToken) {
                const userId = decodedToken.user;
                newEvent.user_id = userId;
                

                const res = await axios.post(`/api/events`, newEvent, {
                    headers: {
                        Authorization: token || storageToken,
                    },
                });

        
                console.log("Token:", token);
                console.log("Local token", storageToken);
                alert("New event added successfully", res.data);

                // Clear the form fields after successful submission
                setTitle("");
                setDescription("");
                setDate("");
                setTime("");
                setSelectedLocation("");
                setSelectedCategory("");
                setPrice("");
                setAddress("");
                setQuantityAvailable("");
                setMaxPrice("");
                setTotalPlaces("");
                setSelectedFile(null);
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedFile(selectedFile);
    };

    return (
        <>
            <h3>Create new event: </h3>
            <Form
                onSubmit={handleSubmit}
                className="add__form"
                encType="multipart/form-data"
            >
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Title:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Description:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Upload File:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="file"
                            accept=".jpg,.jpeg,.png, .webp" // Add accepted file types here
                            onChange={(e) => handleFileChange(e)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Date:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Time:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Location:
                    </Form.Label>
                    <Col sm="8">
                        {locations.map((item, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                label={item.city}
                                name="locationRadio"
                                value={item.id}
                                checked={selectedLocation === item.id}
                                onChange={(e) =>
                                    setSelectedLocation(e.target.value)
                                }
                            />
                        ))}
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Address:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Category:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={(e) =>
                                setSelectedCategory(e.target.value)
                            }
                        >
                            <option value="">select category...</option>
                            {categories.map((item, index) => (
                                <option value={item.id} key={index}>
                                    {item.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Min price (ILS):
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="0"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Max price (ILS):
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="0"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Total count of places:
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            value={totalPlaces}
                            onChange={(e) => setTotalPlaces(e.target.value)}
                            placeholder="0"
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">
                        Number of tickets (available):
                    </Form.Label>
                    <Col sm="8">
                        <Form.Control
                            type="number"
                            value={quantityAvailable}
                            onChange={(e) =>
                                setQuantityAvailable(e.target.value)
                            }
                            placeholder="0"
                        />
                    </Col>
                </Form.Group>

                <Button type="submit">Add Event</Button>
            </Form>
        </>
    );
};

export default NewEventForm;
