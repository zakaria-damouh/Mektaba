import { Router } from "express";
import { CreateCategory, GetAllCategories, GetCategoryById } from "../controllers/category.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createCategoryValidator } from "../validator/category.validator.js";

const router = Router();

router.get("/", GetAllCategories);
router.get("/:id", GetCategoryById);
router.post("/", createCategoryValidator, validate, CreateCategory);

export default router;