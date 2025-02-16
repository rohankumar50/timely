import {Text, View} from 'react-native';
import React from 'react';
import {useStyles} from './styles';

const Divider = () => {
  const styles = useStyles();

  return (
    <View style={styles.divider}>
      <Text>Divider</Text>
    </View>
  );
};

export default Divider;
