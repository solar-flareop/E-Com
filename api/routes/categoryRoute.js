import express from "express";
const router = express.Router();
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singleCategoryController,
  deleteCategoryController,
} from "../controllers/categoryController.js";

//CREATE CATEGORY [ADMIN TASK]
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY [ADMIN TASK]
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//GET ALL CATEGORIES [FOR ALL]
router.get("/get-category", categoryController);

//GET SINGLE CATEGORIES [FOR ALL]
router.get("/single-category/:slug", singleCategoryController);

//DELETE CATEGORY [ADMIN TASK]
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
