import User from "../model/user.js";

export const loginUser = (req, res) => {
  res.send("Login user");
};

export const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const user = await User.create({ name, username, password });
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "User creation failed",
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.send("Logout user");
};
