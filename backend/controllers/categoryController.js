import {
    getAllCategories,
    addCategory,
    getCategoryByID,
    updateCategory,
    deleteCategory
} from "../models/categoryModel.js";

export const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await getAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getCategoryByIDController = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await getCategoryByID(categoryId);
        if (!category) {
            res.status(404).json({ msg: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const addCategoryController = async (req, res) => {
    const { name, description } = req.body;

    try {
        const newCategory = await addCategory({
            name,
            description,
        });

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateCategoryController = async (req, res) => {
    const { id } = req.body;
    const categoryData = req.body;

    try {
        const updatedCategory = await updateCategory(id, categoryData);
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const deleteCategoryController = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedCategory = await deleteCategory(id);
      if (!deletedCategory) {
        res.status(404).json({ msg: 'Category not found' });
      }
      res.status(200).json(deletedCategory);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error' });
    }
};
