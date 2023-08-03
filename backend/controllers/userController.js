import { getAllUsers, addNewUser, getUserById, updateUser, deleteUser } from "../models/userModel.js";

export const getAllUsersController = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

export const getUserByIdController = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await getUserById(id);
        if (!user) {
            res.status(404).json({msg: 'User not found'})
        }
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const addNewUserController = async (req, res) => {
    console.log(req.body);
    const {username, email, password, role} = req.body;

    try {
        const newUser = await addNewUser({
            username,
            email,
            password,
            role
        });
        
        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const updateUserController = async (req, res) => {
    const { id } = req.body;
    const userData = req.body;

    try {
        const updatedUser = await updateUser(id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const deleteUserController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await deleteUser(id);
      if (!deletedUser) {
        res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};