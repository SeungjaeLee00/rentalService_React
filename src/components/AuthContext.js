import React, { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
 
  //refreshToken이 null이 아니면 true, 즉 값이 있으면 true(retoken이 null 인경우 : 처음페이지 들어왔을때 )
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('refreshToken')
  );
  useEffect(()=>{
    //localstorage에 retoken 있으면 값존재, 없으면 null
    setIsAuthenticated(localStorage.getItem('refreshToken'));
  },[localStorage.getItem('refreshToken')])

  const login = (newAccessToken, newRefreshToken) => {
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
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
