import { getAllTickets, getTicketById, addNewTicket } from "../models/ticketModel.js";


export const getAllTicketsController = async (req, res) => {
    try {
        const tickets = await getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const getTicketByIdController = async (req, res) => {
    const {ticketId} = req.params;
    try {
        const ticket = await getTicketById(ticketId);
        if (!ticket) {
            res.status(404).json({msg: 'Ticket not found'})
        }
        res.status(200).json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const addNewTicketController = async (req, res) => {
    const {userID, eventID, quantity, totalPrice} = req.body;

    try {
        const newTicket = await addNewTicket({
            userID, 
            eventID, 
            quantity, 
            totalPrice
        })
        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}