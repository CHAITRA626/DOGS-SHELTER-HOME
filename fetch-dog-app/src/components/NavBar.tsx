import React from 'react';
import '../styles/NavBar.css';
import { Link } from 'react-router-dom';

interface NavBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
  return (
    <nav>
      <h1>Fetch me if you can</h1>
      <ul>
        {isLoggedIn && (
          <>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
