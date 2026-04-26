import { body } from "express-validator";

 
const nameValidator = body("name")
  .notEmpty()
  .withMessage("name is required")
  .isString()
  .withMessage("name must be a string")
  .isLength({ min: 2, max: 100 })
  .withMessage("name must be between 2 and 100 characters")
  .trim();
 
const nameArValidator = body("nameAr")
  .notEmpty()
  .withMessage("nameAr is required")
  .isString()
  .withMessage("nameAr must be a string")
  .isLength({ min: 2, max: 100 })
  .withMessage("nameAr must be between 2 and 100 characters")
  .trim();
 
const refValidator = body("ref")
  .notEmpty()
  .withMessage("ref is required")
  .isString()
  .withMessage("ref must be a string")
  .matches(/^[A-Z]{2,10}-\d{3,6}$/)
  .withMessage('ref must follow the pattern "XXX-000" (e.g. BUR-002)')
  .trim();
 
const priceValidator = body("price")
  .notEmpty()
  .withMessage("price is required")
  .isFloat({ min: 0 })
  .withMessage("price must be a non-negative number");
 
const stockValidator = body("stock")
  .notEmpty()
  .withMessage("stock is required")
  .isInt({ min: 0 })
  .withMessage("stock must be a non-negative integer");
 
const minStockValidator = body("minStock")
  .notEmpty()
  .withMessage("minStock is required")
  .isInt({ min: 0 })
  .withMessage("minStock must be a non-negative integer")
  .custom((value, { req }) => {
    if (req.body.stock !== undefined && value > req.body.stock) {
      throw new Error("minStock cannot be greater than stock");
    }
    return true;
  });
 
const supplierValidator = body("supplier")
  .notEmpty()
  .withMessage("supplier is required")
  .isString()
  .withMessage("supplier must be a string")
  .isLength({ min: 2, max: 100 })
  .withMessage("supplier must be between 2 and 100 characters")
  .trim();

 
export const createProductValidator = [
  nameValidator,
  nameArValidator,
  refValidator,
  priceValidator,
  stockValidator,
  minStockValidator,
  supplierValidator,
];