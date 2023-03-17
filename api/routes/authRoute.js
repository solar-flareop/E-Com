import express from "express";
const router = express.Router();
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

//REGISTER USER
router.post("/register", registerController);

//LOGIN USER
router.post("/login", loginController);

//TEST CONTROLLER
router.get("/test", requireSignIn, isAdmin, testController);

//FORGET PASSWORD
router.post("/forgot-password", forgotPasswordController);

//PROTECTED ROUTE AUTH USER FRONTEND
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//PROTECTED ROUTE AUTH ADMIN FRONTEND
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
