import express from 'express';
import { getAllCategoriesController, addCategoryController, getCategoryByIDController, updateCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/api/categories', getAllCategoriesController);
router.post('/api/categories', addCategoryController);
router.get('/api/categories/:categoryId', getCategoryByIDController);
router.put('/api/categories/:id', updateCategoryController);
router.delete('/api/categories/:id', deleteCategoryController);

export default router;