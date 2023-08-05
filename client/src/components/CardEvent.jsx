import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { TbPigMoney } from "react-icons/tb";
import { IoCalendarOutline, IoPricetagOutline } from "react-icons/io5";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";

const CardEvent = ({ event }) => {
    const {
        title,
        description,
        date,
        time,
        image,
        price,
        category_id,
        location_id,
    } = event;
    const parsedDate = parseISO(date); //  date -> Date object
    const newDateFormat = format(parsedDate, "dd-MM-yyyy");
    const formattedTime = time.substring(0, 5);
    const [categoryName, setCategoryName] = useState("");
    const [locationName, setLocationName] = useState("");

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3005/api/categories/${category_id}`
                );
                setCategoryName(response.data.name);
            } catch (error) {
                console.error("Error fetching category name:", error);
            }
        };

        const fetchLocationName = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3005/api/locations/${location_id}`
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
        <Card>
            <Card.Text className="card__category"> {categoryName}</Card.Text>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Card.Text>
                    <IoCalendarOutline /> {newDateFormat} | {formattedTime}
                </Card.Text>
                <Card.Text>
                    <CiLocationOn /> {locationName}
                </Card.Text>
                <hr />
                <Row className="justify-content-between align-items-center">
                    <Col>
                        <Card.Text>
                            <TbPigMoney /> {price} ILS
                        </Card.Text>
                    </Col>
                    <Col className="card__btn-block">
                        <Button className="purple card__button">
                            Buy ticket
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CardEvent;
