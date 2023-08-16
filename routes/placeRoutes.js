import express from 'express';
import { getPlaceByUUIDController, insertQrCodeDataController, getPurchasedSeatsByEventIDController } from '../controllers/placeController.js';

const router = express.Router();

router.get('/api/places/:uuid', getPlaceByUUIDController);
router.post('/api/places/', insertQrCodeDataController);
router.get('/purchased-seats/event/:event_id', getPurchasedSeatsByEventIDController);

export default router;
