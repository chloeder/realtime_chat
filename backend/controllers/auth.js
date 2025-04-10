import User from "../model/user.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.log("error in loginUser", error.message);
    res.status(500).json({
      message: "Login failed",
    });
  }
};
export const registerUser = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password do not match",
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = await User.create({
      fullName,
      username,
      password: passwordHash,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });

    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error in registerUser", error.message);
    res.status(500).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log("error in logoutUser", error.message);
    res.status(500).json({
      message: "Logout failed",
    });
  }
};
