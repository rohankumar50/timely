import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {useStyles} from './styles';
import {ThemeContext} from '../../theme/ThemeContext';

const Progress = ({item}) => {
  const styles = useStyles();
  const {theme, toggleTheme} = useContext(ThemeContext);

  return (
    <View style={styles.progressContainer}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${
              ((item.duration - item.remaining) / item.duration) * 100
            }%`,
          },
        ]}
      />
    </View>
  );
};

export default Progress;
