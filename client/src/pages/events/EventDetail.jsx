import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { CiLocationOn, CiCalendarDate, CiShoppingCart } from "react-icons/ci";
import { PiTicketThin } from "react-icons/pi";
import { AppContext } from "../../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const EventDetail = () => {
    const [event, setEvent] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const params = useParams();
    const { token } = useContext(AppContext);

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

                // Once event data is fetched, update the total based on the fetched price
                setTotal(res.data.price * selectedQuantity);
            } catch (error) {
                console.log(error);
            }
        };
        getEventById();
    }, [params.id, selectedQuantity]);

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

        setTotal(event.price * parseInt(value));
    };

    const handlePurchase = async () => {
        const storageToken = localStorage.getItem("token");

        const totalPrice = price * selectedQuantity;

        if (!token && !storageToken) {
          // if User is not authorized
          toast.error("You must be authorized to purchase tickets");
          return;
        }

        try {
            const response = await axios.post(
                `/api/tickets/${params.id}/purchase`,
                {
                    quantity: selectedQuantity,
                },
                {
                    headers: {
                        Authorization: token || storageToken,
                    },
                }
            );
            toast.success(response.data.message); 
            //alert(response.data.message);
            setTotal(totalPrice);
            console.log("Purchase success:", response.data);
        } catch (error) {
            if (error.response.status === 400) {
                console.error("Not enough tickets available");
            } else {
                console.error("Purchase error:", error);
            }
        }
    };

    return (
        <div>
            <Container>
            <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
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
                                    <b>Tickets left:</b>{" "}
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
                                                {Array.from(
                                                    {
                                                        length: quantity_available,
                                                    },
                                                    (_, index) => (
                                                        <option
                                                            key={index}
                                                            value={index + 1}
                                                        >
                                                            {index + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Select>
                                            <Button
                                            className="purple"
                                            onClick={handlePurchase}
                                        >
                                            <CiShoppingCart /> Buy ticket
                                        </Button>
                                       
                                        </Form.Group>
                                        
                                    </Form>
                                ) : (
                                    <p className="sold_out">
                                        No tickets available, choose another
                                        event
                                    </p>
                                )}

                                <Card.Text>Amount: {total} ILS</Card.Text>
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
