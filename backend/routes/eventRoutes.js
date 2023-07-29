import express from 'express';
import { getAllEventsController, addEventController, getEventByIDController } from '../controllers/eventController.js';


const router = express.Router();

router.get('/api/events', getAllEventsController);
router.post('/api/events', addEventController);
router.get('/api/events/:eventId', getEventByIDController);

export default router;