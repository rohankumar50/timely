import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import ThemeProvider from './src/theme/ThemeProvider';
import Navigation from './src/navigation';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
