import React from "react";
import type { RecipeWithId } from "../types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipeGridProps {
  recipes: RecipeWithId[];
  onTagClick: (tag: string) => void;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({ recipes, onTagClick }) => (
  <>
    <div className="text-center mb-8">
      <p className="text-amber-700 font-serif text-lg">
        Найдено рецептов: <span className="font-bold">{recipes.length}</span>
      </p>
    </div>
    {recipes.length === 0 ? (
      <div className="text-center py-16">
        <div className="text-6xl text-amber-300 mb-4">🍳</div>
        <h2 className="text-2xl font-serif text-amber-900 mb-2">Рецепты не найдены</h2>
        <p className="text-amber-700 font-serif">Попробуйте другой запрос или тег</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onTagClick={onTagClick} />
        ))}
      </div>
    )}
  </>
);

export default RecipeGrid;
