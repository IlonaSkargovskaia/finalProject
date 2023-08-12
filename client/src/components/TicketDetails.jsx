import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QrCode from 'react-qr-code';

const TicketDetails = ({ seat, event, token }) => {
    const [ticketData, setTicketData] = useState(null);

    useEffect(() => {
        // Fetch QR code data from the backend
        const fetchQRCodeData = async () => {
            try {
                const response = await axios.get(`/api/tickets/${event.id}/qrcode`, {
                    headers: {
                        Authorization: token,
                    },
                });
                console.log('QR Code Data:', response.data.qrCodeData); 
                setTicketData(response.data.qrCodeData);
            } catch (error) {
                console.error('Error fetching QR code data:', error);
            }
        };
        
        fetchQRCodeData();
    }, [seat.id, token]);

    return (
        <div>
            <h3>Ticket Details</h3>
            {ticketData && (
                <div>
                    <h4>QR Code</h4>
                    <QrCode value={ticketData.qrCodeData} />
                    <p>Event ID: {event.id}</p>
                    <p>Event Title: {event.title}</p>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;
