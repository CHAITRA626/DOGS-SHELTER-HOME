import React, { useState } from 'react';
import '../styles/FilterBar.css'; // Import the CSS file

interface FilterBarProps {
  breeds: string[];
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ breeds, onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handle checkbox selection
  const handleCheckboxChange = (breed: string) => {
    if (temporarySelection.includes(breed)) {
      setTemporarySelection(temporarySelection.filter(item => item !== breed));
    } else {
      setTemporarySelection([...temporarySelection, breed]);
    }
  };

  // Apply button handler
  const handleApply = () => {
    setSelectedBreeds(temporarySelection);
    onFilterChange({ breeds: temporarySelection});
    setIsDropdownVisible(false); // Hide dropdown after applying
  };

  // Reset button handler
  const handleReset = () => {
    console.log(selectedBreeds);
    setTemporarySelection([]);
    setSelectedBreeds([]);
    onFilterChange({breeds: []});
    setIsDropdownVisible(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Filter the breeds based on the search term
  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-bar">
      {/* Dropdown trigger */}
      <button onClick={toggleDropdown} className="dropdown-trigger">
        Select Breeds
      </button>

      {isDropdownVisible && (
        <div className="dropdown">
          {/* Search input */}
          <input
            type="text"
            placeholder="Search breeds..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />

          <div className="checkbox-group">
            {filteredBreeds.map(breed => (
              <label key={breed} className="checkbox-label">
                <input
                  type="checkbox"
                  value={breed}
                  checked={temporarySelection.includes(breed)}
                  onChange={() => handleCheckboxChange(breed)}
                />
                {breed}
              </label>
            ))}
          </div>

          <div className="button-group">
            <button onClick={handleApply} className="apply-button">
              Apply
            </button>
            <button onClick={handleReset} className="reset-button">
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
