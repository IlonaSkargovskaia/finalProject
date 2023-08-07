import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { CiLocationOn, CiCalendarDate, CiShoppingCart } from "react-icons/ci";
import { PiTicketThin } from "react-icons/pi";

const EventDetail = () => {
    const [event, setEvent] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
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
        address,
        quantity_available,
        max_price,
    } = event;

    useEffect(() => {
        const getEventById = async () => {
            try {
                const res = await axios.get(`/api/events/${params.id}`);
                setEvent(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEventById();
    }, []);

    //console.log(event);

    const hasDateTime = date && time;

    const parsedDate = parseISO(date); //  date -> Date object
    const formattedDate = hasDateTime
        ? format(parsedDate, "d MMMM yyyy, (cccc)")
        : "Loading...";

    const formattedTime = hasDateTime ? time.slice(0, 5) : "";

    const handleQuantityChange = (event) => {
        const { value } = event.target;
        setSelectedQuantity(parseInt(value));
    };

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
                                <Card.Text>
                                    {" "}
                                    <CiCalendarDate />
                                    {hasDateTime
                                        ? ` ${formattedDate} | ${formattedTime}`
                                        : "Loading..."}
                                </Card.Text>
                                <Card.Text>{description} </Card.Text>
                                <Card.Text>
                                    <PiTicketThin /> Price: {price} -{" "}
                                    {max_price} ILS
                                </Card.Text>
                                <Card.Text>
                                    <b>Tickets available:</b>{" "}
                                    {quantity_available === 0
                                        ? "SOLD OUT"
                                        : quantity_available}
                                </Card.Text>
                                {quantity_available > 0 ? (
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>
                                                Select Quantity:
                                            </Form.Label>
                                            <Form.Select
                                                value={selectedQuantity}
                                                onChange={handleQuantityChange}
                                            >
                                                {Array.from({
                                                        length: quantity_available,
                                                    },
                                                    (_, index) => (
                                                        <option key={index} value={index + 1}>
                                                            {index + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                        </Form.Group>
                                        <Button
                                            className="purple"
                                            // Add onClick event handler for buying tickets
                                        >
                                            <CiShoppingCart /> Buy ticket
                                        </Button>
                                    </Form>
                                ) : (
                                    <p>No tickets available, choose another event</p>
                                )}

                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4} sm={12}>
                        <Card className="card__right">
                            <Card.Text>
                                {" "}
                                <CiLocationOn /> <b>Location:</b>
                            </Card.Text>
                            <Card.Text>{address}</Card.Text>
                            <Card.Text>Israel</Card.Text>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventDetail;
