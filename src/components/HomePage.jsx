import React from 'react';
import {useAuth} from '../hooks/index.jsx';
import {Navigate} from 'react-router-dom';

const HomePage = () => {
  const { loggedIn, logOut } = useAuth();

  if (!loggedIn) {
    return <Navigate to="login" />

  }

  return <>
    <h1>Home</h1>
    <a href="" onClick={() => logOut()}>выйти</a>
  </>
}

export default HomePage;