import React from 'react';

interface FavoritesProps {
  favorites: string[];
  onRemoveFavorite: (id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favorites, onRemoveFavorite }) => {
  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map((id) => (
          <li key={id}>
            <button onClick={() => onRemoveFavorite(id)}>Remove</button>
            Dog ID: {id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
