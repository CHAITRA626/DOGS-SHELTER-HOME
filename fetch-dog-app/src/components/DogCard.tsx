import React, {useState} from 'react';
import { Dog } from '../types/types';
import '../styles/DogCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';

interface DogCardProps {
  dog: Dog;
  onFavoriteToggle: (dog: Dog) => void;
  isFavorite: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ dog, onFavoriteToggle, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    onFavoriteToggle(dog);
  };

  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-img" />
      <h3 className="dog-name">{dog.name}</h3>
      <p className="dog-breed"><strong>{dog.breed}</strong></p>
      <p className="dog-age">{dog.age} years old</p>
      <div className="zipcode-wrapper">
      <p className="dog-zip-code"><strong>Zip Code - </strong> {dog.zip_code}</p>
      <button onClick={handleFavoriteClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FontAwesomeIcon icon={favorite ? faSolidHeart : faRegularHeart} size="2x" color={favorite ? 'red' : 'gray'} />
      </button>
      </div>
    </div>
  );
};

export default DogCard;