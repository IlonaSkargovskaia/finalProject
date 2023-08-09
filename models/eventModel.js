import db from '../config/db.js';


export const getAllEvents = async () => {
    try {
        const events = await db.select('*').from('events').orderBy('id', 'asc');;
        return events;
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error fetching events from the database');
    }
}

export const getEventByID = async (id) => {
    try {
        const event = await db.select('*').from('events').where({id}).first();
        if (!event) {
            return null;
        }
        return event;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching one event from database')
    }
}

export const getEventsByCategory = async (categoryId) => {
    try {
        const events = await db.select('*').from('events').where({ category_id: categoryId });
        return events;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching events by category from the database');
    }
};

export const getEventsByLocation = async (locationId) => {
    try {
        const events = await db.select('*').from('events').where({ location_id: locationId });
        return events;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching events by category from the database');
    }
};

export const getEventsByDate = async (date) => {
    try {
        const events = await db.select('*').from('events').where({ date });
        return events;
      } catch (error) {
        throw new Error('Error fetching events by date from the database');
      }
}

export const getEventsByUserId = async (userId) => {
    try {
        const events = await db.select('*').from('events').where({ user_id: userId });
        return events;
    } catch (error) {
        console.log(error);
        throw new Error('Error fetching events by user ID from the database');
    }
};

export const addEvent = async (eventInfo, userId) => {
    try {
        const newEvent = await db('events')
            .insert({ ...eventInfo, user_id: userId })  
            .returning('*');

            console.log('New Event from the model: ', newEvent);

        return newEvent[0];
    } catch (error) {
        console.log('Error adding event:', error);
        throw new Error('Error adding event to the database');
    }
}

export const updateEvent = async (id, eventData) => {
    try {
        const updatedEvent = await db('events').where({id}).update(eventData).returning('*');
        return updatedEvent[0]; //{[...]}
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error updating event in the database');
    }
}

export const deleteEvent = async (id) => {
    try {
      const deletedEvent = await db('events').where({ id }).del().returning('*');
      return deletedEvent[0];
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Error deleting event from the database');
    }
}