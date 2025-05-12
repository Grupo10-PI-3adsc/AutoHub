import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  const addToHistory = (page) => {
    setHistory((prevHistory) => [...prevHistory, page]);
  };

  return (
    <NavigationContext.Provider value={{ history, addToHistory }}>
      {children}
    </NavigationContext.Provider>
  );
};