// import React, { useState } from 'react';
// import { login } from '../api/apiService';

// const LoginForm: React.FC = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     try {
//       await login(name, email);
//       window.location.href = '/search';
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//       <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/apiService'; // Import the login API function
import '../styles/LoginPage.css'

interface LoginFormProps {
  onLogin: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    try {
      await login(name, email); // Attempt login
      onLogin(); // Mark as logged in
      navigate('/search'); // Redirect to search page
    } catch (error) {
    //   alert('Login failed. Please try again.');
      setError(true);
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
            {error && <div className='error-msg'>Invalid credentials. Please try again. </div>}
            <button type="submit">Login</button>
        </form>
        </div>
    </div>
  );
};

export default LoginForm;
