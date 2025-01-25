import React, { useEffect, useState } from 'react';


const OnlineRecipes = () => {
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoryRes, areaRes, ingredientRes] = await Promise.all([
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list'),
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
                    fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
                ]);

                const categoryData = await categoryRes.json();
                const areaData = await areaRes.json();
                const ingredientData = await ingredientRes.json();

                setCategories(categoryData.meals);
                setAreas(areaData.meals);
                setIngredients(ingredientData.meals);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Online Recipes</h1>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Categories</h2>
                <ul className="list-disc list-inside">
                    {categories.map((category, index) => (
                        <li key={index} className="text-gray-700">{category.strCategory}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Areas</h2>
                <ul className="list-disc list-inside">
                    {areas.map((area, index) => (
                        <li key={index} className="text-gray-700">{area.strArea}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
                <ul className="list-disc list-inside">
                    {ingredients.map((ingredient, index) => (
                        <li key={index} className="text-gray-700">{ingredient.strIngredient}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OnlineRecipes;
