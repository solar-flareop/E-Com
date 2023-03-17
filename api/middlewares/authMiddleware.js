import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

//PROTECT ROUTES USING TOKENS
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWTSECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in requireSignIn middleware",
      error,
    });
  }
};

// PROTECT ROUTE ADMIN ACCESS
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({
        success: false,
        message: "UnAuthorized access(not admin)",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in admin middleware",
      error,
    });
  }
};
