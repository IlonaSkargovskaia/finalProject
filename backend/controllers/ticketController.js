import { getAllTickets, getTicketById, addNewTicket, updateTicket, deleteTicket } from "../models/ticketModel.js";


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
    const {id} = req.params;
    try {
        const ticket = await getTicketById(id);
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
    const {userid, eventid, quantity, totalprice} = req.body;

    try {
        const newTicket = await addNewTicket({
            userid, 
            eventid, 
            quantity, 
            totalprice
        })
        res.status(201).json(newTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const updateTicketController = async (req, res) => {
    const { id } = req.body;
    const ticketData = req.body;

    try {
        const updatedTicket = await updateTicket(id, ticketData);
        res.status(200).json(updatedTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteTicketController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTicket = await deleteTicket(id);
      if (!deletedTicket) {
        res.status(404).json({ msg: 'Ticket not found' });
      }
      res.status(200).json(deletedTicket);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};