import React from "react";
import { useParams, Link } from "react-router-dom";
import { getRecipeById } from "../data";

// Using placeholder image for demo purposes
const ChefAvatar =
  "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=200&h=200&fit=crop&crop=face";

const RecipeDetailPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const recipe = recipeId ? getRecipeById(recipeId) : undefined;

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-amber-900 mb-4">Рецепт не найден</h1>
          <Link
            to="/"
            className="text-amber-700 hover:text-amber-900 underline font-serif"
          >
            ← Вернуться к списку рецептов
          </Link>
        </div>
      </div>
    );
  }

  // Convert recipe data to structured data format
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    author: { "@type": "Person", name: "Шеф-повар" },
    image: ChefAvatar,
    description: recipe.title,
    prepTime: recipe.total_time_seconds ? `PT${Math.floor(recipe.total_time_seconds / 60)}M` : undefined,
    cookTime: recipe.total_time_seconds ? `PT${Math.floor(recipe.total_time_seconds / 60)}M` : undefined,
    recipeYield: recipe.yield,
    recipeIngredient: recipe.ingredients.map(ing => {
      const quantity = ing.quantity ? `${ing.quantity} ` : '';
      const unit = ing.unit ? `${ing.unit} ` : '';
      const descriptor = ing.descriptor ? ` (${ing.descriptor})` : '';
      return `${quantity}${unit}${ing.item}${descriptor}`;
    }),
    recipeInstructions: recipe.steps.map(step => step.action),
  };

  // Helper function to format time
  const formatTime = (seconds: number | null): string => {
    if (!seconds) return "Время не указано";
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
      return `${hours} ч ${remainingMinutes} мин`;
    }
    return `${minutes} мин`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      {/* Back button */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link
          to="/"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 font-serif text-lg"
        >
          ← Назад к рецептам
        </Link>
      </div>

      {/* Recipe Book Page */}
      <div className="max-w-4xl mx-auto">
        {/* Book Page Background */}
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-2xl relative border border-amber-200 rounded-sm">
          {/* Page Lines */}
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 25 }, (_, i) => (
              <div
                key={i}
                className="h-8 border-b border-red-200"
                style={{ marginTop: i * 32 + "px" }}
              />
            ))}
          </div>

          {/* Red Margin Line */}
          <div className="absolute left-16 top-0 bottom-0 w-px bg-red-300 opacity-40" />

          {/* Spiral Binding Holes */}
          <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-start pt-6 space-y-8">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full bg-gray-300 shadow-inner border border-gray-400"
              />
            ))}
          </div>

          <div className="relative z-10 px-20 py-12 sm:px-24 lg:px-28">
            {/* Page Header with decorative elements */}
            <div className="text-center mb-8 border-b-2 border-amber-300 pb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-px bg-amber-400"></div>
                <span className="mx-4 text-amber-600 text-2xl">✦</span>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
              <h1 className="text-4xl text-amber-900 mb-2 tracking-wide font-serif">
                Коллекция Рецептов
              </h1>
              <div className="flex items-center justify-center">
                <div className="w-16 h-px bg-amber-400"></div>
                <span className="mx-4 text-amber-600 text-2xl">✦</span>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
            </div>

            <header aria-label="Chef profile" className="text-center mb-8">
              <div className="relative inline-block">
                <img
                  src={ChefAvatar}
                  alt="Портрет шеф-повара"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-amber-300 shadow-lg sepia"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-200 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-700 text-xs font-bold">
                  ✓
                </div>
              </div>
              <h2 className="mt-4 text-amber-800 text-xl font-serif italic">
                ~ Шеф-повар ~
              </h2>
            </header>

            <main className="space-y-8">
              {/* Recipe Title */}
              <section aria-label="Recipe overview" className="text-center">
                <h1 className="text-3xl font-serif text-amber-900 mb-4 underline decoration-amber-400 decoration-2 underline-offset-4">
                  {recipe.title}
                </h1>
                <p className="text-base text-amber-800 leading-7 italic font-serif max-w-2xl mx-auto">
                  "{recipe.title}"
                </p>

                {/* Recipe meta info */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-amber-100 border border-amber-300 rounded-lg px-6 py-3 shadow-sm">
                    <dl className="flex flex-wrap gap-6 text-sm text-amber-700 font-serif justify-center">
                      {recipe.total_time_seconds && (
                        <div>
                          <dt className="sr-only">Общее время</dt>
                          <dd>⏰ {formatTime(recipe.total_time_seconds)}</dd>
                        </div>
                      )}
                      <div>
                        <dt className="sr-only">Порции</dt>
                        <dd>🍽️ {recipe.yield}</dd>
                      </div>
                      {recipe.equipment.length > 0 && (
                        <div>
                          <dt className="sr-only">Оборудование</dt>
                          <dd>🔧 {recipe.equipment.slice(0, 2).join(', ')}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </section>

              {/* Ingredients - Recipe Book Style */}
              <section aria-label="Ingredients list" className="relative">
                <div className="absolute -left-12 top-2 text-6xl text-amber-200 opacity-30 font-serif">
                  "
                </div>
                <h3 className="text-2xl font-serif text-amber-900 mb-4 text-center border-b border-amber-300 pb-2">
                  Ингредиенты
                </h3>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 pl-6 py-4 rounded-r-lg">
                  <ul className="space-y-2 text-base leading-7 font-serif text-amber-800">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-amber-600 mr-3">•</span>
                        <span className={ingredient.optional ? 'italic text-amber-600' : ''}>
                          {ingredient.quantity && `${ingredient.quantity} `}
                          {ingredient.unit && `${ingredient.unit} `}
                          {ingredient.item}
                          {ingredient.descriptor && ` (${ingredient.descriptor})`}
                          {ingredient.optional && ' - по желанию'}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Equipment Section */}
              {recipe.equipment.length > 0 && (
                <section aria-label="Equipment list" className="relative">
                  <h3 className="text-2xl font-serif text-amber-900 mb-4 text-center border-b border-amber-300 pb-2">
                    Оборудование
                  </h3>
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 pl-6 py-4 rounded-r-lg">
                    <ul className="flex flex-wrap gap-2 text-sm font-serif text-amber-800">
                      {recipe.equipment.map((item, index) => (
                        <li key={index} className="bg-amber-200 px-3 py-1 rounded-full">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Instructions - Recipe Book Style */}
              <section aria-label="Preparation steps" className="relative">
                <h3 className="text-2xl font-serif text-amber-900 mb-4 text-center border-b border-amber-300 pb-2">
                  Приготовление
                </h3>
                <div className="space-y-4">
                  {recipe.steps.map((step) => (
                    <div key={step.number} className="flex items-start bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                        {step.number}
                      </span>
                      <div className="flex-1">
                        <p className="text-base leading-7 font-serif text-amber-800">
                          {step.action}
                        </p>
                        {(step.duration_seconds || step.temperature_celsius || step.notes) && (
                          <div className="mt-2 text-sm text-amber-600 italic">
                            {step.duration_seconds && (
                              <span>⏱️ {formatTime(step.duration_seconds)} </span>
                            )}
                            {step.temperature_celsius && (
                              <span>🌡️ {step.temperature_celsius}°C </span>
                            )}
                            {step.notes && (
                              <div className="mt-1">💡 {step.notes}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recipe Notes Section */}
              <section className="mt-8 border-t border-amber-300 pt-6">
                <div className="text-center">
                  <p className="text-sm font-serif italic text-amber-600">
                    ~ Приятного аппетита! ~
                  </p>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="w-12 h-px bg-amber-400"></div>
                    <span className="mx-3 text-amber-500">❈</span>
                    <div className="w-12 h-px bg-amber-400"></div>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
