import React, { createContext, useContext, useState, useEffect, useLayoutEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  //refreshToken이 null이 아니면 true, 즉 값이 있으면 true(retoken이 null 인경우 : 처음페이지 들어왔을때 )
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('refreshToken')
  );
  console.log("isAuthenticated:"+ isAuthenticated);

  const login = (newAccessToken, newRefreshToken) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setIsAuthenticated(true);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
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
