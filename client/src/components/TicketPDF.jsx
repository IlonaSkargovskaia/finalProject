import React from "react";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    PDFViewer,
    Image
} from "@react-pdf/renderer";
import qrcode from "qrcode";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#ffffff",
        padding: 20,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    qrCodeContainer: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
});

const TicketPDF = ({ purchasedTickets }) => {
    const generateQRCodeValue = async (ticket) => {
        const qrValue = JSON.stringify({
          title: ticket.title,
          row: ticket.row,
          seat: ticket.seat,
          ticket_id: ticket.id,
        });
        const qrImageData = await qrcode.toDataURL(qrValue);
        return qrImageData;
    };

    return (
        <PDFViewer style={{ width: "100%", height: "300px" }}>
            <Document>
                {console.log("purchasedTickets in PDF", purchasedTickets)}
                {purchasedTickets.map((ticket, index) => (
                    <Page key={index} size="A4" style={styles.page}>
                        <View style={styles.section}>
                            <Text>Ticket ID: {ticket.id}</Text>
                            <Text>Event: {ticket.title}</Text>
                            <Text>Row: {ticket.row}</Text>
                            <Text>Seat: {ticket.seat}</Text>

                            <View >
                                <div
                                    style={{
                                        maxWidth: "256px",
                                        margin: "0 auto",
                                    }}
                                >
                                    <Image
                                        src={generateQRCodeValue(ticket)} 
                                    />
                                </div>
                            </View>
                        </View>
                    </Page>
                ))}
            </Document>
        </PDFViewer>
    );
};

export default TicketPDF;
