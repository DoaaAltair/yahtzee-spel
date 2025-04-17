import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import Game from './Game';
import Scores from './Scores';
import './Login.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('yahtzeeUser'));
    if (savedUser) {
      setUsername(savedUser.email.split('@')[0]);
      // setIsLoggedIn(true);
    }
  }, []);

  // Inlogfunctie
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      const userData = { email, password };
      localStorage.setItem('yahtzeeUser', JSON.stringify(userData));
      setUsername(email.split('@')[0]);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
    } else {
      alert('Vul e-mail en wachtwoord in!');
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !isLoggedIn ? (
              <div className="login-container">
                <div className="left-side">
                  <img src="/yahtzee.png" alt="Yahtzee Afbeelding" className="login-image" />
                </div>
                <div className="right-side">
                  <form onSubmit={handleLogin}>
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
            ) : (
              <Navigate to="/Home" />
            )
          }
        />
        <Route path="/home" element={<Home username={username} />} />
        <Route path="/game" element={<Game username={username} />} />
        <Route path="/scores" element={<Scores username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;