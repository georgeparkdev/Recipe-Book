import type { Recipe, RecipeWithId } from '../types/recipe';

// Import all recipe JSON files dynamically
const recipeModules = import.meta.glob<Recipe>('./recipes/*.json', {
  eager: true,
  import: 'default',
});

// Create recipes array with IDs based on file names
const recipes: RecipeWithId[] = Object.entries(recipeModules).map(([path, recipe]) => {
  const fileName = path.split('/').at(-1) ?? '';
  const id = fileName.replace(/\.json$/, '');
  return { ...recipe, id };
});

export default recipes;

// Helper functions
export const getRecipeById = (id: string): RecipeWithId | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getAllRecipes = (): RecipeWithId[] => {
  return recipes;
};
