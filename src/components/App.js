import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import AuthProvider from '../contexts/AuthContext.jsx';
import SocketContextProvider from '../contexts/SocketContext.jsx';
import Header from './Header.jsx';


export default function App({socket}) {
  return (
    <div className={'d-flex flex-column h-100 bg-light'}>
      <AuthProvider>
        <SocketContextProvider socket={socket}>
          <Header />
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