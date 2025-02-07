const Recipe = require("../models/recipeModel");

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;
    const newRecipe = new Recipe(recipeData);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully", data: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Failed to create recipe", error: error.message });
  }
};

// Get all recipes
const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

// Get a specific recipe by ID
const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await Recipe.findOne({ id });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error: error.message });
  }
};

// Update a recipe by ID
const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecipe = await Recipe.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe updated successfully", data: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error: error.message });
  }
};

// Delete a recipe by ID
const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ id });
    if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
