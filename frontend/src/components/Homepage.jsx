import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChefHat, Filter, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Homepage = ({
  onRecipeClick = (id) => console.log(`Recipe ${id} clicked`),
}) => {
  // Rest of the component code stays exactly the same until the recipe card button
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [isVeg, setIsVeg] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const ingredientList = [
    "Chicken",
    "Tomato",
    "Onion",
    "Garlic",
    "Beef",
    "Spinach",
    "Cheese",
    "Mushroom",
    "Potato",
    "Carrot",
    "Lettuce",
    "Cucumber",
    "Bacon",
    "Pork",
    "Shrimp",
    "Rice",
    "Egg",
    "Pepper",
    "Chili",
    "Fish",
  ];

  const cuisineList = [
    "Italian",
    "Mexican",
    "Indian",
    "Chinese",
    "Mediterranean",
    "Japanese",
    "French",
    "American",
    "Greek",
  ];

  const fetchRecipes = async () => {
    const apiKey = "10972795c6msha294e4539988a77p1ac91ajsn2158c46ca685";
    const size = 50;
    const url = `https://tasty.p.rapidapi.com/recipes/list?from=${
      (page - 1) * size
    }&size=${size}&q=${ingredients}&cuisine=${cuisine}&is_vegetarian=${isVeg}`;

    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "tasty.p.rapidapi.com",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch recipes");
      const data = await response.json();
      setRecipes((prevRecipes) => [...prevRecipes, ...(data.results || [])]);
      setHasMore(data.results.length === size);
    } catch (err) {
      console.error("Error fetching recipes:", err);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    setRecipes([]);
    setPage(1);
    setShowFilters(false);
    fetchRecipes();
  };

  const loadMoreRecipes = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const handleIngredientChange = (ingredient) => {
    const newIngredients = ingredients.split(",").map((item) => item.trim());
    if (newIngredients.includes(ingredient)) {
      const updatedIngredients = newIngredients.filter(
        (item) => item !== ingredient
      );
      setIngredients(updatedIngredients.join(", "));
    } else {
      setIngredients([...newIngredients, ingredient].join(", "));
    }
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  if (loading && page === 1) {
    return (
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="h-64 w-full bg-gray-200 animate-pulse" />
            <div className="p-6">
              <div className="h-6 w-3/4 mb-4 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-full mb-2 bg-gray-200 animate-pulse rounded" />
              <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <h1 className="text-3xl font-bold text-gray-900">
              Delicious Recipes
            </h1>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="border-b border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Filter Recipes
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Ingredients
                  </label>
                  <div className="h-48 overflow-y-auto border rounded-md p-4">
                    <div className="space-y-2">
                      {ingredientList.map((ingredient) => (
                        <div
                          key={ingredient}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={ingredient}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                            checked={ingredients
                              .split(",")
                              .map((item) => item.trim())
                              .includes(ingredient)}
                            onChange={() => handleIngredientChange(ingredient)}
                          />
                          <label htmlFor={ingredient} className="text-sm">
                            {ingredient}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cuisine
                  </label>
                  <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All Cuisines</option>
                    {cuisineList.map((cuisineItem) => (
                      <option key={cuisineItem} value={cuisineItem}>
                        {cuisineItem}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Dietary
                  </label>
                  <select
                    value={isVeg}
                    onChange={(e) => setIsVeg(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">All</option>
                    <option value="true">Vegetarian</option>
                    <option value="false">Non-Vegetarian</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={applyFilters}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <motion.div
              key={recipe.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video">
                  <img
                    src={recipe.thumbnail_url}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 text-gray-900 rounded-full text-sm font-medium">
                    {recipe.cuisine || "World Cuisine"}
                  </span>
                </div>
                <div className="flex-grow p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {recipe.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {recipe.description || "No description available."}
                  </p>
                </div>
                <div className="p-6 pt-0">
                  <button
                    className="w-full px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    onClick={() => handleRecipeClick(recipe.id)}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreRecipes}
              disabled={loading}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Recipes"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
