import React, { useState, useEffect } from "react";
import { Col, Modal, Row } from "react-bootstrap";
import QRCode from "qrcode";
import axios from "axios";

const TicketDetails = ({ ticket, title }) => {
    const [showModal, setShowModal] = useState(true);
    const [qrCodeImages, setQRCodeImages] = useState([]);

    useEffect(() => {
        generateQRCodeImagesAndSendEmail();
    }, []);

    const generateQRCodeImagesAndSendEmail = async () => {
        if (ticket && ticket.seats) {
            const qrCodeImages = await Promise.all(
                ticket.seats.map(async (seat) => {
                    const qrCodeDataURL = await QRCode.toDataURL(
                        generateQRCodeValue(seat)
                    );
                    return qrCodeDataURL;
                })
            );

            setQRCodeImages(qrCodeImages);

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
                        total: ticket.total_price,
                    },
                    qrCodeImages: qrCodeImages,
                });

                console.log("Email with QR codes sent successfully");
            } catch (error) {
                console.error("Error sending email:", error);
            }
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
                        </div>
                    ))}
                    <p>Show the code to the security guard at the entrance to the event</p>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default TicketDetails;
