import React, { useEffect, useState } from 'react';
import DogList from '../components/DogList';
import FilterBar from '../components/FilterBar';
import SortBar from '../components/SortBar';
import Pagination from '../components/Pagination';
import { searchDogs, getBreeds } from '../api/apiService';
import { Dog } from '../types/types';

interface SearchPageProps {
  favorites: Dog[];
  onFavoriteToggle: (dog: Dog) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ favorites, onFavoriteToggle }) => {
  const [dogs, setDogs] = useState<string[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [queryParams, setQueryParams] = useState({
    breeds: [],
    zipcodes: [],
    size: 25,
    from: 0,
    sort: 'breed:asc',
    ageMin: '', 
    ageMax: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const breedData = await getBreeds();
        setBreeds(breedData.data);
  
        const response = await searchDogs(queryParams);
        const dogData = response.data; // Accessing the data property of the Axios response
        setDogs(dogData.resultIds);
        setTotal(dogData.total);
      } catch (error) {
        console.error('Error fetching data:', error);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('favorites');
        window.location.href = '/';
      }
    };
    fetchData();
  }, [queryParams]);

  const handlePageChange = (newFrom: number) => {
    setCurrentPage(Math.floor(newFrom / queryParams.size)); // Update current page based on the new offset
    setQueryParams({ ...queryParams, from: newFrom });
  };

  const handleFilterChange = (filters: any) => {
    setCurrentPage(0);
    setQueryParams({ ...queryParams, ...filters, from: 0 });
  };

  const handleSortChange = (sort: string) => {
    setCurrentPage(0);
    setQueryParams({ ...queryParams, sort, from: 0 });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setCurrentPage(0);
    setQueryParams({ ...queryParams, size: newSize, from: 0 });
  };

  const handleAgeMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, ageMin: event.target.value, from: 0 });
  };

  const handleAgeMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({ ...queryParams, ageMax: event.target.value, from: 0 });
  };


  return (
    <div>
      <div className="search-sort-container">
        <FilterBar breeds={breeds} onFilterChange={handleFilterChange} />
        <div className="age-filter-container">
          <label htmlFor="ageMin">Min Age: </label>
          <input
            id="ageMin"
            type="number"
            value={queryParams.ageMin}
            onChange={handleAgeMinChange}
            min="0"
            max="100"
            placeholder="Min Age"
          />
          <label htmlFor="ageMax">Max Age: </label>
          <input
            id="ageMax"
            type="number"
            value={queryParams.ageMax}
            onChange={handleAgeMaxChange}
            min="0"
            max="100"
            placeholder="Max Age"
          />
        </div>
        <SortBar onSortChange={handleSortChange} />
        
        <div className="dropdown-container">
          {/* <label htmlFor="pageSizeSelect">Page Size: </label> */}
          <select
            id="pageSizeSelect"
            value={queryParams.size}
            onChange={handleSizeChange}
          >
            <option disabled>Page Size</option>
            {[10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100].map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
      </div>
      <DogList dogIds={dogs} onFavoriteToggle={onFavoriteToggle} favorites={favorites}/>
      <Pagination
        total={total}
        size={queryParams.size}
        currentPage={currentPage} // Pass currentPage to Pagination
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SearchPage;
