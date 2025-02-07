const Recipe = require('../models/recipeModel');

const getRecommendations = async (ingredient) => {
  return await Recipe.find({ ingredients: { $regex: ingredient, $options: 'i' } });
};

module.exports = { getRecommendations };