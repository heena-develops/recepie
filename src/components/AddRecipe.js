import React, { useState } from "react";
import { CakeIcon, TrashIcon } from "@heroicons/react/24/solid";

function AddRecipe() {
  const [details, setDetails] = useState({
    Title: "",
    Ingredients: [],
    StepstoFollow: "",
  });

  const [ingredient, setIngredient] = useState({
    name: "",
    quantity: "",
    unit: "",
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
        Ingredients: [...prev.Ingredients, ingredient],
      }));
      setIngredient({ name: "", quantity: "", unit:"" });
    }
  };

  const removeIngredient = (index) => {
    setDetails((prev) => ({
      ...prev,
      Ingredients: prev.Ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
  };

  return (
    <div className="shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 pr-6 m-6">
      <form
        className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl t-regular font-bold text-gray-800 mb-4 text-center">
          Create a New Recipe
        </h2>

        {/* Title */}
        <div className="space-y-2">
          <label htmlFor="Title" className="block t-regular text-lg font-semibold text-gray-700">
            Title:
          </label>
          <input
            id="Title"
            name="Title"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            onChange={handleChange}
            placeholder="Enter recipe title"
          />
        </div>

        {/* Ingredients */}
        <div className="space-y-2">
          <label
            htmlFor="Ingredients"
            className="block t-regular text-lg font-semibold text-gray-700"
          >
            Ingredients:
          </label>
          <div className="flex gap-4">
            <input
              name="name"
              type="text"
              className="flex-1 w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Ingredient name"
              value={ingredient.name}
              onChange={handleIngredientChange}
            />
            <input
              name="quantity"
              type="number"
              className="flex-1 w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Quantity (e.g., 2 cups)"
              value={ingredient.quantity}
              onChange={handleIngredientChange}
            />
             <input
              name="unit"
              type="text"
              className="flex-1 t-regular w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Unit (e.g., kg)"
              value={ingredient.unit}
              onChange={handleIngredientChange}
            />
            <button
              type="button"
              onClick={addIngredient}
              className="bg-yellow-500 hover:bg-yellow-400 t-regular text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              Add
            </button>
          </div>
          <ul className="mt-4 list-disc pl-6">
            {details.Ingredients.map((ing, index) => (
              <li key={index} className=" t-regular text-lg text-gray-700 flex items-center gap-2">
               <CakeIcon className="w-6 h-12 pb-1 text-yellow-500 hover:text-yellow-400"/> {ing.name}: {ing.quantity}{ing.unit}
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="text-red-500 t-regular hover:text-red-400"
                >
                  <TrashIcon className="h-5 w-5 ml-10" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <label
            htmlFor="StepstoFollow"
            className="block t-regular text-lg font-semibold text-gray-700"
          >
            Steps to Follow:
          </label>
          <textarea
            id="StepstoFollow"
            name="StepstoFollow"
            rows="4"
            className="w-full p-3 border t-regular border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            onChange={handleChange}
            placeholder="Describe the steps to prepare the recipe"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          className="w-full bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          type="submit"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
