import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let recipes = []; // ✅ Fixed: Use "recipes" for consistency

// GET all recipes
router.get('/', (req, res) => {
    res.json(recipes);
});

// POST - Add a new recipe
router.post('/', (req, res) => {
    const recipe = req.body;

    if (!recipe.title || !recipe.ingredients || !recipe.steps) {
        return res.status(400).json({ message: "Missing required fields: title, ingredients, steps" });
    }

    const createdRecipe = { ...recipe, id: uuidv4() };
    recipes.push(createdRecipe);

    res.status(201).json(createdRecipe);
});

// GET a single recipe by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundRecipe = recipes.find((recipe) => recipe.id === id);

    if (!foundRecipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(foundRecipe);
});

// DELETE a recipe
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

    if (recipeIndex === -1) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    const deletedRecipe = recipes.splice(recipeIndex, 1);
    res.json({ message: "Recipe deleted successfully", deletedRecipe });
});

// PATCH - Update a recipe
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const recipe = recipes.find((recipe) => recipe.id === id);

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    const { title, ingredients, steps } = req.body;

    if (title) recipe.title = title;
    if (ingredients) recipe.ingredients = ingredients;
    if (steps) recipe.steps = steps;

    res.json({ message: "Recipe updated successfully", recipe });
});

export default router;
