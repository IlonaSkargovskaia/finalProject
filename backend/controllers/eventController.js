import { getAllEvents, addEvent, getEventByID } from "../models/eventModel.js";

export const getAllEventsController = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getEventByIDController = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await getEventByID(eventId);
        if (!event) {
            res.status(404).json({msg: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const addEventController = async (req, res) => {
    console.log(req.body);
    const {title, description, date, time, location, image, createdAt, updatedAt} = req.body;


    try {
        const newEvent = await addEvent({
            title,
            description,
            date,
            time,
            location,
            image,
        });

        //if all okay - 201
        res.status(201).json(newEvent);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}