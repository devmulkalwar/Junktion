import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/userModel.js";
import { generateTokenSetCookie } from "../utils/generateTokenSetCookie.js";

import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();


// Register new user
export const signup = async (req, res) => {
  const {
    name,
    email,
    password,
    confirmPassword,
    mobile,
    address,
    role,
  } = req.body;
  const profileImage = req.file;
  if (profileImage) {
    var { path } = profileImage;
  }

  try {
    // Validate user input
    console.log("Request body:", req.body);
    console.log("profileImage:", profileImage);
    if (
      !email ||
      !password ||
      !name ||
      !confirmPassword ||
      !mobile ||
      !address ||
      !role
    ) {
      fs.unlinkSync(path);
      throw new Error("All fields are required");
    }

    if (password === confirmPassword) {
      const userAlreadyExists = await User.findOne({ email });
      if (userAlreadyExists) {
        fs.unlinkSync(path);
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      // Upload profile image to Cloudinary if it exists
      let profileImageUrl = "";
      console.log(profileImage);
      if (profileImage) {
        console.log("image path :", path);
        const cloudinaryResult = await uploadOnCloudinary(path);
        console.log("cloudianry result :", cloudinaryResult);
        profileImageUrl = cloudinaryResult.url;
      }

      // Hash password
      const hashedPassword = await bcryptjs.hash(password, 10);

      // Generate verification token
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        mobile ,
        address,
        profileImage: profileImageUrl,
      });

      console.log("User data before saving:", user); // Check if the data is correct

      await user.save(); // Check if save works
      console.log("User saved successfully");

      // Generate JWT token and set cookie
       const token = generateTokenSetCookie(res, user._id);
       console.log(token); 

      // Send verification email
      await sendVerificationEmail(user.email, verificationToken);

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: { ...user._doc, password: undefined },
      });
    } else {
      throw new Error("Passwords do not match");
    }
  } catch (error) {
    console.error("Error during signup:", error); // Log the error to see details
    res.status(400).json({ success: false, message: error.message });
  }
};

// Verify user email
export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//login user
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("from backend", email, password);
  try {
    const user = await User.findOne({ email });
   
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    generateTokenSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//logout user
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

//forgot password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Email Id" });
    }

    // Generate password reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    console.log("Stored token form forgot pass:", resetToken);
    console.log("Token expiration date:", resetTokenExpiresAt);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();
    console.log();
    // Send password reset email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/resetPassword/${resetToken}`
    );

    res.status(200).json({
      success: true,
      message: "Reset password email sent successfully",
      resetToken
    });

  } catch (error) {
    console.log("Error in Forgot password ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//reset password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log("token form reset password", token, password);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired reset token" });
    }

    console.log("Stored token:", user.resetPasswordToken);
    console.log("Token expiration date:", user.resetPasswordExpiresAt);

    console.log("old password", user.password);

    // update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();
    console.log(user.password);
    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log("Error in resetPassword ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

//check for authenticated user
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
