import React, { useState } from 'react';
import { useMemos } from '../context/MemoContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <input
      type="text"
      placeholder="Search memos..."
      value={query}
      onChange={handleSearch}
      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600"
    />
  );
};
