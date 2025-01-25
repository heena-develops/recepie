import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListRecipes() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      Title: "Pasta",
      Ingredients: [
        { name: "Flour", quantity: 2, unit: "cups" },
        { name: "Eggs", quantity: 3, unit: "" },
      ],
      Steps: "Mix and cook",
    },
    {
      id: 2,
      Title: "Pizza",
      Ingredients: [
        { name: "Flour", quantity: 3, unit: "cups" },
        { name: "Cheese", quantity: 1, unit: "block" },
      ],
      Steps: "Prepare dough and bake",
    },
    {
      id: 3,
      Title: "Salad",
      Ingredients: [
        { name: "Lettuce", quantity: 1, unit: "head" },
        { name: "Tomato", quantity: 2, unit: "" },
      ],
      Steps: "Mix ingredients",
    },
  ]);

  const navigate = useNavigate();

  // Function to delete a recipe
  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    console.log(`Recipe with ID ${id} deleted`);
  };

  // Function to navigate to the edit page
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
            <h4 className="text-lg font-semibold">{recipe.Title}</h4>
            <div>
              <strong>Ingredients:</strong>
              <ul className="list-disc pl-6 mt-2">
                {recipe.Ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700">
                    {ingredient.name}: {ingredient.quantity} {ingredient.unit}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-4">
              <strong>Steps:</strong> {recipe.Steps}
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
