import React, { useState, useEffect, useRef } from 'react';
import '../styles/FilterBar.css';

interface FilterBarProps {
  breeds: string[];
  onFilterChange: (filters: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ breeds, onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [temporarySelection, setTemporarySelection] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCheckboxChange = (breed: string) => {
    if (temporarySelection.includes(breed)) {
      setTemporarySelection(temporarySelection.filter(item => item !== breed));
    } else {
      setTemporarySelection([...temporarySelection, breed]);
    }
  };

  const handleApply = () => {
    setSelectedBreeds(temporarySelection);
    onFilterChange({ breeds: temporarySelection });
    setIsDropdownVisible(false);
  };

  const handleReset = () => {
    console.log(selectedBreeds);
    setTemporarySelection([]);
    setSelectedBreeds([]);
    onFilterChange({ breeds: [] });
    setIsDropdownVisible(false);
  };

  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  const filteredBreeds = breeds.filter(breed =>
    breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-bar" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="dropdown-trigger">
        Select Breeds
      </button>

      {isDropdownVisible && (
        <div className="dropdown">
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
