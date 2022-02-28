import { Button, Container, Navbar } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';

const Header = () => {
  const { loggedIn, logOut } = useAuth();

  return <Navbar bg="light" expand="lg" className={'shadow-sm bg-white'}>
    <Container>
      <Navbar.Brand href="/">Chat</Navbar.Brand>
      {
        loggedIn
          ? <Button variant={'primary'} onClick={() => logOut()}>Выйти</Button>
          : null
      }
    </Container>
  </Navbar>
};

export default Header;