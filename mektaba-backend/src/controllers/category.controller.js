import { createCategoryService, getAllCategoriesService, getCategoryByIdService } from "../services/category.service.js";

export async function GetAllCategories(req, res) {
  try {
    const categories = await getAllCategoriesService(req.query);
    res.json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function GetCategoryById(req, res) {
  try {
    const category = await getCategoryByIdService(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function CreateCategory(req, res) {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}