import React, {useState} from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const TicketDetails = ({ ticket }) => {
    console.log(ticket);
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
    };
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
