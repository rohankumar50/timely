import React, {useState} from 'react';
import {ThemeContext, themes} from './ThemeContext';

export const ThemeProvider = ({children}: any) => {
  const [theme, setTheme] = useState<any>(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
