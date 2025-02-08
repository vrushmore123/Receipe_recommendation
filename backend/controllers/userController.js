const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, age, contactNo } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      age,
      contactNo,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in user", error: error.message });
  }
};

// Get user profile (requires authentication)
const getUserProfile = async (req, res) => {
  const userId = req.user.userId; // Extracted from JWT token

  try {
    // Fetch user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password from response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile", error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const userId = req.user.userId; // Extracted from JWT token
  const { username, email, age, contactNo } = req.body;

  try {
    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, age, contactNo },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
