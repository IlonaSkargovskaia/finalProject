import express from 'express';
import { getAllLocationController, addLocationController, updateLocationController, getLocationByIDController, deleteLocationController } from '../controllers/locationController.js';

const router = express.Router();

router.get('/api/locations', getAllLocationController);
router.post('/api/locations', addLocationController);
router.get('/api/locations/:locationId', getLocationByIDController);
router.put('/api/locations/:id', updateLocationController);
router.delete('/api/locations/:id', deleteLocationController);

export default router;
