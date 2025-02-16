import {StyleSheet} from 'react-native';
import {useContext} from 'react';
import {ThemeContext} from '../../theme/ThemeContext';

export const useStyles = () => {
  const {theme} = useContext(ThemeContext);
  return StyleSheet.create({
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    historyItem: {
      borderWidth: 1,
      borderColor: theme.border,
      margin: 10,
      padding: 10,
      borderRadius: 8,
    },
    itemText: {
      fontSize: 12,
      fontWeight: '600',
    },
    itemInnerText: {
      fontSize: 12,
      color: theme.green,
    },
  });
};
