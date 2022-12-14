import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  //We are using JSON.parse to convert string to object. We are storing user object in local storage as string.
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  //TODO: We are going to create a login function
  const login = () => {
    setCurrentUser({
      id: 1,
      name: 'John Doe',
      profilePicture:
        'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    });
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
