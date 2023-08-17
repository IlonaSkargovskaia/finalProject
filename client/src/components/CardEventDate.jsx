import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn, CiShoppingCart } from "react-icons/ci";
import { IoCalendarOutline } from "react-icons/io5";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";

const CardEventDate = ({ event }) => {
    // Destructuring properties from the event object from props
    const {
        id,
        title,
        description,
        date,
        time,
        image,
        price,
        quantity_available,
        category_id,
        location_id,
        address,
    } = event;
    // Parse and format the date and time
    const parsedDate = parseISO(date); //  date -> Date object
    const newDateFormat = format(parsedDate, "d MMMM yyyy");
    const formattedTime = time.substring(0, 5);
    const [categoryName, setCategoryName] = useState("");
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await axios.get(
                    `/api/categories/${category_id}`
                );
                setCategoryName(response.data.name);
            } catch (error) {
                console.error("Error fetching category name:", error);
            }
        };

        const fetchLocationName = async () => {
            try {
                const response = await axios.get(
                    `/api/locations/${location_id}`
                );
                setLocationName(response.data.city);
            } catch (error) {
                console.error("Error fetching location name:", error);
            }
        };

        fetchCategoryName();
        fetchLocationName();
    }, [category_id, location_id]);
    return (
        <Card className="h-100 mycard mycard-date">
            <Card.Text className="card__category"> {categoryName}</Card.Text>
            {/* <Link to={`/events/${id}`} className="card__img-bg">
                {quantity_available === 0 ? (
                    <Card.Img variant="top" src={image} className="sold-out" />
                ) : (
                    <Card.Img variant="top" src={image} />
                )}
            </Link> */}
            <Card.Body style={{ background: "#f0f0f2" }}>
                <Card.Title as={Link} to={`/events/${id}`}>
                    {title}
                </Card.Title>
                {/* <Card.Text className="card__address">{address}</Card.Text> */}
                <Card.Text className="card__date">
                    <IoCalendarOutline /> {newDateFormat} | {formattedTime}
                </Card.Text>
                <Card.Text className="card__date-price">
                    {quantity_available === 0
                        ? `no tickets`
                        : `from ${price} ILS `}
                </Card.Text>
                <Card.Text>
                    <CiLocationOn /> {locationName}
                </Card.Text>
                <hr />
                <Row className="align-items-center">
                    <Col>
                        {quantity_available === 0 ? (
                            <Button className="card__button" disabled>
                                SOLD OUT
                            </Button>
                        ) : (
                            <Button
                                className="card__button purple"
                                as={Link}
                                to={`/events/${id}`}
                            >
                                <CiShoppingCart /> Buy ticket
                            </Button>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CardEventDate;
