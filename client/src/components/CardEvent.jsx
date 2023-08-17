import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn, CiShoppingCart } from "react-icons/ci";
import { TbPigMoney } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";

const CardEvent = ({ event }) => {
    // Destructuring properties from the event object
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

    const [isFavorite, setIsFavorite] = useState(false);

    // Fetch category and location names
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

    const toggleFavorite = () => {
        setIsFavorite((prevState) => !prevState);
    };

    return (
        <Card className="h-100 mycard">
            <Card.Text className="card__category"> {categoryName}</Card.Text>
            <Link to={`/events/${id}`} className="card__img-bg">
                {quantity_available === 0 ? (
                    <Card.Img variant="top" src={image} className="sold-out" />
                ) : (
                    <Card.Img variant="top" src={image} />
                )}
            </Link>
            <Card.Body>
                <Card.Title as={Link} to={`/events/${id}`}>
                    {title}
                </Card.Title>
                <Card.Text className="card__address">{address}</Card.Text>
                <Card.Text className="card__date">
                    <IoCalendarOutline /> {newDateFormat} | {formattedTime}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                <Card.Text style={{marginBottom: '0'}}>
                    <CiLocationOn /> {locationName}
                </Card.Text>
                <Card.Text>
                    <div
                        className={`favorite-icon ${
                            isFavorite ? "favorited" : ""
                        }`}
                        onClick={toggleFavorite}
                    >
                        {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    </div>
                </Card.Text>
                </div>
                <hr />
                <Row className="align-items-center">
                    <Col>
                        <Card.Text>
                            <TbPigMoney /> {price} ILS
                        </Card.Text>
                    </Col>
                    <Col className="card__btn-block">
                        {quantity_available === 0 ? (
                            <Button className="card__button" disabled>
                                SOLD OUT
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="card__button purple"
                                    as={Link}
                                    to={`/events/${id}`}
                                >
                                    <CiShoppingCart /> Buy ticket
                                </Button>
                            </>
                        )}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CardEvent;
