# Prompt: Create a Single-Page Recipe Component (React, 1 Recipe)

## Overview

Create a React component that renders a single recipe page using the following requirements:

- Use the provided visual style and structure (see the example template below).
- Use a placeholder chef avatar image and name (do not extract from the recipe JSON).
- Extract all recipe data (title, description, ingredients, instructions, times, servings, etc.) from the provided JSON file.
- If any field is missing in the JSON, use a sensible default or display a placeholder (e.g., "No description available", "Unknown", etc.).
- Include Schema.org structured data for the recipe, matching the example.
- The component should be self-contained and ready to use in a React app.
- Use the provided template as a base; only change the content to match the recipe data.
- The component should be named `RecipeDetailPage`.
- All code should be written in English and commented for developer clarity.

## Example Template

```jsx
import React from "react";

// Using placeholder image for demo purposes
const ChefAvatar =
  "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=200&h=200&fit=crop&crop=face";

const RecipeDetailPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: "Garlic Butter Shrimp Linguine",
    author: { "@type": "Person", name: "John Doe" },
    image:
      "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=200&h=200&fit=crop&crop=face",
    description:
      "A restaurant-quality pasta dish featuring succulent shrimp tossed in a rich garlic butter sauce.",
    prepTime: "PT15M",
    cookTime: "PT20M",
    recipeYield: "4 servings",
    recipeIngredient: [
      "400 g linguine",
      "450 g large shrimp, peeled and deveined",
      "4 tbsp unsalted butter",
      "5 cloves garlic, minced",
      "2 tbsp fresh parsley, chopped",
      "Salt and cracked pepper to taste",
    ],
    recipeInstructions: [
      "Bring a large pot of salted water to a boil; cook linguine until al dente. Drain.",
      "In a skillet over medium heat, melt butter; sauté garlic for 1 minute.",
      "Add shrimp; cook 2-3 minutes per side until pink.",
      "Toss pasta with shrimp and butter sauce; season, garnish with parsley, serve hot.",
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
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
                Recipe Collection
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
                  alt="Portrait of Chef John Doe"
                  className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-amber-300 shadow-lg sepia"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-200 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-700 text-xs font-bold">
                  ✓
                </div>
              </div>
              <h2 className="mt-4 text-amber-800 text-xl font-serif italic">
                ~ Chef John Doe ~
              </h2>
            </header>

            <main className="space-y-8">
              {/* Recipe Title */}
              <section aria-label="Recipe overview" className="text-center">
                <h1 className="text-3xl font-serif text-amber-900 mb-4 underline decoration-amber-400 decoration-2 underline-offset-4">
                  Garlic Butter Shrimp Linguine
                </h1>
                <p className="text-base text-amber-800 leading-7 italic font-serif max-w-2xl mx-auto">
                  "A restaurant-quality pasta dish featuring succulent shrimp
                  tossed in a rich garlic-butter sauce."
                </p>

                {/* Handwritten-style meta info */}
                <div className="mt-6 flex justify-center">
                  <div className="bg-amber-100 border border-amber-300 rounded-lg px-6 py-3 shadow-sm">
                    <dl className="flex flex-wrap gap-6 text-sm text-amber-700 font-serif">
                      <div>
                        <dt className="sr-only">Prep Time</dt>
                        <dd>⏰ 15 min prep</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Cook Time</dt>
                        <dd>🔥 20 min cook</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Servings</dt>
                        <dd>🍽️ Serves 4</dd>
                      </div>
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
                  Ingredients
                </h3>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 pl-6 py-4 rounded-r-lg">
                  <ul className="space-y-2 text-base leading-7 font-serif text-amber-800">
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>400 g linguine</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>450 g large shrimp, peeled & deveined</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>4 tbsp unsalted butter</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>5 cloves garlic, minced</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>2 tbsp fresh parsley, chopped</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-600 mr-3">•</span>
                      <span>Salt & cracked pepper to taste</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Instructions - Recipe Book Style */}
              <section aria-label="Preparation steps" className="relative">
                <h3 className="text-2xl font-serif text-amber-900 mb-4 text-center border-b border-amber-300 pb-2">
                  Method
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      1
                    </span>
                    <p className="text-base leading-7 font-serif text-amber-800">
                      Bring a large pot of salted water to a boil; cook linguine
                      until al dente. Drain.
                    </p>
                  </div>
                  <div className="flex items-start bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      2
                    </span>
                    <p className="text-base leading-7 font-serif text-amber-800">
                      In a skillet over medium heat, melt butter; sauté garlic
                      for 1 minute.
                    </p>
                  </div>
                  <div className="flex items-start bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      3
                    </span>
                    <p className="text-base leading-7 font-serif text-amber-800">
                      Add shrimp; cook 2-3 minutes per side until pink.
                    </p>
                  </div>
                  <div className="flex items-start bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-amber-300 text-amber-900 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      4
                    </span>
                    <p className="text-base leading-7 font-serif text-amber-800">
                      Toss pasta with shrimp and butter sauce; season, garnish
                      with parsley, serve hot.
                    </p>
                  </div>
                </div>
              </section>

              {/* Recipe Notes Section */}
              <section className="mt-8 border-t border-amber-300 pt-6">
                <div className="text-center">
                  <p className="text-sm font-serif italic text-amber-600">
                    ~ Chef's Note: Best served immediately with a glass of crisp
                    white wine ~
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
```

---

**Instructions:**

- Replace all hardcoded recipe data with values from the provided JSON file.
- Use placeholder values for chef info and image.
- If a field is missing in the JSON, use a default or placeholder.
- Ensure Schema.org structured data is present and matches the recipe.
- Comment your code for developer clarity.
- The component should be ready to use in a React app.
