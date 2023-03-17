import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

//REGISTER USER
export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone, answer } = req.body;

    if (!name) {
      return res.json({ message: "Name required" });
    }
    if (!email) {
      return res.json({ message: "email required" });
    }
    if (!password) {
      return res.json({ message: "password required" });
    }
    if (!phone) {
      return res.json({ message: "phone required" });
    }
    if (!address) {
      return res.json({ message: "address required" });
    }
    if (!answer) {
      return res.json({ message: "Answer required" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Already registered",
      });
    }

    const hashedPassword = await hashPassword(password);

    //save
    const user = await userModel.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

//LOGIN USER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Email not registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }

    //json token
    const token = await jwt.sign({ _id: user._id }, process.env.JWTSECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//TEST CONTROLLER
export const testController = (req, res) => {
  res.json({ message: "PROTECTED ROUTE TESTING" });
};

//FORGOT PASSWROD
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).json({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).json({ message: "New Password is required" });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Wrong email or answer",
      });
    }

    //make newPassword hashed
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).json({
      success: true,
      message: "Password Reset Successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
