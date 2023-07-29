import express from 'express';
import {getAllUsersController, getUserByIdController, addNewUserController} from '../controllers/userController.js'

const router = express.Router();

router.get('/api/users', getAllUsersController);
router.post('/api/users', addNewUserController);
router.get('/api/users/:id', getUserByIdController);

export default router;