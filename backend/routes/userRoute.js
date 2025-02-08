const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");
const authenticateJWT = require("../middleware/authmiddleware");

const router = express.Router();

// Route to register a new user
router.post("/register", registerUser);

// Route to login an existing user
router.post("/login", loginUser);

// Route to get the user's profile (protected route)
router.get("/profile",authenticateJWT, getUserProfile);

// Route to update the user's profile (protected route)
router.put("/profile",  updateUserProfile);

module.exports = router;
