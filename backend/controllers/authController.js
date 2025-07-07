import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";

// Helper: create JWT
const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// @desc Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ error: "Email already registered" });

    const user = await User.create({ name, email, password, role });

    const token = createToken(user);
    res.status(201).json({
      token,
      user: { name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// @desc Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = createToken(user);
    res.status(200).json({
      token,
      user: { name: user.name, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};

// @desc Send Password Reset Token
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 1000 * 60 * 15;
    await user.save();

    console.log(
      `Reset link: http://localhost:3000/reset-password/${resetToken}`
    );
    res.status(200).json({ message: "Reset link sent (check console)" });
  } catch (err) {
    res.status(500).json({ error: "Password reset failed" });
  }
};

// @desc Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ error: "Could not reset password" });
  }
};
