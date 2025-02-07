const express = require("express");
const {
  createRecipe,
  getAllRecipes,
} = require("../controllers/recipeController");

const router = express.Router();

router.post("/recipes", createRecipe);
router.get("/home", getAllRecipes);

module.exports = router;
