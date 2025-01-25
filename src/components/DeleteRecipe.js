import React, { useState } from 'react';

function DeleteRecipe() {
  const [recipeId, setRecipeId] = useState("");

  const handleChange = (e) => {
    setRecipeId(e.target.value);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    console.log(`Recipe with ID: ${recipeId} deleted.`);
  };

  return (
    <div className='shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 m-6'>
      <h3 className='block mb-2 text-2xl font-medium text-gray-900 dark:text-white'>Delete Recipe</h3>
      <form onSubmit={handleDelete}>
        <h3>Recipe ID:</h3>
        <input name="recipeId" type='text' placeholder='Enter Recipe ID' value={recipeId} onChange={handleChange} />
        <button className='btn ml-2 bg-red-500 hover:bg-red-400 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static' type='submit'>Delete Recipe</button>
      </form>
    </div>
  );
}

export default DeleteRecipe;
