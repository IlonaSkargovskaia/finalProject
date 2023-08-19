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
    CiCircleCheck,
} from "react-icons/ci";
import { AppContext } from "../../App";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LeafletMap from "../../components/LeafletMap";
import { v4 as uuidv4 } from "uuid";

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
import RightCategories from "../../components/RightCategories";
import QRCode from "react-qr-code";
import InterractiveHall from "./InterractiveHall";
import TicketDetails from "../../components/TicketDetails";
import EventsByDate from "./EventsByDate";

const EventDetail = () => {
    const [event, setEvent] = useState({});
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [total, setTotal] = useState(0);
    // Selected by user seats
    const [selectedSeats, setSelectedSeats] = useState([]);
    // Available seats from database
    const [availableSeats, setAvailableSeats] = useState([]);
    const [ticketData, setTicketData] = useState(null);
    const [purchasedSeats, setPurchasedSeats] = useState([]);

    // Extract URL parameters
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

    // Fetch event data by ID and calculate total price on selected quantity change
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

    const fetchPurchasedSeats = async () => {
        try {
            const response = await axios.get(
                `/purchased-seats/event/${params.id}`
            );
            setPurchasedSeats(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPurchasedSeats();
    }, [params.id]);

    const handleQuantityChange = (event) => {
        const { value } = event.target;
        setSelectedQuantity(parseInt(value));

        setTotal(event.price * parseInt(value));
    };

    useEffect(() => {
        const generateSeats = () => {
            // 10 seats per row
            const rows = Math.ceil(quantity_available / 10);

            // Array to store the generated seats
            const seats = [];
            let seatId = 1;

            for (let row = 1; row <= rows; row++) {
                for (let seatNumber = 1; seatNumber <= 10; seatNumber++) {
                    // Check if seatId <= available - generate
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

    // Update selected quantity when seats are selected
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
            setSelectedSeats((prevSelectedSeats) => {
                if (
                    prevSelectedSeats.some(
                        (selectedSeat) => selectedSeat.id === seat.id
                    )
                ) {
                    // Seat is already selected, remove it
                    return prevSelectedSeats.filter((s) => s.id !== seat.id);
                } else {
                    // Seat is not selected, add it
                    return [...prevSelectedSeats, seat];
                }
            });
        }
    };

    const renderSeats = () => {
        // Calculate the number of rows needed based on total_places and 10 seats per row
        const rows = Math.ceil(total_places / 10);
        // Create an array with a length of 'rows', using rowIndex as the index
        const seatsArray = Array.from({ length: rows }, (_, rowIndex) => (
            // For each row, create a <div> with a unique key and CSS class
            <div key={rowIndex} className="row seat-row">
                {Array.from({ length: 10 }, (_, seatIndex) => {
                    // Calculate the seat's index within the total number of places
                    const seatIndexWithinTotalPlaces =
                        rowIndex * 10 + seatIndex;

                    // Create an object representing the current seat
                    const seat = {
                        id: seatIndexWithinTotalPlaces + 1,
                        row: rowIndex + 1,
                        seatNumber: seatIndex + 1,
                    };

                    // Check if the seat is selected, purchased, or available
                    const isSelected = selectedSeats.some(
                        (selectedSeat) => selectedSeat.id === seat.id
                    );

                    const isPurchased = purchasedSeats.some(
                        (purchasedSeat) =>
                            purchasedSeat.row === seat.row &&
                            purchasedSeat.seat === seat.seatNumber
                    );

                    const isAvailable = availableSeats.some(
                        (availableSeat) => availableSeat.id === seat.id
                    );

                    //set css class depends on condition
                    const seatClassName = `seat ${
                        isPurchased
                            ? "purchased"
                            : isSelected
                            ? "selected"
                            : "available"
                    } col`;

                    return (
                        // Return a <div> element representing the seat
                        <div
                            key={`seat-${seat.id}`}
                            className={seatClassName}
                            onClick={() => handleSeatClick(seat)}
                        >
                            {isPurchased ? (
                                <div className="seat-indicator">
                                    {isSelected ? (
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
                                <div>
                                    <span>
                                        <CiCircleCheck
                                            style={{ fontSize: "25px" }}
                                        />
                                        <br />
                                        Row: {seat.row}
                                        <br />
                                        Seat: {seat.seatNumber}
                                    </span>
                                </div>
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

        // Check if the user is authorized (has a valid token)
        if (!token && !storageToken) {
            // if User is not authorized
            toast.error("You must be authorized to purchase tickets");
            return;
        } else {
            // Map selectedSeats to include a UUID for each seat
            const selectedSeatsWithUUID = selectedSeats.map((seat) => ({
                ...seat,
                uuid_id: uuidv4(), // Generate a UUID for qr_code_data
            }));
            try {
                // Make a POST request to purchase tickets
                const response = await axios.post(
                    `/api/tickets/${params.id}/purchase`,
                    {
                        quantity: selectedQuantity,
                        selectedSeats: selectedSeatsWithUUID,
                    },
                    {
                        headers: {
                            Authorization: token || storageToken,
                        },
                    }
                );

                // console.log("Purchase API Response:", response.data);
                const successMessage = response.data.message;

                // Update selected seats and available seats
                setSelectedSeats((prevSelectedSeats) =>
                    prevSelectedSeats.map((seat) => ({
                        ...seat,
                        purchased: true,
                    }))
                );

                // Update available seats by filtering  selected seats
                setAvailableSeats((prevAvailableSeats) =>
                    prevAvailableSeats.filter(
                        (seat) =>
                            !selectedSeats.some(
                                (selectedSeat) => selectedSeat.id === seat.id
                            )
                    )
                );

                if (response.data.success) {
                    fetchPurchasedSeats(); // Fetch updated purchased seats
                }

                //console.log("Selected seats:", selectedSeats); //after bought
                // {id: 15, row: 2, seatNumber: 5}

                // If ticketData and ticketId are present in the response
                if (
                    response.data.ticketData &&
                    response.data.ticketData.ticketId
                ) {
                    // Get the ticketId from the response
                    const ticketId = response.data.ticketData.ticketId;
                    //console.log("ticket id in detail:", ticketId);

                    // console.log(
                    //     "Setting ticketData:",
                    //     response.data.ticketData
                    // );
                    setTicketData(response.data.ticketData);
                } else {
                    console.error("Ticket ID not found in API response");
                }

                //toast.success(successMessage);
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
                    theme="dark"
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

                                {quantity_available > 0 ? (
                                    <div>
                                        <h3>Buy tickets:</h3>
                                        <Form className="purchase__form">
                                            <Form.Group>
                                                <Row className="align-items-center">
                                                    <Col>
                                                        <Form.Label>
                                                            Quantity:
                                                        </Form.Label>
                                                    </Col>

                                                    <Col>
                                                        <input
                                                            type="number"
                                                            className="quantity-input"
                                                            value={
                                                                selectedQuantity
                                                            }
                                                            onChange={
                                                                handleQuantityChange
                                                            }
                                                            min="1"
                                                            max={
                                                                quantity_available
                                                            }
                                                            readOnly
                                                        />
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
                                                            <CiWallet /> {price}{" "}
                                                            - {max_price} ILS
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
                                                            onClick={
                                                                handlePurchase
                                                            }
                                                        >
                                                            <CiShoppingCart />{" "}
                                                            Buy ticket
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Form.Group>
                                        </Form>
                                    </div>
                                ) : (
                                    <>
                                        <h3>SOLD OUT</h3>
                                        <p className="sold_out">
                                            No tickets available, choose another
                                            event
                                        </p>
                                    </>
                                )}
                            </Card.Body>
                        </Card>

                        {quantity_available === 0 ? (
                            <></>
                        ) : (
                            <InterractiveHall
                                totalPlaces={total_places}
                                renderSeats={renderSeats}
                            />
                        )}

                        {ticketData && (
                            <TicketDetails
                                ticket={ticketData}
                                title={title}
                                date={formattedDate}
                            />
                        )}
                    </Col>

                    {/* right column */}
                    <Col lg={4} md={12} sm={12} className="mb-4">
                        <Card className="card__right">
                            <Card.Text>
                                <CiLocationOn /> <b>Location:</b>
                            </Card.Text>
                            <Card.Text>{address} </Card.Text>

                            <LeafletMap id={id} />
                        </Card>

                        <Card className="mt-3">
                            <RightCategories />
                        </Card>

                        <Card className="mt-3 p-3">
                            <h3>Last news:</h3>
                        </Card>

                        <Card className="mt-3 p-3">
                            <h3>About organizer:</h3>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <div style={{ marginBottom: "-50px" }}>
                <EventsByDate />
            </div>
        </div>
    );
};

export default EventDetail;
