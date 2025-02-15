import React, { useState } from "react";
import { CakeIcon, TrashIcon } from "@heroicons/react/24/solid";

function AddRecipe() {
  const [details, setDetails] = useState({
    title: "", 
    ingredients: [], 
    steps: ""
  });

  const [ingredient, setIngredient] = useState({
    name: "", 
    quantity: "", 
    unit: ""
  });

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
      const response = await fetch("http://localhost:5000/recipes", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        alert("Recipe added successfully!");
        setDetails({ title: "", ingredients: [], steps: "" });
      } else {
        alert("Failed to add recipe.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 pr-6 m-6">
      <form className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Create a New Recipe</h2>

        <div className="space-y-2">
          <label htmlFor="title" className="block text-lg font-semibold text-gray-700">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={details.title}
            placeholder="Enter recipe title"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-semibold text-gray-700">Ingredients:</label>
          <div className="flex gap-4">
            <input name="name" type="text" className="flex-1 p-3 border rounded-lg" placeholder="Ingredient name" value={ingredient.name} onChange={handleIngredientChange} />
            <input name="quantity" type="number" className="flex-1 p-3 border rounded-lg" placeholder="Quantity" value={ingredient.quantity} onChange={handleIngredientChange} />
            <input name="unit" type="text" className="flex-1 p-3 border rounded-lg" placeholder="Unit" value={ingredient.unit} onChange={handleIngredientChange} />
            <button type="button" onClick={addIngredient} className="bg-yellow-500 text-white py-2 px-4 rounded-lg">Add</button>
          </div>
          <ul className="mt-4 list-disc pl-6">
            {details.ingredients.map((ing, index) => (
              <li key={index} className="text-lg text-gray-700 flex items-center gap-2">
                <CakeIcon className="w-6 h-6 text-yellow-500" /> {ing.name}: {ing.quantity} {ing.unit}
                <button type="button" onClick={() => removeIngredient(index)} className="text-red-500 hover:text-red-400">
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <label htmlFor="steps" className="block text-lg font-semibold text-gray-700">Steps to Follow:</label>
          <textarea id="steps" name="steps" rows="4" className="w-full p-3 border rounded-lg" onChange={handleChange} value={details.steps} placeholder="Describe the steps to prepare the recipe"></textarea>
        </div>

        <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg" type="submit">Save Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipe;
