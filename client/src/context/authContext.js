import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //We are using JSON.parse to convert string to object. We are storing user object in local storage as string.
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const login = async (inputs) => {
    const res = await axios.post('http://localhost:8800/auth/login', inputs, {
      withCredentials: true,
    });
    setCurrentUser(res.data);
  };

  //We are using JSON.stringify to convert object to string. Because we can not save object to local storage. We can only save string.
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
