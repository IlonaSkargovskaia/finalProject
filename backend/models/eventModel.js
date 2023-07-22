import db from './config/db.js';


export const getAllEvents = async () => {
    try {
        const events = await db.select('*').from('events');
        return events;
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error fetching events from the database.');
    }
}

export const addEvent = async (eventInfo) => {
    
}