import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:5000/recipes");
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/recepies/${id}`, { method: "DELETE" });
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id));
      console.log(`Recipe with ID ${id} deleted`);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/EditRecipe`, { state: { id } });
  };

  return (
    <div className="shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 m-6">
      <h3 className="block mb-4 text-2xl font-medium text-gray-900 dark:text-white">
        Recipes List
      </h3>
      <div className="space-y-4">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="p-4 border rounded-lg shadow bg-white"
          >
            <h4 className="text-lg font-semibold">{recipe.title}</h4>
            <div>
              <strong>Ingredients:</strong>
              <ul className="list-disc pl-6 mt-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              <strong>Steps:</strong> {recipe.steps}
            </p>
            <div className="mt-4 space-x-4">
              <button
                onClick={() => handleEdit(recipe.id)}
                className="bg-white text-green font-semibold py-1 rounded"
              >
                <PencilSquareIcon className="w-6 h-10 text-green-500 hover:text-green-400" />
              </button>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="bg-white hover:bg-white text-white font-semibold py-1 rounded"
              >
                <TrashIcon className="w-6 h-10 text-red-500 hover:text-red-700" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListRecipes;
