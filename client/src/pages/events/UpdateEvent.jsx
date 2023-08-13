import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { AppContext } from "../../App";

const UpdateEvent = () => {
    const { eventId } = useParams();
    //console.log("EventID from UpdEv: ", eventId);
    const { token, isAuth } = useContext(AppContext); 
    const storageToken = localStorage.getItem("token"); 

    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        address: "",
        category_id: "",
        date: "",
        location_id: "",
        max_price: "",
        total_places: "",
        price: "",
        quantity_available: "",
        time: "",
    });

    const {
        title,
        description,
        address,
        category_id,
        date,
        location_id,
        max_price,
        price,
        total_places,
        quantity_available,
        time,
    } = eventData;

    const [locations, setLocations] = useState([]); // State to store locations
    const [selectedLocation, setSelectedLocation] = useState(""); // State for selected location
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null); // State for selected image file

    useEffect(() => {
        isAuth()
    },[])

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/api/events/${eventId}`);
                const eventDataFromServer = response.data;

                // Parse the date and format it as "yyyy-MM-dd"
                const parsedDate = new Date(eventDataFromServer.date);
                const formattedDate = parsedDate.toISOString().split("T")[0];

                // Update the state with formatted date
                setEventData({ ...eventDataFromServer, date: formattedDate });

                // Set the default selected category and location
                setSelectedCategory(eventDataFromServer.category_id);
                setSelectedLocation(eventDataFromServer.location_id);

                console.log("Data in fetch Update Event:", response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        const fetchLocationsAndCategories = async () => {
            try {
                const resLocations = await axios.get(`/api/locations`);
                setLocations(resLocations.data);

                const resCategories = await axios.get(`/api/categories`);
                setCategories(resCategories.data);
            } catch (error) {
                console.log("Error fetching locations and categories", error);
            }
        };
        fetchLocationsAndCategories();
        fetchEvent();
    }, [eventId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    // try {
    //     await axios.put(`/api/events/${eventId}`, eventData);
    // } catch (error) {
    //     console.error("Error updating event:", error);
    // }

    const handleUpdateEvent = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);

            // Upload the image to AWS S3
            const uploadResponse = await axios.post(`/upload`, formData, {
                headers: {
                    Authorization: token || storageToken,
                    "Content-Type": "multipart/form-data",
                },
            });

            const imageUrl = uploadResponse.data.result.url;
            console.log("Image URL:", imageUrl);

            // Update event data with the image URL
            const updatedEventData = {
                ...eventData,
                image: imageUrl,
            };
            console.log("Updated Event Data:", updatedEventData);

            // Make the PUT request to update the event with the new image URL
            const updateResponse = await axios.put(
                `/api/events/${eventId}`,
                updatedEventData
            );
            console.log("Update Response:", updateResponse.data);
            alert('Event updated successfully!')
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <div>
            <Container>
                <h2>Update Event</h2>

                <Form className="add__form" onSubmit={handleUpdateEvent}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                            Title:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleInputChange}
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
                                name="description"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="4">
                            Upload Image:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control
                                type="file"
                                accept=".jpg,.jpeg,.png, .webp"
                                onChange={handleFileChange}
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
                                name="date"
                                value={date}
                                onChange={handleInputChange}
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
                                name="time"
                                value={time}
                                onChange={handleInputChange}
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
                                name="address"
                                value={address}
                                onChange={handleInputChange}
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
                                name="category"
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
                                name="price"
                                value={price}
                                onChange={handleInputChange}
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
                                name="max_price"
                                value={max_price}
                                onChange={handleInputChange}
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
                                name="total_places"
                                value={total_places}
                                onChange={handleInputChange}
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
                                name="quantity_available"
                                value={quantity_available}
                                onChange={handleInputChange}
                                placeholder="0"
                            />
                        </Col>
                    </Form.Group>
                    <Row className="justify-content-between">
                        <Col>
                            <button
                                onClick={handleUpdateEvent}
                                className="btn purple"
                            >
                                Update Event
                            </button>
                        </Col>
                        <Col className="text-end">
                            <Link
                                to="/organizerdashboard"
                                className="btn btn-link "
                            >
                                Back to Organizer Dashboard
                            </Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    );
};

export default UpdateEvent;
