import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';

export const useStyles = () => {
  const {theme} = useContext(ThemeContext);
  return StyleSheet.create({
    header: {
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    rightText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.green,
    },
    headerTitle: {
      width: '33%',
      alignItems: 'center',
    },
    headerTitleLeft: {
      width: '33%',
      alignItems: 'flex-start',
    },
    headerTitleRight: {
      alignItems: 'flex-end',
      width: '33%',
    },
  });
};
