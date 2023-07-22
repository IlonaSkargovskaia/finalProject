import { getAllEvents, addEvent } from "../models/eventModel.js";

export const getAllEventsController = async (req, res) => {
    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const addEventController = async (req, res) => {
    console.log(req.body);
    const {date, image_url, location, description, places} = req.body;


    try {
        const newEvent = await addEvent({
            date,
            image_url,
            location,
            description,
            places
        });

        //if all okay - 201
        res.status(201).json(newEvent);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}