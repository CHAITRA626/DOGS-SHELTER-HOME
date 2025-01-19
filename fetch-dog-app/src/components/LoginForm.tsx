import React, { useState } from 'react';
import { login } from '../api/apiService';

const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await login(name, email);
      window.location.href = '/search';
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
// import React, { useState } from 'react';

// interface LoginProps {
//   onLogin: (name: string, email: string) => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onLogin(name, email);
//   };

//   return (
//     <div className="login">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
