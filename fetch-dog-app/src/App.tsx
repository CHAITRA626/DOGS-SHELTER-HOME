import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SearchPage from './pages/SearchPage';
import NavBar from './components/NavBar';
import { logout } from './api/apiService'; // Import the login function
import FavoritesPage from './pages/FavouritesPage';
import { Dog } from './types/types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout API
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const [favorites, setFavorites] = useState<Dog[]>([]);

  const handleFavoriteToggle = (dog: Dog) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((favDog) => favDog.id === dog.id)
        ? prevFavorites.filter((favDog) => favDog.id !== dog.id)
        : [...prevFavorites, dog]
    );
  };

  const handleRemoveFavorite = (dogToRemove: Dog) => {
    setFavorites((prevFavorites) => prevFavorites.filter(dog => dog.id !== dogToRemove.id));
  };


  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/search" />} />
        <Route path="/search" element={isLoggedIn ? <SearchPage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} /> : <Navigate to="/" />} />
        <Route path="/favorites" element={isLoggedIn ? <FavoritesPage favorites={favorites} 
        onRemoveFavorite={handleRemoveFavorite} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
