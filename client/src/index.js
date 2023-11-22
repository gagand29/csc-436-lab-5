// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { RequestProvider } from 'react-request-hook';
import axios from 'axios';
import './Styles.css';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Ensure this is your server's URL
});

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <Router>
    <RequestProvider value={axiosInstance}>
      <App />
    </RequestProvider>
  </Router>
);
