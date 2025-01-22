import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService'; 
import '../styles/LoginPage.css'

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isValidName = (name: string) => {
    return /^[a-zA-Z\s]+$/.test(name);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidName(name) && !isValidEmail(email)) {
      setError('Please enter valid credentials.');
    }

    else if (!isValidName(name)) {
      setError('Please enter a valid name.');
      return;
    }

    else if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      await login(name, email); 
      onLogin(); 
      navigate('/search'); 
    } catch (error) {
      setError('Login failed. Please try again.');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('favorites');
      window.location.href = '/';
    }
  };

  return (
    <div id="login-container">
        <div id="login-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <div className='error-msg'>{error}</div>}
            <button type="submit">Login</button>
        </form>
        </div>
    </div>
  );
};

export default LoginForm;
