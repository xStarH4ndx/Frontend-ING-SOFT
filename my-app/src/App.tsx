import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Container } from '@mui/material';
import { NavBar } from './common/NavBar';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { NotificationProvider } from './tools/context/notification.context';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
