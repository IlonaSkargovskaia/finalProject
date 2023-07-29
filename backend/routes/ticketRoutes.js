import express from 'express';
import {getAllTicketsController, addNewTicketController, getTicketByIdController} from '../controllers/ticketController.js'


const router = express.Router();

router.get('/api/tickets', getAllTicketsController);
router.post('/api/tickets', addNewTicketController);
router.get('/api/tickets/:id', getTicketByIdController);

export default router;