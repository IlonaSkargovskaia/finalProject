import express from 'express';
import {getAllTicketsController, addNewTicketController, getTicketByIdController, updateTicketController, deleteTicketController} from '../controllers/ticketController.js'


const router = express.Router();

router.get('/api/tickets', getAllTicketsController);
router.post('/api/tickets', addNewTicketController);
router.get('/api/tickets/:id', getTicketByIdController);
router.put('/api/tickets/:id', updateTicketController);
router.delete('/api/tickets/:id', deleteTicketController);

export default router;