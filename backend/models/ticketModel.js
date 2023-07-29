import db from '../config/db.js';


export const getAllTickets = async () => {
    try {
        const tickets = await db.select('*').from('tickets');
        return tickets;
    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error fetching Tickets from database'})
    }
}

export const getTicketById = async (ticketId) => {
    try {
        const ticket = await
        db.select('*')
            .from('tickets')
            .where({ticketId})
            .first();

        if (!ticket) {
            return null;
        }
        return ticket;

    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error fetching one ticket from Database'})
    }
}

export const addNewTicket = async (ticketInfo) => {
    try {
        const newTicket = await
        db('tickets')
            .insert(ticketInfo)
            .returning('*');

        return newTicket[0];

    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error adding new ticket to the database'})
    }
}