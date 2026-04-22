import { Router } from "express";
import { GetAllCategories, GetCategoryById } from "../controllers/category.controller.js";

const router = Router();

router.get("/", GetAllCategories);
router.get("/:id", GetCategoryById);

export default router;