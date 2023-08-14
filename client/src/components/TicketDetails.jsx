import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import QRCode from "qrcode"; // Import qrcode library
import axios from "axios";

const TicketDetails = ({ ticket }) => {

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
                    const qrCodeDataURL = await QRCode.toDataURL(
                        seat.uuid_id
                    );
                    return qrCodeDataURL;
                })
            );
    
            setQRCodeImages(qrCodeImages);
        }
    };
    
    

    const handleClose = () => {
        setShowModal(false);
    };

    const generateQRCodeValue = (seat) => {
        return JSON.stringify({
            title: ticket.title,
            row: seat.row,
            seat: seat.seatNumber,
            ticketId: ticket.ticketId,
        });
    };

    const handleSendEmail = async () => {
        try {
            const response = await axios.post(`/send-email`, {
                recipientEmail: "iliukovich1991@gmail.com", 
                eventData: {
                    title: ticket.title,
                    row: ticket.seats[0].row,
                    seat: ticket.seats[0].seat,
                    total: ticket.total_price,
                    // Add other necessary data here
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
