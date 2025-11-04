import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const { email, setEmail, password, setPassword, handleLogin } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (handleLogin(email, password)) {
      navigate('/home');
    } else {
      alert('Vul e-mail en wachtwoord in!');
    }
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src="/yahtzee.png" alt="Yahtzee Afbeelding" className="login-image" />
      </div>
      <div className="right-side">
        <form onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.com"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <button type="submit">Inloggen</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

