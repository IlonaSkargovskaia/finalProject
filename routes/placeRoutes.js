import express from 'express';
import { getPlaceByUUIDController } from '../controllers/placeController.js';

const router = express.Router();

router.get('/api/places/:uuid', getPlaceByUUIDController);

export default router;
