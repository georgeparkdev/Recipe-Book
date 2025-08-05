import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllRecipes } from "../data";
import Header from "./Header";
import SearchBar from "./SearchBar";
import RecipeGrid from "./RecipeGrid";

const RecipeListPage: React.FC = () => {
  const recipes = getAllRecipes();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
  }, [location.search]);

  const filteredRecipes = useMemo(() => {
    const tokens = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return recipes;
    return recipes.filter((recipe) =>
      tokens.every(
        (token) =>
          recipe.title.toLowerCase().includes(token) ||
          recipe.custom_tags.some((tag) => tag.toLowerCase().includes(token))
      )
    );
  }, [searchQuery, recipes]);

  const handleTagClick = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    setSearchQuery((prev) => {
      const tokens = prev.toLowerCase().split(/\s+/).filter(Boolean);
      if (tokens.includes(lowerTag)) return prev;
      return prev ? `${prev} ${tag}` : tag;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {recipes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl text-amber-300 mb-4">🍳</div>
            <h2 className="text-2xl font-serif text-amber-900 mb-2">
              Пока нет рецептов
            </h2>
            <p className="text-amber-700 font-serif">
              Добавьте свой первый рецепт, чтобы начать коллекцию
            </p>
          </div>
        ) : (
          <>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <RecipeGrid
              recipes={filteredRecipes}
              onTagClick={handleTagClick}
            />
          </>
        )}
      </main>
      <footer className="bg-white/80 backdrop-blur-sm border-t border-amber-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-amber-400"></div>
            <span className="mx-3 text-amber-500">❈</span>
            <div className="w-12 h-px bg-amber-400"></div>
          </div>
          <p className="text-amber-700 font-serif italic">
            Коллекция домашних рецептов с душой
          </p>
        </div>
      </footer>
    </div>
  );
};

export default RecipeListPage;
