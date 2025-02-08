const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Ensure your user model is correctly imported

const registerUser = async (req, res) => {
  try {
    const { username, email, password, age, contactNo } = req.body;

    const user = new User({ username, email, password, age, contactNo });
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

module.exports = { registerUser };
