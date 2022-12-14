import { createContext, useEffect, useState } from 'react';
//We are creating a context api
export const DarkModeContext = createContext();
//We are creating a provider for our context api. We are going to wrap our app with this provider.
export const DarkModeContextProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );
  //We are going to save our darkMode state to local storage
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
  };
  //Every time darkMode state changes we are going to save it to local storage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
