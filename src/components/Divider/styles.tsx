import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';

export const useStyles = () => {
  const {theme} = useContext(ThemeContext);
  return StyleSheet.create({
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: theme.divider,
    },
  });
};
