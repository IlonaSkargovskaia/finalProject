import React, {useState} from "react";
import { Button, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";

const TicketDetails = ({ ticket }) => {
     console.log(ticket);
    const [showModal, setShowModal] = useState(true);

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
                        <p>Amount: {ticket.total_price} ILS</p>
                        <hr />
                        <p>show the code to the security guard at the entrance to the event</p>
                        {ticket.seats.map((seat) => (
                            <div key={seat.id} className="mb-4">
                                <h5>{ticket.title}</h5>
                                <p>Row: {seat.row}, Seat: {seat.seatNumber}</p>
                                <div style={{ maxWidth: "256px", margin: "0 auto" }}>
                                    <QRCode value={generateQRCodeValue(seat)} size={256} />
                                </div>
                            </div>
                        ))}
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
