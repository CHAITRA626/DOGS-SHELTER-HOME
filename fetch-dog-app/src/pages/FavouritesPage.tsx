import React, {useState} from 'react';
import DogCard from '../components/DogCard';
import { Dog } from '../types/types';
import '../styles/FavoritesPage.css';
import { matchDogs } from '../api/apiService';
import Confetti from 'react-confetti';


interface FavoritesPageProps {
  favorites: Dog[];
  onRemoveFavorite: (dog: Dog) => void;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({ favorites, onRemoveFavorite }) => {
    const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
    const handleFindMatch = async () => {
        try {
          const response = await matchDogs(favorites.map((dog) => dog.id));
          const matchedDogId = response.data.match;
          const matchedDogDetails = favorites.find((dog) => dog.id === matchedDogId);
          if (matchedDogDetails) {
            setMatchedDog(matchedDogDetails);
          }
        } catch (error) {
          console.error('Error finding match:', error);
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('favorites');
          window.location.href = '/';
        }
    };
    return(
        <div className="favorites-page">
            {!matchedDog && (
                <><h2>Your Favorite Dogs</h2><div className="favorites-list">
                    {favorites.map((dog) => (
                        <DogCard key={dog.id} dog={dog} onFavoriteToggle={onRemoveFavorite} isFavorite={true} />
                    ))}
                </div></>
            )}
            {matchedDog && (
                <div className="matched-dog">
                <Confetti />
                <h3>Your Match</h3>
                <DogCard dog={matchedDog} onFavoriteToggle={onRemoveFavorite} isFavorite={true} />
                </div>
            )}
            {favorites && favorites.length > 0 ?
                <button onClick={handleFindMatch} className="find-match-button">
                    Find a Match
                </button> :
                <div>You have no favorites!</div>
            }
        </div>
    );
};

export default FavoritesPage;
