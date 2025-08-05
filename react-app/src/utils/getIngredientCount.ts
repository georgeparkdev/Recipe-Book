import type { Ingredient } from "../types/recipe";

export function getIngredientCount(ingredients: Ingredient[]): number {
  return ingredients.length;
}
