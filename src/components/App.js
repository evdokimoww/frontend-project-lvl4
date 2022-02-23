import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import AuthProvider from '../contexts/AuthContext.jsx';
import { Container, Navbar } from 'react-bootstrap';
import SocketContextProvider from '../contexts/SocketContext.jsx';


export default function App({socket}) {
  return (
    <div className={'d-flex flex-column h-100'}>
      <AuthProvider>
        <SocketContextProvider socket={socket}>
          <Navbar bg="light" expand="lg" className={'shadow-sm bg-white'}>
            <Container>
              <Navbar.Brand href="/">Chat</Navbar.Brand>
            </Container>
          </Navbar>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<ChatPage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="*" element={<NoMatchPage/>}/>
            </Routes>
          </BrowserRouter>
        </SocketContextProvider>
      </AuthProvider>
    </div>
  );
}