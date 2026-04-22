import { Router } from "express";
import { GetAllProducts, GetProductById } from "../controllers/product.controller";

const router = Router();

router.get("/", GetAllProducts);
router.get("/:id", GetProductById);

export default router;