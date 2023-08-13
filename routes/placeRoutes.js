import express from 'express';
import { getPlaceByUUIDController, insertQrCodeDataController } from '../controllers/placeController.js';

const router = express.Router();

router.get('/api/places/:uuid', getPlaceByUUIDController);
router.post('/api/places/', insertQrCodeDataController);

export default router;
