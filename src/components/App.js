import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import HomePage from './HomePage.jsx';
import { AuthContext } from '../contexts/index.jsx';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      { children }
    </AuthContext.Provider>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NoMatchPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}