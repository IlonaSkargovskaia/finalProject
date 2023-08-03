import db from '../config/db.js';

export const getAllUsers = async () => {
    try {
        const users = await db.select('*').from('users');
        return users;
    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error fetching Users from database'})
    }
}

export const getUserById = async (id) => {
    try {
        const user = await
            db.select('*')
                .from('users')
                .where({id})
                .first();

        if (!user) {
            return null;
        } 
        return user;

    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error fetching one User from database'})
    }

}

export const addNewUser = async (userInfo) => {
    try {
        const newUser = await 
            db('users')
                .insert(userInfo)
                .returning('*');
                
        return newUser[0];
        
    } catch (error) {
        console.log(error);
        throw new Error({error: 'Error adding new User to the database'})
    }
}

export const updateUser = async (id, userData) => {
    try {
        const updatedUser = await db('users').where({id}).update(userData).returning('*');
        return updatedUser[0]; //{[...]}
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Error updating event in the database');
    }
}

export const deleteUser = async (id) => {
    try {
      const deletedUser = await db('users').where({ id }).del().returning('*');
      return deletedUser[0];
    } catch (error) {
      console.log('error: ', error);
      throw new Error('Error deleting event from the database');
    }
}