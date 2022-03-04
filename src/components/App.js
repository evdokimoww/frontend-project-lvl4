import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NoMatchPage from './NoMatchPage.jsx';
import ChatPage from './Chat/ChatPage.jsx';
import AuthProvider from '../contexts/AuthContext.jsx';
import SocketContextProvider from '../contexts/SocketContext.jsx';
import Header from './Header.jsx';
import SignUpPage from './SignUpPage.jsx';
import ToastifyProvider from '../contexts/ToastifyProvider.jsx';
// import useScript from '../hooks/useScript.jsx';
// import initRollbar from '../../assets/initRollbar.js';


export default function App({socket}) {

  // useScript(initRollbar)

  return (
    <div className={'d-flex flex-column h-100 bg-light'}>
      <ToastifyProvider>
        <AuthProvider>
          <SocketContextProvider socket={socket}>
            <BrowserRouter>
              <Header/>
              <Routes>
                <Route exact path="/" element={<ChatPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="*" element={<NoMatchPage/>}/>
              </Routes>
            </BrowserRouter>
          </SocketContextProvider>
        </AuthProvider>
      </ToastifyProvider>
    </div>
  );
}