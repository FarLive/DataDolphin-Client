import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

export const lightTheme = {
  body: '#fff',
  text: '#000',
  toggleBorder: '#fff',
  background: '#363537',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

export const darkTheme = {
  body: '#011F3A',
  text: '#cbd5e0',
  toggleBorder: '#6B8096',
  background: '#999',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
