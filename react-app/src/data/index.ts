import type { Recipe, RecipeWithId } from '../types/recipe';

// Import all recipe JSON files
import pastaWithCreamyCheeseSauceAndShrimp from './recipes/pasta-with-creamy-cheese-sauce-and-shrimp.json';

// Create recipes array with IDs
const recipes: RecipeWithId[] = [
  {
    ...pastaWithCreamyCheeseSauceAndShrimp as Recipe,
    id: 'pasta-with-creamy-cheese-sauce-and-shrimp',
  },
];

export default recipes;

// Helper functions
export const getRecipeById = (id: string): RecipeWithId | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getAllRecipes = (): RecipeWithId[] => {
  return recipes;
};
