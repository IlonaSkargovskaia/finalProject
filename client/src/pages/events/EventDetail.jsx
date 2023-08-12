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
    CiCircleRemove,
    CiMapPin,
} from "react-icons/ci";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeafletMap from "../../components/LeafletMap";

import {
    FacebookShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    VKShareButton,
    LinkedinShareButton,
    FacebookIcon,
    WhatsappIcon,
    TelegramIcon,
    LinkedinIcon,
    VKIcon,
} from "react-share";

const EventDetail = () => {
    const [event, setEvent] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]); // Available seats from database
    const [purchasedSeats, setPurchasedSeats] = useState([]); // Seats purchased by the user

    const params = useParams();
    const { token } = useContext(AppContext);

    const {
        id,
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
        // Check if the selected seat is available
        const isAvailable = availableSeats.some(
            (availableSeat) => availableSeat.id === seat.id
        );

        if (isAvailable) {
            // Toggle seat selection
            setSelectedSeats((prevSelectedSeats) =>
                prevSelectedSeats.includes(seat)
                    ? prevSelectedSeats.filter((s) => s.id !== seat.id)
                    : [...prevSelectedSeats, seat]
            );
        }

        console.log("Is Available seat:", isAvailable);
    };

    const renderSeats = () => {
        const rows = Math.ceil(total_places / 10); //  10 seats per row
        const seatsArray = Array.from({ length: rows }, (_, rowIndex) => (
            <div key={rowIndex} className="row seat-row">
                {Array.from({ length: 10 }, (_, seatIndex) => {
                    const seatIndexWithinTotalPlaces =
                        rowIndex * 10 + seatIndex;

                    const seat = {
                        id: seatIndexWithinTotalPlaces + 1,
                        row: rowIndex + 1,
                        seatNumber: seatIndex + 1,
                    };

                    const isSelected = selectedSeats.some(
                        (selectedSeat) => selectedSeat.id === seat.id
                    );

                    const isAvailable = availableSeats.some(
                        (availableSeat) => availableSeat.id === seat.id
                    );

                    const isPurchased = !isAvailable || isSelected;

                    const seatClassName = `seat ${
                        isPurchased
                            ? isSelected
                                ? "selected"
                                : "purchased"
                            : "available"
                    } col`;

                    return (
                        <div
                            key={`seat-${seat.id}`}
                            className={seatClassName}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {isPurchased ? (
                                <div className="seat-indicator">
                                    {isSelected ? (
                                        // `You selected: Row ${seat.row}, Seat ${seat.seatNumber}`
                                        <span>
                                            <CiMapPin
                                                style={{ fontSize: "25px" }}
                                            />
                                            <br />
                                            Row: {seat.row}
                                            <br />
                                            Seat: {seat.seatNumber}
                                        </span>
                                    ) : (
                                        <span>
                                            <CiCircleRemove
                                                style={{ fontSize: "25px" }}
                                            />
                                            <br />
                                            Row: {seat.row}
                                            <br />
                                            Seat: {seat.seatNumber}
                                        </span>
                                    )}
                                </div>
                            ) : (
                                seat.seatNumber
                            )}
                        </div>
                    );
                })}
            </div>
        ));

        return seatsArray;
    };

    const handlePurchase = async () => {
        const storageToken = localStorage.getItem("token");

        if (!token && !storageToken) {
            // if User is not authorized
            toast.error("You must be authorized to purchase tickets");
            return;
        } else {
            try {
                const response = await axios.post(
                    `/api/tickets/${params.id}/purchase`,
                    {
                        quantity: selectedQuantity,
                        selectedSeats: selectedSeats,
                    },
                    {
                        headers: {
                            Authorization: token || storageToken,
                        },
                    }
                );

                console.log("Purchase API Response:", response.data);

                const successMessage = response.data.message;

                // Update selected seats and available seats
                setSelectedSeats((prevSelectedSeats) =>
                    prevSelectedSeats.map((seat) => ({
                        ...seat,
                        purchased: true,
                    }))
                );

                setAvailableSeats((prevAvailableSeats) =>
                    prevAvailableSeats.filter(
                        (seat) =>
                            !selectedSeats.some(
                                (selectedSeat) => selectedSeat.id === seat.id
                            )
                    )
                );

                console.log("Selected seats:", selectedSeats); //after bought
                // {id: 15, row: 2, seatNumber: 5}
                toast.success(response.data.message);
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
                                <Row>
                                    <Col>
                                        <Card.Title>{title}</Card.Title>
                                    </Col>

                                    <Col className="text-end socials">
                                        <FacebookShareButton
                                            url={window.location.href}
                                            quote={`Check out this awesome event: ${title}`}
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        <WhatsappShareButton
                                            url={window.location.href}
                                            title={`Check out this awesome event: ${title}`}
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        <TelegramShareButton
                                            url={window.location.href}
                                            title={`Check out this awesome event: ${title}`}
                                        >
                                            <TelegramIcon size={32} round />
                                        </TelegramShareButton>
                                        <LinkedinShareButton
                                            url={window.location.href}
                                            title={`Check out this awesome event: ${title}`}
                                        >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                        <VKShareButton
                                            url={window.location.href}
                                            title={`Check out this awesome event: ${title}`}
                                        >
                                            <VKIcon size={32} round />
                                        </VKShareButton>
                                    </Col>
                                </Row>

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
                    <Col lg={4} md={12} sm={12} className="mb-4">
                        <Card className="card__right">
                            <Card.Text>
                                <CiLocationOn /> <b>Location:</b>
                            </Card.Text>
                            <Card.Text>{address} </Card.Text>
                            {/* Event ID: {id} */}
                            <LeafletMap id={id} />
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </div>
    );
};

export default EventDetail;
