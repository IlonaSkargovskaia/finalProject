import express from 'express';
import eventRoutes from './eventRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import ticketRoutes from './ticketRoutes.js';
import userRoutes from './userRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import locationRoutes from './locationRoutes.js'

const router = express.Router();

router.use('/', eventRoutes);
router.use('/', reviewRoutes);
router.use('/', ticketRoutes);
router.use('/', userRoutes);
router.use('/', categoryRoutes);
router.use('/', locationRoutes);

export default router;