// import React from 'react';
// import DogList from '../components/DogList';

// const SearchPage: React.FC = () => (
//   <div>
//     <h1>Search Dogs</h1>
//     <DogList />
//   </div>
// );

// export default SearchPage;
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
  // const [favorites, setFavorites] = useState<Dog[]>([]);
  const [queryParams, setQueryParams] = useState({
    breeds: [],
    zipcodes: [],
    size: 25,
    from: 0,
    sort: 'breed:asc',
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const breedData = await getBreeds();
  //     setBreeds(breedData);
  //     const dogData = await searchDogs(queryParams);
  //     setDogs(dogData.resultIds);
  //     setTotal(dogData.total);
  //   };
  //   fetchData();
  // }, [queryParams]);

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
      }
    };
    fetchData();
  }, [queryParams]);

  // const handleFavoriteToggle = (dog: Dog) => {
  //   setFavorites((prevFavorites) =>
  //     prevFavorites.some((favDog) => favDog.id === dog.id)
  //       ? prevFavorites.filter((favDog) => favDog.id !== dog.id)
  //       : [...prevFavorites, dog]
  //   );
  // };

  const handlePageChange = (newFrom: number) => {
    setCurrentPage(Math.floor(newFrom / queryParams.size)); // Update current page based on the new offset
    setQueryParams({ ...queryParams, from: newFrom });
  };

  const handleFilterChange = (filters: any) => {
    setCurrentPage(0);
    setQueryParams({ ...queryParams, ...filters, from: 0 });
    // setQueryParams(prevParams => ({
    //   ...prevParams,
    //   breeds: filters.breeds && filters.breeds.length ? filters.breeds : prevParams.breeds,
    //   zipcodes: filters.zipcodes && filters.zipcodes.length ? filters.zipcodes : prevParams.zipcodes,
    // }));
  };

  const handleSortChange = (sort: string) => {
    setCurrentPage(0);
    setQueryParams({ ...queryParams, sort, from: 0 });
  };

  // const handlePageChange = (newFrom: number) => {
  //   setQueryParams({ ...queryParams, from: newFrom });
  // };

  return (
    <div>
      <div className="search-sort-container">
        <FilterBar breeds={breeds} onFilterChange={handleFilterChange} />
        <SortBar onSortChange={handleSortChange} />
      </div>
      <DogList dogIds={dogs} onFavoriteToggle={onFavoriteToggle} favorites={favorites}/>
      {/* <Pagination total={total} size={queryParams.size} onPageChange={handlePageChange} /> */}
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
