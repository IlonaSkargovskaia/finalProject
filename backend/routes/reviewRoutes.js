import express from 'express';
import { getAllReviewsController, addNewReviewController, getReviewByIdController, updateReviewController, deleteReviewController } from '../controllers/reviewController.js';


const router = express.Router();

router.get('/api/reviews', getAllReviewsController);
router.post('/api/reviews', addNewReviewController);
router.get('/api/reviews/:id', getReviewByIdController);
router.put('/api/reviews/:id', updateReviewController);
router.delete('/api/reviews/:id', deleteReviewController);

export default router;