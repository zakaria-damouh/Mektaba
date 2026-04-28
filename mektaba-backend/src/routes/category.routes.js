import { Router } from "express";
import { CreateCategory, DeleteCategory, GetAllCategories, GetCategoryById, UpdateCategory } from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategoryValidator, updateCategoryValidator } from "../validator/category.validator.js";

const router = Router();

router.get("/", GetAllCategories);
router.get("/:id", GetCategoryById);
router.post("/", createCategoryValidator, validate, CreateCategory);
router.delete("/:id", DeleteCategory);
router.put("/:id", updateCategoryValidator, validate, UpdateCategory);

export default router;