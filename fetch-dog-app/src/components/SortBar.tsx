import React from 'react';
import '../styles/SortBar.css'

interface SortBarProps {
  onSortChange: (sort: string) => void;
}

const SortBar: React.FC<SortBarProps> = ({ onSortChange }) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="sort-bar">
      <select onChange={handleSortChange} defaultValue="breed:asc">
        <option value="breed:asc" disabled>Sort By</option>
        <option value="breed:asc">Breed (Asc)</option>
        <option value="breed:desc">Breed (Desc)</option>
        <option value="name:asc">Name (Asc)</option>
        <option value="name:desc">Name (Desc)</option>
        <option value="age:asc">Age (Asc)</option>
        <option value="age:desc">Age (Desc)</option>
      </select>
    </div>
  );
};

export default SortBar;
