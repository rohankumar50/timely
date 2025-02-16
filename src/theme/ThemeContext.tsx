import {createContext} from 'react';

export const themes = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#2B3345',
    green: '#6fb234',
    green_light: '#a9da7a',
    divider: '#F0F0F0',
    disabled: '#BDBDBD',
    border: '#ACACAC',
  },
  dark: {
    backgroundColor: '#000000',
    textColor: '#FFFFFF',
    green: '#6fb234',
    green_light: '#a9da7a',
    divider: '#F0F0F0',
    disabled: '#BDBDBD',
    border: '#ACACAC',
  },
};

export const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {},
});
