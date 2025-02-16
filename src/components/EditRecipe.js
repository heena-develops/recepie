import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";

function EditRecipe() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state || {};

  const [details, setDetails] = useState({
    title: "",
    ingredients: [],
    steps: "",
  });

  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/recipes/${id}`)
        .then((response) => response.json())
        .then((data) => setDetails(data))
        .catch((error) => console.error("Error fetching recipe:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientChange = (e) => {
    const { name, value } = e.target;
    setIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const addIngredient = () => {
    if (ingredient.name && ingredient.quantity && ingredient.unit) {
      setDetails((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient],
      }));
      setIngredient({ name: "", quantity: "", unit: "" });
    }
  };

  const removeIngredient = (index) => {
    setDetails((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/recepies/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      if (response.ok) {
        console.log("Recipe updated successfully");
        navigate("/"); // Redirect after updating
      } else {
        console.error("Error updating recipe");
      }
    } catch (error) {
      console.error("Error submitting recipe update:", error);
    }
  };

  return (
    <div className="shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 m-6">
      <h3 className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
        Edit Recipe
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">
            Title:
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={details.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="ingredients"
            className="block text-lg font-semibold text-gray-700"
          >
            Ingredients:
          </label>
          <div className="flex gap-4">
            <input
              name="name"
              type="text"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={handleIngredientChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <input
              name="quantity"
              type="number"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={handleIngredientChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <input
              name="unit"
              type="text"
              placeholder="Unit (e.g., kg)"
              value={ingredient.unit}
              onChange={handleIngredientChange}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={addIngredient}
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              Add
            </button>
          </div>
          <ul className="mt-4 list-disc pl-6">
            {details.ingredients.map((ing, index) => (
              <li key={index} className="flex items-center justify-between">
                <span>
                  {ing.name}: {ing.quantity} {ing.unit}
                </span>
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <label
            htmlFor="steps"
            className="block text-lg font-semibold text-gray-700"
          >
            Steps to Follow:
          </label>
          <textarea
            id="steps"
            name="steps"
            rows="4"
            value={details.steps}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;
