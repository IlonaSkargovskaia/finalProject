import express from 'express';
import {getAllUsersController, getUserByIdController, addNewUserController, updateUserController, deleteUserController} from '../controllers/userController.js'

const router = express.Router();

router.get('/api/users', getAllUsersController);
router.post('/api/users', addNewUserController);
router.get('/api/users/:id', getUserByIdController);
router.put('/api/users/:id', updateUserController);
router.delete('/api/users/:id', deleteUserController);

export default router;