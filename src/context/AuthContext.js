import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('yahtzeeUser'));
    if (savedUser) {
      setUsername(savedUser.email.split('@')[0]);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userEmail, userPassword) => {
    if (userEmail && userPassword) {
      const userData = { email: userEmail, password: userPassword };
      localStorage.setItem('yahtzeeUser', JSON.stringify(userData));
      setUsername(userEmail.split('@')[0]);
      setIsLoggedIn(true);
      setEmail('');
      setPassword('');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('yahtzeeUser');
    setIsLoggedIn(false);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const value = {
    email,
    setEmail,
    password,
    setPassword,
    isLoggedIn,
    username,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

