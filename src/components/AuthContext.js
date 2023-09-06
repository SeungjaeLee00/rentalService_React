import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || null);
  // accessToken 상태가 변경될 때 isAuthenticated 상태도 변경
  const [isAuthenticated, setIsAuthenticated] = useState(accessToken !== null);
  
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
