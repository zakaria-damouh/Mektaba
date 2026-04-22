import "dotenv/config";
import express from "express";
import cors from "cors";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors(
    {
        origin: "http://localhost:3000",
    }
));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Mektaba API is running" });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});