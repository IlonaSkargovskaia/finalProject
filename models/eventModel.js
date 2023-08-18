import db from "../config/db.js";

const currentDate = new Date();
export const getAllEvents = async () => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .where("date", ">", currentDate.toISOString())
            .orderBy("date", "asc");
        return events;
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Error fetching events from the database");
    }
};

export const getLastEvents = async () => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .where("date", ">", currentDate.toISOString())
            .orderBy("id", "desc");
        return events;
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Error fetching events from the database");
    }
};

export const getPastEvents = async () => {
    try {
        const pastEvents = await db
            .select("*")
            .from("events")
            .where("date", "<", currentDate.toISOString());

        return pastEvents;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching past events from the database");
    }
};

export const getAllAddresses = async () => {
    try {
        const addresses = await db.select("address").from("events");
        return addresses;
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Error fetching addresses from the database");
    }
};

export const getEventByID = async (id) => {
    try {
        const event = await db
            .select("*")
            .from("events")
            .where({ id })
            .andWhere("date", ">", currentDate.toISOString())
            .first();
        if (!event) {
            return null;
        }
        return event;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching one event from database");
    }
};

export const getEventsByCategory = async (categoryId) => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .where({ category_id: categoryId })
            .andWhere("date", ">", currentDate.toISOString());
        return events;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching events by category from the database");
    }
};

export const getEventsByLocation = async (locationId) => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .where({ location_id: locationId })
            .andWhere("date", ">", currentDate.toISOString());
        return events;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching events by category from the database");
    }
};

export const getEventsByDate = async (start_date, end_date) => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .whereBetween("date", [start_date, end_date])
            .andWhere("date", ">", currentDate.toISOString());
        return events;
    } catch (error) {
        throw new Error("Error fetching events by date from the database");
    }
};

export const getEventsByUserId = async (userId) => {
    try {
        const events = await db
            .select("*")
            .from("events")
            .where({ user_id: userId })
            .andWhere("date", ">", currentDate.toISOString())
            .orderBy("id", "desc");
        return events;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching events by user ID from the database");
    }
};

export const addEvent = async (eventInfo, userId) => {
    try {
        const newEvent = await db("events")
            .insert({ ...eventInfo, user_id: userId })
            .returning("*");

        console.log("New Event from the model: ", newEvent);

        return newEvent[0];
    } catch (error) {
        console.log("Error adding event:", error);
        throw new Error("Error adding event to the database");
    }
};

export const updateEvent = async (id, eventData) => {
    try {
        const updatedEvent = await db("events")
            .where({ id })
            .update(eventData)
            .returning("*");
        return updatedEvent[0]; //{[...]}
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Error updating event in the database");
    }
};

export const deleteEvent = async (id) => {
    try {
        const deletedEvent = await db("events")
            .where({ id })
            .del()
            .returning("*");
        return deletedEvent[0];
    } catch (error) {
        console.log("error: ", error);
        throw new Error("Error deleting event from the database");
    }
};

export const addFavorite = async (userId, eventId) => {
    try {
        const favorite = await db("favorites")
            .insert({ user_id: userId, event_id: eventId })
            .returning("*");
        return favorite[0];
    } catch (error) {
        console.log("Error adding favorite:", error);
        throw new Error("Error adding favorite to the database");
    }
};

export const removeFavorite = async (userId, eventId) => {
    try {
        const deletedFavorite = await db("favorites")
            .where({ user_id: userId, event_id: eventId })
            .del()
            .returning("*");
        return deletedFavorite[0];
    } catch (error) {
        console.log("Error removing favorite:", error);
        throw new Error("Error removing favorite from the database");
    }
};
