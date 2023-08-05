import express from 'express';
import { getAllEventsController, addEventController, getEventByIDController,updateEventController, deleteEventController, getEventsByCategoryController, getEventsByLocationController } from '../controllers/eventController.js';


const router = express.Router();

router.get('/api/events', getAllEventsController);
router.post('/api/events', addEventController);

router.get('/api/events/:id', getEventByIDController);

router.get('/api/events/category/:categoryId', getEventsByCategoryController);
router.get('/api/events/location/:locationId', getEventsByLocationController);
router.put('/api/events/:id', updateEventController);
router.delete('/api/events/:id', deleteEventController);


export default router;