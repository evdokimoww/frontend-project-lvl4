import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('userId'));

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  const getUserAuth = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  const getUsername = () => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    if (userId) {
      return userId.username;
    }

    return null;
  };

  const value = {
    loggedIn, logIn, logOut, getUsername, getUserAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
