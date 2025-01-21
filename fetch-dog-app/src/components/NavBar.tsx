import React, {useState} from 'react';
import '../styles/NavBar.css';
import { Link } from 'react-router-dom';

interface NavBarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavBarProps> = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav>
      <h1>Fetch me if you can</h1>
      <div className="hamburger" onClick={toggleMenu}>
        &#9776; 
      </div>

      <ul className={isMenuOpen ? 'nav-dropdown active' : 'nav-dropdown'}>
        {isLoggedIn && (
          <>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/favorites">Favorites</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        )}
      </ul>
      <ul className='desktop'>
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
