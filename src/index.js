import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from './store.js';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { AuthProvider } from './components/AuthContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <BrowserRouter>
     <Provider store={store}>
    <AuthProvider
      >
          <App/>
          </AuthProvider>
      </Provider>
    </BrowserRouter>
   </React.StrictMode>
);