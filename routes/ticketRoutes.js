import express from 'express';
import {getAllTicketsController, addNewTicketController, getTicketByIdController, updateTicketController, deleteTicketController, purchaseTickets} from '../controllers/ticketController.js'
import { authorization } from '../middleware/authorization.js';

const router = express.Router();

router.get('/api/tickets', getAllTicketsController);
router.post('/api/tickets', addNewTicketController);
router.post('/api/tickets/:id/purchase', authorization, purchaseTickets);
router.get('/api/tickets/:id', getTicketByIdController);
router.put('/api/tickets/:id', updateTicketController);
router.delete('/api/tickets/:id', deleteTicketController);

export default router;