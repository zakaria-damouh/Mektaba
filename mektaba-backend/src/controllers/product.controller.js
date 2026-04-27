import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from "../services/product.service.js";

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

export async function CreateProduct(req, res) {
  try {
    const data = req.body;

    await createProductService(data);

    res.status(201).json({ success: true, message: "Product created successfully" });
  } catch (error) {
    if (error.message.includes("already exists")) {
      return res.status(409).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
}

export async function DeleteProduct(req, res) {
  try {
    const product = await deleteProductService(req.params.id);
    res.json({ success: true, data: product });
  } catch (error) {
    if (error.message === "Product not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: error.message });
  }
}
export async function UpdateProduct(req, res) {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        success: false,
        message: "ID produit invalide",
      });
    }

    const data = req.body;

    // ✅ Normalize categoryIds (very important)
    if (data.categoryIds) {
      data.categoryIds = data.categoryIds.map((id) => Number(id));
    }

    const updatedProduct = await updateProductService(id, data);

    return res.json({
      success: true,
      data: updatedProduct,
    });

  } catch (error) {
    console.error("UpdateProduct error:", error);

    if (error.message?.includes("not found")) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
