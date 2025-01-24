import React from 'react';
import { useState } from 'react';


function AddRecipe(){
  const [details, setDetails]=useState({
    Title:"",
    Ingredients:"",
    StepstoFollow:""
  })
  const handleChange = (e) => {
    const {name, value} = e.target
  setDetails((prev) =>{
    return {...prev, [name]: value}
  })
   };
   const handleSubmit =(e) => {
    e.preventDefault();
     console.log(details);
   }
    return (
      <div className='shadow-lg w-3/4 self-center md:mx-auto my-6 mt-4 pb-6 pt-24 pl-6 m-6'>
              <h3 className='block mb-2 text-2xl font-medium text-gray-900 dark:text-white'>Add New Recipe</h3>
      <form className='' onSubmit={handleSubmit}>
        <h3>Title:</h3><input name="Title" type='text' onChange={handleChange}/>
        <h3>Ingredients:</h3><input name="Ingredients" type='text'  onChange={handleChange}/>
        <h3>Steps to Follow:</h3><textarea name="StepstoFollow" onChange={handleChange}></textarea>
        <button className='btn bg-yellow-500 hover:bg-yellow-400 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static' type='submit'>Save Recipe</button>
      </form>
      </div>
    );
};

export default AddRecipe;
