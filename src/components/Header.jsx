import { Button, Container, Navbar } from 'react-bootstrap';
import React from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const {loggedIn, logOut} = useAuth();
  const {t} = useTranslation('translation', {keyPrefix: 'header'});


  return <Navbar bg="light" expand="lg" className={'shadow-sm bg-white'}>
    <Container>
      <Navbar.Brand href="/">{t('logoText')}</Navbar.Brand>
      {
        loggedIn
          ? <Button
            variant={'primary'}
            onClick={() => logOut()}
          >
            {t('logoutBtn')}
          </Button>
          : null
      }
    </Container>
  </Navbar>
};

export default Header;