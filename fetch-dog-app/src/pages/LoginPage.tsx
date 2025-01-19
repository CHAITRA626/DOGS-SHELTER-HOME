import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => (
  <div>
    <h1>Login</h1>
    <LoginForm />
  </div>
);

export default LoginPage;
// import React, { useState } from 'react';
// import Login from '../components/LoginForm';
// import { useNavigate } from 'react-router-dom';
// import '../styles/LoginPage.css'; 

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState<{ name: string; email: string } | null>(null);

//   const handleLogin = (name: string, email: string) => {
//     setUserInfo({ name, email });
//     console.log(userInfo);
//     // history.push('/search'); // Redirect to search page after login
//     navigate('/search');
//   };

//   return (
//     <div>
//       <Login onLogin={handleLogin} />
//     </div>
//   );
// };

// export default LoginPage;
