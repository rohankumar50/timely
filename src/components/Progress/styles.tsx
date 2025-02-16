import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';

export const useStyles = () => {
  const {theme} = useContext(ThemeContext);
  return StyleSheet.create({
    progressContainer: {
      width: '100%',
      height: 10,
      backgroundColor: '#ddd',
      marginTop: 5,
      borderRadius: 20,
    },
    progressFill: {
      height: '100%',
      backgroundColor: 'green',
      borderRadius: 20,
    },
  });
};
