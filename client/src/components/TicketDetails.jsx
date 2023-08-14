import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import QRCode from "qrcode"; 
import axios from "axios";

const TicketDetails = ({ ticket, title }) => {

    console.log(ticket);
    const [showModal, setShowModal] = useState(true);
    const [qrCodeImages, setQRCodeImages] = useState([]);

    useEffect(() => {
        generateQRCodeImages();
    }, []);

    const generateQRCodeImages = async () => {
        if (ticket && ticket.seats) {
            const qrCodeImages = await Promise.all(
                ticket.seats.map(async (seat) => {
                    console.log('seat:', seat);
                    const qrCodeDataURL = await QRCode.toDataURL(
                        generateQRCodeValue(seat)
                    );
                    return qrCodeDataURL;
                })
            );
    
            setQRCodeImages(qrCodeImages);
        }
    };
    
    const generateQRCodeValue = (seat) => {
        return JSON.stringify({
            
            title: title,
            row: seat.row,
            seat: seat.seatNumber,
            user_id: ticket.user_id,
            uuid_id: seat.uuid_id,
        });
    };

    const handleClose = () => {
        setShowModal(false);
    };
   

    const handleSendEmail = async () => {
        try {
            const selectedSeatsAndRows = ticket.seats.map((seat) => ({
                row: seat.row,
                seat: seat.seatNumber,
            }));

            const response = await axios.post(`/send-email`, {
                recipientEmail: "iliukovich1991@gmail.com", 
                eventData: {
                    title: title,
                    selectedSeatsAndRows: selectedSeatsAndRows,
                    total: ticket.total_price
                },
                qrCodeImages: qrCodeImages,
            });

            console.log("Email with QR codes sent successfully");
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You purchased ticket successfully!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col md={3}>
                        <h3>Details: </h3>
                    </Col>
                    <Col>
                        {ticket && (
                            <div key={ticket.ticketId}>
                                <p>Quantity: {ticket.quantity}</p>
                                <p>Amount: {ticket.total_price} ILS</p>
                            </div>
                        )}
                    </Col>
                    <hr />
                    {ticket.seats.map((seat, index) => (
                        <div key={seat.id} className="mb-4">
                            <h5>{ticket.title}</h5>
                            <p>
                                Row: {seat.row}, Seat: {seat.seatNumber}
                            </p>
                            <div
                                style={{
                                    maxWidth: "256px",
                                    margin: "0 auto",
                                }}
                            >
                                <img
                                    src={qrCodeImages[index]}
                                    alt={`QR Code for seat ${seat.seatNumber}`}
                                    width={256}
                                    height={256}
                                />
                            </div>
                        </div>
                    ))}
                    <p>
                        Show the code to the security guard at the entrance to
                        the event
                    </p>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleSendEmail}>
                    Send Email with QR Codes
                </Button>
                <Button variant="light" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketDetails;
