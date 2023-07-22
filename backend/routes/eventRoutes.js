import express from 'express';
import { getAllEventsController, addEventController } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEventsController);
router.post('/', addEventController);

export default router;