import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import {
    CiLocationOn,
    CiCalendarDate,
    CiShoppingCart,
    CiWallet,
} from "react-icons/ci";
import { AppContext } from "../../App";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventDetail = () => {
    const [event, setEvent] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]); // Available seats from database
    const [purchasedSeats, setPurchasedSeats] = useState([]); // Seats purchased by the user
    const [selectedSeatNumbers, setSelectedSeatNumbers] = useState([]);

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
        total_places,
    } = event;

    useEffect(() => {
        const getEventById = async () => {
            try {
                const res = await axios.get(`/api/events/${params.id}`);
                setEvent(res.data);

                // Fetch purchased seats for the event
                const response = await axios.get(
                    `/api/events/${params.id}/purchased-seats`
                );
                setPurchasedSeats(response.data.purchasedSeats);

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

    useEffect(() => {
        // For this example, let's assume availableSeats is an array of seat objects
        const generateSeats = () => {
            const rows = Math.ceil(quantity_available / 10); // Assuming 10 seats per row
            const seats = [];
            let seatId = 1;

            for (let row = 1; row <= rows; row++) {
                for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
                    if (seatId <= quantity_available) {
                        seats.push({
                            id: seatId,
                            row,
                            seatNumber,
                        });
                        seatId++;
                    } else {
                        break;
                    }
                }
            }

            return seats;
        };

        setAvailableSeats(generateSeats());
    }, [quantity_available]);

    useEffect(() => {
        setSelectedQuantity(selectedSeats.length);
    }, [selectedSeats]);

    const handleSeatClick = (seat) => {
        const isPurchased = purchasedSeats.includes(seat.id);
        const isSelected = selectedSeats.some(
            (selectedSeat) => selectedSeat.id === seat.id
        );
        const isAvailable = availableSeats.some(
            (availableSeat) => availableSeat.id === seat.id
        );
    
        console.log("Clicked Seat:", seat.id);
        console.log("Is Selected:", isSelected);
        console.log("Is Purchased:", isPurchased);
        console.log("Is Available:", isAvailable);

        if (!isPurchased && !isSelected) {
            setSelectedSeats((prevSelectedSeats) => [
                ...prevSelectedSeats,
                seat,
            ]);
        }
    };

    const renderSeats = () => {
        const rows = Math.ceil(total_places / 10); // Assuming 10 seats per row
        const seatsArray = Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="row seat-row">
                {Array.from({ length: 10 }, (_, seatIndex) => {
                    const seatIndexWithinTotalPlaces = rowIndex * 10 + seatIndex;
                    const seatNumber = seatIndexWithinTotalPlaces + 1;
    
                    if (seatNumber <= total_places) {
                        const seat = {
                            id: seatNumber,
                            row: rowIndex + 1,
                            seatNumber,
                        };
                        const isSelected = selectedSeats.some(
                            (selectedSeat) => selectedSeat.id === seat.id
                        );
                        const isAvailable = availableSeats.some(
                            (availableSeat) => availableSeat.id === seat.id
                        );
                        const isPurchased = purchasedSeats.includes(seat.id);
    
                        const seatClassName = `seat ${
                            isPurchased
                                ? "purchased"
                                : isSelected
                                ? "selected"
                                : "available"
                        } col`;
    
                        return (
                            <div
                                key={`seat-${seat.id}`}
                                className={seatClassName}
                                onClick={() => handleSeatClick(seat)}
                            >
                                {isPurchased ? "" : seat.seatNumber}
                            </div>
                        );
                    } else {
                        return null; // This seat is beyond the total number of available seats
                    }
                })}
            </div>
        ));
    
        return seatsArray;
    };
    

    const handlePurchase = async () => {
        const storageToken = localStorage.getItem("token");

        // Check if any of the selected seats are already purchased
        const someSeatsPurchased = selectedSeats.some((seat) =>
            purchasedSeats.includes(seat.id)
        );

        if (someSeatsPurchased) {
            toast.error("Some selected seats are already purchased.");
            return;
        }

        if (!token && !storageToken) {
            // if User is not authorized
            toast.error("You must be authorized to purchase tickets");
            return;
        } else {
            try {
                const purchasedSeatIds = selectedSeats.map((seat) => seat.id);

                console.log("Purchased Seats:", purchasedSeatIds);

                const response = await axios.post(
                    `/api/tickets/${params.id}/purchase`,
                    {
                        quantity: selectedQuantity,
                        purchasedSeats: purchasedSeatIds,
                    },
                    {
                        headers: {
                            Authorization: token || storageToken,
                        },
                    }
                );

                console.log("Purchase Response:", response.data);

                // Update purchasedSeats state
                setPurchasedSeats((prevPurchasedSeats) => [
                    ...prevPurchasedSeats,
                    ...purchasedSeatIds,
                ]);

                console.log("Updated Purchased Seats:", purchasedSeats);

                // Update availableSeats state
                setAvailableSeats((prevAvailableSeats) =>
                    prevAvailableSeats.filter(
                        (seat) => !purchasedSeatIds.includes(seat.id)
                    )
                );

                console.log("Updated Available Seats:", availableSeats);

                // Clear selected seats
                setSelectedSeats([]);

                // Update total price and selected quantity
                setTotal(0);
                setSelectedQuantity(1);

                // Display success message and purchased seat IDs
                toast.success(response.data.message);
                toast.info(`Purchased Seats: ${purchasedSeatIds.join(", ")}`);
            } catch (error) {
                if (error.response.status === 400) {
                    console.error("Not enough tickets available");
                } else {
                    toast.error("Error purchasing tickets");
                    console.error("Purchase error:", error);
                }
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
                    <Col lg={8} md={12} sm={12} className="mb-4">
                        <Card className="event__detail">
                            <Card.Header>
                                <Card.Img variant="left" src={image} />
                            </Card.Header>
                            <Card.Body>
                                <Card.Title>{title}</Card.Title>
                                <Card.Text className="detail__date">
                                    <CiCalendarDate />
                                    {hasDateTime
                                        ? ` ${formattedDate} | ${formattedTime}`
                                        : "Loading..."}
                                </Card.Text>
                                <hr />
                                <Card.Text>{description} </Card.Text>

                                <h3>Buy tickets:</h3>
                                {quantity_available > 0 ? (
                                    <Form className="purchase__form">
                                        <Form.Group>
                                            <Row className="align-items-center">
                                                <Col>
                                                    <Form.Label>
                                                        Quantity:
                                                    </Form.Label>
                                                </Col>
                                                <Col>
                                                    <Form.Select
                                                        value={selectedQuantity}
                                                        onChange={
                                                            handleQuantityChange
                                                        }
                                                    >
                                                        {Array.from(
                                                            {
                                                                length: quantity_available,
                                                            },
                                                            (_, index) => (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        index +
                                                                        1
                                                                    }
                                                                >
                                                                    {index + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </Col>

                                                <Col>
                                                    <Card.Text>
                                                        <b>Tickets left:</b>{" "}
                                                        {quantity_available ===
                                                        0
                                                            ? "SOLD OUT"
                                                            : quantity_available}
                                                    </Card.Text>
                                                </Col>
                                            </Row>

                                            <hr />

                                            <Row className="align-items-center my-4">
                                                <Col>
                                                    <Card.Text className="detail__price">
                                                        <CiWallet /> {price} -{" "}
                                                        {max_price} ILS
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Card.Text>
                                                        Amount: <br />{" "}
                                                        <b>{total} ILS</b>
                                                    </Card.Text>
                                                </Col>
                                                <Col>
                                                    <Button
                                                        className="purple"
                                                        onClick={handlePurchase}
                                                    >
                                                        <CiShoppingCart /> Buy
                                                        ticket
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Form>
                                ) : (
                                    <p className="sold_out">
                                        No tickets available, choose another
                                        event
                                    </p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={4} md={12} sm={12} className="mb-4">
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
                <Row>
                    <Col lg={8} md={12} sm={12}>
                        <Card className="card__right interactive">
                            <h4 style={{ textAlign: "center" }}>
                                Interactive hall
                            </h4>
                            <div className="card__interactive-total">
                                <h3>choose available places:</h3>
                                <p>{total_places} places in total</p>
                            </div>
                            <div className="hall">{renderSeats()}</div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EventDetail;