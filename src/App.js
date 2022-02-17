import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login/Login.jsx';
import NoMatch from './NoMatch.jsx';
import Home from './Home/Home.jsx';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  );
}