import express from 'express';
import eventRoutes from './eventRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

// Use the routes for each entity
router.use('/', eventRoutes);
router.use('/', reviewRoutes);
router.use('/', ticketRoutes);
router.use('/', userRoutes);

export default router;