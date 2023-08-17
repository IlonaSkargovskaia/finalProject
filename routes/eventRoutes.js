import express from 'express';
import { getAllEventsController, addEventController, getEventByIDController,updateEventController, deleteEventController, getEventsByCategoryController, getEventsByLocationController,getEventsByDateController, getEventsByUserIdController, getlastEventsController, getAddressController, addFavoriteController, removeFavoriteController, getFavoriteStatus, getPastEventsController } from '../controllers/eventController.js';
import { authorization } from "../middleware/authorization.js";


const router = express.Router();

router.get('/api/events', getAllEventsController);
router.get('/api/events-last', getlastEventsController);
router.get('/api/events/:id/address', getAddressController);
router.post('/api/events', authorization, addEventController);
router.get('/api/events/user/:user_id', authorization, getEventsByUserIdController);

router.get('/api/events/:id', getEventByIDController);
router.get('/api/events-by-date', getEventsByDateController);
router.get('/api/past-events', getPastEventsController);


router.get('/api/events/category/:categoryId', getEventsByCategoryController);
router.get('/api/events/location/:locationId', getEventsByLocationController);

router.put('/api/events/:id', updateEventController);
router.delete('/api/events/:id', deleteEventController);

router.get('/api/favorites/:id', authorization, getFavoriteStatus);
router.post('/api/favorites/:id', authorization, addFavoriteController);
router.delete('/api/favorites/:id', authorization, removeFavoriteController);


export default router;