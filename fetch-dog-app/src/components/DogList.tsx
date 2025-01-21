import React, { useState, useEffect } from 'react';
import DogCard from './DogCard';
import { Dog } from '../types/types';
import { getDogsByIds } from '../api/apiService';
import '../styles/DogList.css';

interface DogListProps {
  dogIds: string[];
  onFavoriteToggle: (dog: Dog) => void;
  favorites: Dog[];
}

const DogList: React.FC<DogListProps> = ({ dogIds, onFavoriteToggle, favorites }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (dogIds.length > 0) {
        try {
          const fetchedDogs = await getDogsByIds(dogIds);
          setDogs(fetchedDogs.data);
        } catch (error) {
          console.error('Error fetching dogs:', error);
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('favorites');
          window.location.href = '/';
        }
      }
    };
    fetchData();
  }, [dogIds]);

  return (
    <div className="dog-list">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} onFavoriteToggle={onFavoriteToggle}
        isFavorite={favorites.some(favDog => favDog.id === dog.id)}/>
      ))}
    </div>
  );
};

export default DogList;
