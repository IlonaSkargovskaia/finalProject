import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { CiLocationOn, CiCalendarDate, CiShoppingCart } from "react-icons/ci";
import {PiTicketThin} from "react-icons/pi"

const EventDetail = () => {
    const [event, setEvent] = useState({});
    const params = useParams();

    const {
        title,
        description,
        date,
        image,
        location_id,
        price,
        time,
        category_id,
        address
    } = event;

    useEffect(() => {
        const getEventById = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3005/api/events/${params.id}`
                );
                setEvent(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEventById();
    }, []);

    const hasDateTime = date && time;

    const parsedDate = parseISO(date); //  date -> Date object
    const formattedDate = hasDateTime
        ? format(parsedDate, "d MMMM yyyy, (cccc)")
        : "Loading...";

    const formattedTime = hasDateTime ? time.slice(0, 5) : "";

    return (
        <div>
            <Container>
                <Row>
                    <Col md={8} sm={12}>
                        <Card className="event__detail">
                            <Card.Header>
                                <Card.Img variant="left" src={image} />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text> <CiCalendarDate /> 
                                    {hasDateTime
                                        ? ` ${formattedDate} | ${formattedTime}`
                                        : "Loading..."}
                                </Card.Text>
                                <Card.Text>{description} </Card.Text>
                                <Card.Text><PiTicketThin /> Price: {price} ILS</Card.Text>
                                <Button className="purple"><CiShoppingCart /> Buy ticket</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12}>
                        <Card className="card__right">
                            <Card.Text> <CiLocationOn /> <b>Location:</b></Card.Text>
                            <Card.Text >{address}</Card.Text>
                            <Card.Text>Israel</Card.Text>
                        </Card>
                        
                        
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventDetail;
