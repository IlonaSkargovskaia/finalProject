import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiLocationOn, CiShoppingCart } from "react-icons/ci";
import { TbPigMoney } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { format, parseISO } from "date-fns";


const CardEvent = ({ event }) => {
    
    const {
        id,
        title,
        description,
        date,
        time,
        image,
        price,
        category_id,
        location_id,
        address
    } = event;
    // console.log(id);
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
        <Card className="h-100 mycard" >
            <Card.Text className="card__category"> {categoryName}</Card.Text>
            <Link to={`/events/${id}`} className="card__img-bg">
                <Card.Img variant="top" src={image} />
            </Link>
            <Card.Body>
                <Card.Title as={Link} to={`/events/${id}`}>{title}</Card.Title>
                <Card.Text className="card__address">{address}</Card.Text>
                <Card.Text className="card__date">
                    <IoCalendarOutline /> {newDateFormat} | {formattedTime}
                </Card.Text>
                <Card.Text>
                    <CiLocationOn /> {locationName} 
                </Card.Text>
                <hr />
                <Row className="align-items-center">
                    <Col>
                        <Card.Text>
                            <TbPigMoney /> {price} ILS
                        </Card.Text>
                    </Col>
                    <Col className="card__btn-block">
                        <Button className="card__button purple" as={Link} to={`/events/${id}`}>
                            <CiShoppingCart /> Buy ticket
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default CardEvent;
