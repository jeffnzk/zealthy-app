import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainPage from './MainPage.jsx';
import AdminPage from './AdminPage.jsx';

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode><App /></React.StrictMode>);