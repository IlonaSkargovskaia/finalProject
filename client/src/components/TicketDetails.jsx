import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";

const TicketDetails = ({ ticket }) => {
    console.log(ticket);
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
    };

    const qrCodeValue = JSON.stringify({
        title: ticket.title,
        row: ticket.seats[0].row,
        seat: ticket.seats[0].seatNumber,
        ticketId: ticket.ticketId
    });
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>You purchased ticket successfully!!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>Ticket Details</h3>
                {ticket && (
                    <div key={ticket.ticketId}>
                        <p>Ticket ID: {ticket.ticketId}</p>
                        <p>Quantity: {ticket.quantity}</p>
                        <p>Row: {ticket.seats[0].row}</p>
                        <p>Seat: {ticket.seats[0].seatNumber}</p>
                        <p>Amount: {ticket.total_price} ILS</p>
                        <div style={{ maxWidth: "256px", margin: "0 auto" }}>
                            <QRCode value={qrCodeValue} size={256} />
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TicketDetails;
