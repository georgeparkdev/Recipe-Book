import test from "node:test";
import assert from "node:assert";
import { getIngredientCount } from "./getIngredientCount.js";
import type { Ingredient } from "../types/recipe";

test("returns the number of ingredients", () => {
  const ingredients: Ingredient[] = [
    { quantity: 1, unit: "cup", item: "flour", descriptor: null, optional: false },
    { quantity: null, unit: null, item: "salt", descriptor: null, optional: false },
  ];
  assert.strictEqual(getIngredientCount(ingredients), 2);
});
