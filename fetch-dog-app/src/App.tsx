import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SearchPage from './pages/SearchPage';
import DogDetailPage from './pages/DogDetailPage';
import AdoptForm from './pages/AdoptForm';
import NavBar from './components/NavBar';
import { logout } from './api/apiService'; 
import FavoritesPage from './pages/FavouritesPage';
import { Dog } from './types/types';

const App: React.FC = () => {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [favorites, setFavorites] = useState<Dog[]>(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = async () => {
    try {
      await logout(); 
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('favorites');
    } catch (error) {
      console.error('Logout failed', error);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('favorites');
      window.location.href = '/';
    }
  };

  const handleFavoriteToggle = (dog: Dog) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((favDog) => favDog.id === dog.id)
        ? prevFavorites.filter((favDog) => favDog.id !== dog.id)
        : [...prevFavorites, dog]
    );
  };

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/search" />} />
        <Route path="/search" element={isLoggedIn ? <SearchPage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} /> : <Navigate to="/" />} />
        <Route path="/favorites" element={isLoggedIn ? <FavoritesPage favorites={favorites} 
        onRemoveFavorite={handleFavoriteToggle} /> : <Navigate to="/" />} />
        <Route path="/dog/:id" element={isLoggedIn ? <DogDetailPage /> : <Navigate to="/" />} />
        <Route path="/adopt/:id" element={isLoggedIn ? <AdoptForm /> : <Navigate to="/" /> } />
      </Routes>
    </Router>
  );
};

export default App;
