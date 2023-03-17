import productModel from "../models/productModule.js";
import fs from "fs";
import slugify from "slugify";

//CREATE  PRODUCTS
export const createProductController = async (req, res) => {
  try {
    const { name, price, quantity, description, category, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).json({ message: "Name is required" });
      case !price:
        return res.status(500).json({ message: "price is required" });
      case !quantity:
        return res.status(500).json({ message: "quantity is required" });
      case !description:
        return res.status(500).json({ message: "description is required" });
      case !category:
        return res.status(500).json({ message: "category is required" });
      case !photo || photo.size > 1000000:
        return res.status(500).json({
          message: "photo is required & size should be less than 1MB",
        });
    }
    const product = new productModel({ ...req.fields, slug: slugify(name) });

    //photo uploading
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Create product Error",
      error,
    });
  }
};

//GET ALL PRODUCTS
export const getProductController = async (req, res) => {
  try {
    const product = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 })
      .limit(12);
    res.status(200).json({
      success: true,
      totalCount: product.length,
      message: "Get all products successfull",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Get all product error",
      error,
    });
  }
};

//GET SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).json({
      success: true,
      message: "Single product successful",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Single product error",
      error,
    });
  }
};

//GET PRODUCT PHOTO
export const getProductPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).select("photo");

    //setting res type for photo------->IMP
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in get photo",
      error,
    });
  }
};

//DELETE PRODUCT
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id).select("-photo");
    res.status(200).json({
      success: true,
      message: "Delete product successful",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error delete product",
      error,
    });
  }
};

//update product
export const updateProductController = async (req, res) => {
  try {
    const { name, price, quantity, description, category, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res.status(500).json({ message: "Name is required" });
      case !price:
        return res.status(500).json({ message: "price is required" });
      case !quantity:
        return res.status(500).json({ message: "quantity is required" });
      case !description:
        return res.status(500).json({ message: "description is required" });
      case !category:
        return res.status(500).json({ message: "category is required" });
      case !photo || photo.size > 1000000:
        return res.status(500).json({
          message: "photo is required & size should be less than 1MB",
        });
    }
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    //photo uploading
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in update product",
      error,
    });
  }
};
