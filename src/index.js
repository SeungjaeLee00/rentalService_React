import React from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from 'redux';

import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './pages/about_membership/user_reducer';
import { AuthProvider } from './pages/Login/AuthContext';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
    <BrowserRouter>
    {/* <Provider  */}
    <AuthProvider
      store={createStoreWithMiddleware(Reducer, 
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
          <App/>
          </AuthProvider>
      {/* </Provider> */}
    </BrowserRouter>
   </React.StrictMode>
);