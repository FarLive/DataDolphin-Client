import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <AuthContextProvider>
    <NotificationProvider>
      <App />
     </NotificationProvider> 
  </AuthContextProvider>
);