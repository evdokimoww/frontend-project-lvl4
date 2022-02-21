import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import HomePage from './HomePage.jsx';
import { AuthContext } from '../contexts/index.jsx';
import { Container, Navbar } from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem('userId');
  });

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{loggedIn, logIn, logOut}}>
      {children}
    </AuthContext.Provider>
  )
}

export default function App() {
  return (
    <div className={'d-flex flex-column h-100'}>
      <AuthProvider>
        <Navbar bg="light" expand="lg" className={'shadow-sm bg-white'}>
          <Container>
            <Navbar.Brand href="/">Chat</Navbar.Brand>
          </Container>
        </Navbar>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<NoMatchPage/>}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}