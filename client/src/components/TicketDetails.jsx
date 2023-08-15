import React, { useState, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import QRCode from "qrcode";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TicketDetails = ({ ticket, title, date }) => {
    console.log(title);
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
                toast("Email with QR codes sent successfully");
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
        <>
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
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        You purchased ticket successfully!!!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="text-center">
                       

                        {ticket && (
                            <div key={ticket.ticketId}>
                                <h3>"{title}"</h3>
                                <h4 style={{color: '#b0b0b0'}}>{date}</h4>
                            </div>
                        )}
<hr />
                        {ticket.seats.map((seat, index) => (
                            <div key={seat.id} >
                                
                                    <h5>Row: {seat.row}, Seat: {seat.seatNumber}</h5>
                                
                            </div>
                        ))}

                        {ticket && (
                            <div>
                                
                                <h5><b>Total amount:</b> {ticket.total_price} ILS</h5>
                            </div>
                        )}
                        <hr />
                        <p className="letter">
                            We sent a letter to your mail <br />
                            with QR-codes for each ticket!
                        </p>
                        <p style={{ color: "#7b1ea2" }}>
                            Show them to the security guard at the entrance to
                            the event!
                        </p>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light purple" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default TicketDetails;
