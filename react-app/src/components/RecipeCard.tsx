import React from "react";
import { Link } from "react-router-dom";
import type { RecipeWithId } from "../types/recipe";
import { getIngredientCount } from "../utils/getIngredientCount";

interface RecipeCardProps {
  recipe: RecipeWithId;
  onTagClick: (tag: string) => void;
}

const formatTime = (seconds: number | null): string => {
  if (!seconds) return "Время не указано";
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours} ч ${remainingMinutes} мин` : `${minutes} мин`;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onTagClick }) => (
  <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="group block">
    <article className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-amber-200 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group-hover:border-amber-400">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b border-amber-200">
        <h2 className="text-2xl font-serif text-amber-900 mb-2 group-hover:text-amber-700 transition-colors">
          {recipe.title}
        </h2>

        {/* Recipe Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-amber-700">
          <span className="flex items-center">
            <span className="mr-1">🍽️</span>
            {recipe.yield}
          </span>
          {recipe.total_time_seconds && (
            <span className="flex items-center">
              <span className="mr-1">⏰</span>
              {formatTime(recipe.total_time_seconds)}
            </span>
          )}
          <span className="flex items-center">
            <span className="mr-1">🥄</span>
            {getIngredientCount(recipe.ingredients)} ингр.
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Ingredients Preview */}
        <div className="mb-4">
          <h3 className="text-lg font-serif text-amber-900 mb-3 flex items-center">
            <span className="mr-2">🧄</span>
            Основные ингредиенты
          </h3>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
              <span
                key={index}
                className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-serif"
              >
                {ingredient.item}
              </span>
            ))}
            {recipe.ingredients.length > 4 && (
              <span className="text-xs bg-amber-200 text-amber-900 px-2 py-1 rounded-full font-serif">
                +{recipe.ingredients.length - 4} ещё
              </span>
            )}
          </div>
        </div>

        {/* Equipment Preview */}
        {recipe.equipment.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-serif text-amber-900 mb-3 flex items-center">
              <span className="mr-2">🔧</span>
              Оборудование
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.equipment.slice(0, 3).map((item, index) => (
                <span
                  key={index}
                  className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-serif"
                >
                  {item}
                </span>
              ))}
              {recipe.equipment.length > 3 && (
                <span className="text-xs bg-orange-200 text-orange-900 px-2 py-1 rounded-full font-serif">
                  +{recipe.equipment.length - 3} ещё
                </span>
              )}
            </div>
          </div>
        )}

        {/* Steps Preview */}
        <div className="mb-4">
          <h3 className="text-lg font-serif text-amber-900 mb-3 flex items-center">
            <span className="mr-2">📝</span>
            Количество шагов
          </h3>
          <div className="flex items-center text-amber-700">
            <div className="flex-1 bg-amber-100 rounded-full h-2 mr-3">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((recipe.steps.length / 10) * 100, 100)}%` }}
              ></div>
            </div>
            <span className="text-sm font-serif">
              {recipe.steps.length} шагов
            </span>
          </div>
        </div>

        {/* Dietary Tags */}
        {recipe.dietary_tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-serif text-amber-900 mb-3 flex items-center">
              <span className="mr-2">🌱</span>
              Особенности
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.dietary_tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-serif"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Custom Tags */}
        {recipe.custom_tags.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-serif text-amber-900 mb-3 flex items-center">
              <span className="mr-2">🏷️</span>
              Теги
            </h3>
            <div className="flex flex-wrap gap-2">
              {recipe.custom_tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-serif cursor-pointer hover:bg-purple-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onTagClick(tag);
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-serif text-amber-700 italic">
            Нажмите для просмотра рецепта
          </span>
          <div className="flex items-center text-amber-600 group-hover:text-amber-800 transition-colors">
            <span className="text-sm font-serif mr-2">Читать</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </article>
  </Link>
);

export default RecipeCard;
