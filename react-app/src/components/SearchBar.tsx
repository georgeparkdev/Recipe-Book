import React from "react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => (
  <div className="max-w-md mx-auto mb-8">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder="Поиск по названию или тегам"
      className="w-full px-4 py-2 border border-amber-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 font-serif"
    />
  </div>
);

export default SearchBar;
