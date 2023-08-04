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

export const getTicketById = async (id) => {
    try {
        const ticket = await
        db.select('*')
            .from('tickets')
            .where({id})
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


export const updateTicket = async (id, ticketData) => {
    try {
        const updatedTicket = await db('tickets').where({id}).update(ticketData).returning('*');
        return updatedTicket[0]; //{[...]}
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error updating event in the database');
    }
}

export const deleteTicket = async (id) => {
    try {
      const deletedTicket = await db('tickets').where({ id }).del().returning('*');
      return deletedTicket[0];
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Error deleting event from the database');
    }
}