import { getAllProductsService, getProductByIdService } from "../services/product.service.js";

export async function GetAllProducts(req, res) {
  try {
    const result = await getAllProductsService(req.query);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function GetProductById(req, res) {
  try {
    const product = await getProductByIdService(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}