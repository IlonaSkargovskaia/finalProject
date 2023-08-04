
import db from '../config/db.js';

export const getAllCategories = async () => {
  try {
    const categories = await db.select('*').from('category');
    return categories;
  } catch (error) {
    throw new Error('Error fetching categories from the database');
  }
};

export const getCategoryByID = async (categoryId) => {
  try {
    const category = await db.select('*').from('category').where({ id: categoryId }).first();
    if (!category) {
      return null;
    }
    return category;
  } catch (error) {
    throw new Error('Error fetching category from the database');
  }
};

export const addCategory = async (categoryInfo) => {
  try {
    const newCategory = await db('category').insert(categoryInfo).returning('*');
    return newCategory[0];
  } catch (error) {
    throw new Error('Error adding category to the database');
  }
};


export const updateCategory = async (id, categoryData) => {
  try {
    const updatedCategory = await db('category').where({id}).update(categoryData).returning('*');
    return updatedCategory[0];
  } catch (error) {
      console.log('error: ', error);
      throw new Error('Error updating category in the database');
  }
}

export const deleteCategory= async (id) => {
  try {
    const deletedCategory = await db('category').where({ id }).del().returning('*');
    return deletedCategory[0];
  } catch (error) {
    console.log('error: ', error);
    throw new Error('Error deleting category from the database');
  }
}