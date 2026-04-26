import { Router } from "express";
import { CreateProduct, GetAllProducts, GetProductById } from "../controllers/product.controller.js";
import { createProductValidator } from "../validator/product.validator.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.get("/", GetAllProducts);
router.get("/:id", GetProductById);
router.post("/", createProductValidator , validate , CreateProduct);

export default router;