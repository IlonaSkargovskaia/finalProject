import {
    getAllTickets,
    getTicketById,
    addNewTicket,
    updateTicket,
    deleteTicket,
    createTicket,
    getPurchasedSeatsForEvent,
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

export const purchaseTickets = async (req, res) => {
    try {
        const { id } = req.params;
        const userid = req.user; //from auth
        const { quantity } = req.body;

        const event = await db("events").where("id", id).first();
        //console.log(event);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (event.quantity_available < quantity) {
            return res
                .status(400)
                .json({ message: "Not enough tickets available" });
        }

        const total_price = event.price * quantity;

        // Get purchased seats for the event
        const purchasedSeats = await getPurchasedSeatsForEvent(id);

        // Generate new purchased seats
        const newPurchasedSeats = [];
        let seatId = Math.max(...purchasedSeats) + 1; // Get the next available seat ID

        for (let i = 0; i < quantity; i++) {
            newPurchasedSeats.push(seatId);
            seatId++;
        }

        // Create a new ticket using the existing createTicket function
        const newTicket = await createTicket(
            id, // eventid
            userid,
            quantity,
            total_price,
            JSON.stringify(newPurchasedSeats) // Include purchased seats
        );

        console.log("New Ticket: ", newTicket);

        await db("purchased_seats").insert(
            newPurchasedSeats.map((seatId) => ({
                event_id: id,
                seat_id: seatId,
                user_id: userid,
            }))
        );

        await db("events")
            .where("id", id)
            .decrement("quantity_available", newPurchasedSeats.length);

        console.log("Generated Purchased Seats:", newPurchasedSeats);

        res.status(201).json({
            message: "Congratulations! Tickets purchased successfully",
            purchasedSeats: newPurchasedSeats,
            newTicket,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error purchasing tickets" });
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