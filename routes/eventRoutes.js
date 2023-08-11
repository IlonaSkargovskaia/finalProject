import express from 'express';
import { getAllEventsController, addEventController, getEventByIDController,updateEventController, deleteEventController, getEventsByCategoryController, getEventsByLocationController,getEventsByDateController, getEventsByUserIdController, getlastEventsController } from '../controllers/eventController.js';
import { authorization } from "../middleware/authorization.js";
import { getPurchasedSeatsForEvent } from '../models/ticketModel.js';


const router = express.Router();

router.get('/api/events', getAllEventsController);
router.get('/api/events-last', getlastEventsController);

router.post('/api/events', authorization, addEventController);
router.get('/api/events/user/:user_id', authorization, getEventsByUserIdController);

router.get('/api/events/:id', getEventByIDController);
router.get('/api/events-by-date', getEventsByDateController)

router.get('/api/events/category/:categoryId', getEventsByCategoryController);
router.get('/api/events/location/:locationId', getEventsByLocationController);

router.put('/api/events/:id', updateEventController);
router.delete('/api/events/:id', deleteEventController);

router.get("/api/events/:id/purchased-seats", async (req, res) => {
    const eventId = req.params.id;

    try {
        const purchasedSeats = await getPurchasedSeatsForEvent(eventId);
        res.status(200).json({ purchasedSeats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching purchased seats" });
    }
});




export default router;