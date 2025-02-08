// Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ recipes }) => {
  const navigate = useNavigate();

  // For example, navigate to the first recipe's details.
  const handleViewDetails = () => {
    if (recipes.length > 0) {
      navigate(`/recipe/${recipes[0].id}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-orange-500">Home</h1>
      <button
        onClick={handleViewDetails}
        className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
      >
        View Details of First Recipe
      </button>
    </div>
  );
};

export default Home;
