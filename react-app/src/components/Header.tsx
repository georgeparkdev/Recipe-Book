import React from "react";

const Header: React.FC = () => (
  <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-px bg-amber-400"></div>
          <span className="mx-4 text-amber-600 text-2xl">✦</span>
          <div className="w-16 h-px bg-amber-400"></div>
        </div>
        <h1 className="text-5xl text-amber-900 mb-2 tracking-wide font-serif">
          Коллекция Рецептов
        </h1>
        <p className="text-lg text-amber-700 font-serif italic">
          Домашние рецепты с душой
        </p>
        <div className="flex items-center justify-center mt-4">
          <div className="w-16 h-px bg-amber-400"></div>
          <span className="mx-4 text-amber-600 text-2xl">✦</span>
          <div className="w-16 h-px bg-amber-400"></div>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
