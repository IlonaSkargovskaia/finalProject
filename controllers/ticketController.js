import {
    getAllTickets,
    getTicketById,
    addNewTicket,
    updateTicket,
    deleteTicket,
    createTicket,
} from "../models/ticketModel.js";
import db from "../config/db.js";

export const getAllTicketsController = async (req, res) => {
    try {
        const tickets = await getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getTicketByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const ticket = await getTicketById(id);
        if (!ticket) {
            res.status(404).json({ msg: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getUserPurchasedTickets = async (req, res) => {
    const userid = req.user;

    try {
        const purchasedTickets = await db
            .select("*")
            .from("tickets")
            .where("userid", userid).orderBy('id', 'desc');

        //console.log('PurchasedTickets from tick Controller: ', purchasedTickets);

        res.status(200).json(purchasedTickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error fetching purchased tickets" });
    }
};

export const purchaseTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user; // from auth
        const { quantity, selectedSeats } = req.body;

        console.log("Event id:", id);
        console.log("userid:", userid);
        console.log("quantity:", quantity);
        console.log("selectedSeats:", selectedSeats);

        const event = await db("events").where("id", id).first();

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.quantity_available < quantity) {
            return res
                .status(400)
                .json({ message: "Not enough tickets available" });
        }

        const total_price = event.price * quantity;

        //QR CODES!!!!
        const ticketData = {
            event_id: event.id,
            user_id: userid,
            quantity,
            total_price,
            seats: selectedSeats,
        };

        const qrCodeData = JSON.stringify(ticketData);

        const ticketIds = [];

        for (const seat of selectedSeats) {
            const ticket = await createTicket(
                event.id,
                userid,
                quantity,
                total_price,
                seat,
                qrCodeData
            );
            ticketIds.push(ticket.id);
        }

        await db("events")
            .where("id", id)
            .decrement("quantity_available", quantity);

        res.status(201).json({
            message: "Congratulations! Tickets purchased successfully",
            ticketData: ticketData,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error purchasing tickets" });
    }
};

export const getTicketQRCodeDataController = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await getTicketById(id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        if (!ticket.qr_code_data) {
            return res
                .status(404)
                .json({ message: "QR code data not found for this ticket" });
        }

        res.status(200).json({ qrCodeData: ticket.qr_code_data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching QR code data" });
    }
};

export const addNewTicketController = async (req, res) => {
    const { userid, eventid, quantity, totalprice } = req.body;

    try {
        const newTicket = await addNewTicket({
            userid,
            eventid,
            quantity,
            totalprice,
        });

        console.log("New Ticket: ", newTicket);

        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateTicketController = async (req, res) => {
    const { id } = req.body;
    const ticketData = req.body;

    try {
        const updatedTicket = await updateTicket(id, ticketData);
        res.status(200).json(updatedTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteTicketController = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTicket = await deleteTicket(id);
        if (!deletedTicket) {
            res.status(404).json({ msg: "Ticket not found" });
        }
        res.status(200).json(deletedTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
