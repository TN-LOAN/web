import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@/assets/css/global.css';
import { Routes } from '@/libs/route';

import { ThemeProvider } from './hooks/theme-hook';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
