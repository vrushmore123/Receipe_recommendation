import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const apiKey = "10972795c6msha294e4539988a77p1ac91ajsn2158c46ca685";
      const url = `https://tasty.p.rapidapi.com/recipes/list?from=${id}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "tasty.p.rapidapi.com",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch recipe details");

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe details:", err);
        setError("Failed to load recipe details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{recipe.name}</h1>
      <img
        src={recipe.thumbnail_url}
        alt={recipe.name}
        className="w-full max-h-96 object-cover mt-4"
      />
      <p className="mt-4">
        {recipe.description || "No description available."}
      </p>
      <ul className="mt-4">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index} className="list-disc ml-5">
            {ingredient.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
