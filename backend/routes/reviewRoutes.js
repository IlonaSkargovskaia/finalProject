import express from 'express';
import { getAllReviewsController, addNewReviewController, getReviewByIdController } from '../controllers/reviewController.js';


const router = express.Router();

router.get('/api/reviews', getAllReviewsController);
router.post('/api/reviews', addNewReviewController);
router.get('/api/reviews/:id', getReviewByIdController);

export default router;