import { ConnectingAirportsOutlined } from '@mui/icons-material';
import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(accessToken !== null);
  const count=0;
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  const login = (newAccessToken, newRefreshToken) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext)
}
