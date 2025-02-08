const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  ingredients: [ingredientSchema],
  instructions: { type: [String], required: true }, // Array of steps
  cuisineType: { type: String, required: true },
  cookingTime: { type: Number, required: true }, // in minutes
  servings: { type: Number, required: true },
  userRatings: { type: [Number], default: [] }, // Array of ratings
}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);
