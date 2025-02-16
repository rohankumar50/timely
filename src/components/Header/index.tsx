import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useStyles} from './styles';

interface HeaderProps {
  title: string;
  right: string;
  left: string;
  onPress: () => void;
}

const Header: React.FC<HeaderProps> = ({title, onPress, right, left}) => {
  const styles = useStyles();

  return (
    <View style={styles.header}>
      <View style={styles.headerTitleLeft}>
        <Text style={styles.headerText}>{left}</Text>
      </View>
      <View style={styles.headerTitle}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.headerTitleRight} onPress={onPress}>
        <Text style={styles.rightText}>{right}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
