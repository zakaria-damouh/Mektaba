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

export const createCategoryValidator = [nameValidator, nameArValidator];