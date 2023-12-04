import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import store from './store.js';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { AuthProvider } from './components/AuthContext.js';
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Provider store={store}>
          <AuthProvider
          >
            <App />
          </AuthProvider>
        </Provider>
      </BrowserRouter>
  </QueryClientProvider>
);