import express from "express";
const router = express.Router();
import {
  createProductController,
  getProductController,
  getSingleProductController,
  getProductPhotoController,
  deleteProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

//CREATE PRODUCT [ADMIN]
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//UPDATE PRODUCT [ADMIN]
router.put(
  "/update-product/:id",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET ALL PRODUCTS [ALL]
router.get("/get-product", getProductController);

//GET SINGLE PRODUCTS [ALL]
router.get("/get-product/:slug", getSingleProductController);

//GET  PRODUCT  PHOTO
router.get("/product-photo/:pid", getProductPhotoController);

//DELETE  PRODUCT [ADMIN]
router.delete(
  "/delete-product/:id",
  requireSignIn,
  isAdmin,
  deleteProductController
);

export default router;
