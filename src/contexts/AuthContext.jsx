import React, { createContext, useState } from 'react';

export const AuthContext = createContext({});

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('userId');
  });

  const logIn = () => {
    setLoggedIn(true);
  }

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{loggedIn, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;