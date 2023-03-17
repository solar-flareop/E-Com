import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//CREATE CATEGORY
export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const existing = await categoryModel.findOne({ name });
    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Category already exists",
      });
    }
    const category = await categoryModel.create({
      name,
      slug: slugify(name),
    });
    res.status(201).json({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in create category",
      error,
    });
  }
};

//UPDATE CATEGORY
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Category Updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update category",
      error,
    });
  }
};

//GET ALL CATEGORY
export const categoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      message: "Got All categories list",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get all category",
      error,
    });
  }
};

//get single category
export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(200).json({
      success: true,
      message: " got single category",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get single category",
      error,
    });
  }
};

//DELETE CATEGORY
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModel.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: " category deleted successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error delete category",
      error,
    });
  }
};
