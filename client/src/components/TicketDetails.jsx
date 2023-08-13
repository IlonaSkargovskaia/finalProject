import React, {useState} from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const TicketDetails = ({ ticket }) => {
    
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
    };
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ticket Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Render ticket details using ticket */}
                {/* For example: */}
                {ticket && (
                    <div>
                        Ticket ID: {ticket.ticketId}
                        {/* ... other ticket details ... */}
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
